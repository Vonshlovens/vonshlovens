use std::env;

#[derive(Clone)]
pub struct Config {
    pub database_url: String,
    pub garage_endpoint: String,
    pub garage_bucket: String,
    pub garage_access_key: String,
    pub garage_secret_key: String,
    // Used by the sync auth middleware once /v1/sync/* lands.
    #[allow(dead_code)]
    pub sync_token: String,
    // Used by the attachment upload handler once it lands.
    #[allow(dead_code)]
    pub max_attach_mb: u64,
    pub port: u16,
    pub pg_max_connections: u32,
}

impl Config {
    pub fn from_env() -> anyhow::Result<Self> {
        Ok(Self {
            database_url: req("DATABASE_URL")?,
            garage_endpoint: req("GARAGE_ENDPOINT")?,
            garage_bucket: req("GARAGE_BUCKET")?,
            garage_access_key: req("GARAGE_ACCESS_KEY")?,
            garage_secret_key: req("GARAGE_SECRET_KEY")?,
            sync_token: req("NOTES_API_SYNC_TOKEN")?,
            max_attach_mb: opt("NOTES_API_MAX_ATTACH_MB", 25)?,
            port: opt("PORT", 3000)?,
            pg_max_connections: opt("PG_MAX_CONNECTIONS", 10)?,
        })
    }
}

fn req(key: &str) -> anyhow::Result<String> {
    env::var(key).map_err(|_| anyhow::anyhow!("missing required env var: {key}"))
}

fn opt<T: std::str::FromStr>(key: &str, default: T) -> anyhow::Result<T>
where
    T::Err: std::fmt::Display,
{
    match env::var(key) {
        Ok(v) => v
            .parse::<T>()
            .map_err(|e| anyhow::anyhow!("invalid {key}: {e}")),
        Err(_) => Ok(default),
    }
}
