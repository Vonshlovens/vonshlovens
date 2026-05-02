use std::sync::Arc;

use anyhow::Context;
use axum::Router;
use tracing::{error, info};

mod config;
mod health;
mod state;

use config::Config;
use state::AppState;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    init_tracing();

    let config = Config::from_env().context("loading config")?;
    info!(
        port = config.port,
        garage_endpoint = %config.garage_endpoint,
        garage_bucket = %config.garage_bucket,
        "starting notes-api"
    );

    let pg = sqlx::postgres::PgPoolOptions::new()
        .max_connections(config.pg_max_connections)
        .connect(&config.database_url)
        .await
        .context("connecting to postgres")?;
    info!("postgres pool ready");

    let s3 = build_s3_client(&config).await;
    info!("s3 client built");

    let state = Arc::new(AppState::new(config.clone(), pg, s3));

    spawn_migrate(state.clone());

    let app = Router::new()
        .route("/api/v1/healthz", axum::routing::get(health::healthz))
        .route("/api/v1/readyz", axum::routing::get(health::readyz))
        .with_state(state);

    let addr = format!("0.0.0.0:{}", config.port);
    let listener = tokio::net::TcpListener::bind(&addr)
        .await
        .with_context(|| format!("binding {addr}"))?;
    info!(%addr, "listening");
    axum::serve(listener, app).await.context("serving http")?;
    Ok(())
}

async fn build_s3_client(config: &Config) -> aws_sdk_s3::Client {
    let creds = aws_credential_types::Credentials::new(
        &config.garage_access_key,
        &config.garage_secret_key,
        None,
        None,
        "static",
    );
    let shared = aws_config::defaults(aws_config::BehaviorVersion::latest())
        .region(aws_config::Region::new("garage"))
        .endpoint_url(&config.garage_endpoint)
        .credentials_provider(creds)
        .load()
        .await;
    let s3_cfg = aws_sdk_s3::config::Builder::from(&shared)
        .force_path_style(true)
        .build();
    aws_sdk_s3::Client::from_conf(s3_cfg)
}

fn spawn_migrate(state: Arc<AppState>) {
    tokio::spawn(async move {
        match sqlx::migrate!("./migrations").run(&state.pg).await {
            Ok(_) => {
                info!("migrations applied");
                let _ = state.migrated.set(true);
            }
            Err(e) => error!(error = %e, "migrations failed"),
        }
    });
}

fn init_tracing() {
    use tracing_subscriber::{fmt, EnvFilter};
    let filter = EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| EnvFilter::new("info,sqlx=warn"));
    fmt()
        .with_env_filter(filter)
        .json()
        .with_target(true)
        .with_current_span(false)
        .init();
}
