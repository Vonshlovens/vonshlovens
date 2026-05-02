use std::sync::Arc;

use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use serde::Serialize;
use tracing::warn;

use crate::state::AppState;

#[derive(Serialize)]
struct HealthBody {
    ok: bool,
    postgres: bool,
    garage: bool,
    migrated: bool,
}

pub async fn healthz(State(state): State<Arc<AppState>>) -> impl IntoResponse {
    let pg_ok = sqlx::query_scalar::<_, i32>("SELECT 1")
        .fetch_one(&state.pg)
        .await
        .map(|n| n == 1)
        .unwrap_or_else(|e| {
            warn!(error = %e, "postgres healthcheck failed");
            false
        });

    let garage_ok = state
        .s3
        .head_bucket()
        .bucket(&state.config.garage_bucket)
        .send()
        .await
        .is_ok();
    if !garage_ok {
        warn!("garage healthcheck failed");
    }

    let migrated = state.migrated.get().copied().unwrap_or(false);
    let ok = pg_ok && garage_ok;
    let body = HealthBody {
        ok,
        postgres: pg_ok,
        garage: garage_ok,
        migrated,
    };
    let status = if ok {
        StatusCode::OK
    } else {
        StatusCode::SERVICE_UNAVAILABLE
    };
    (status, Json(body))
}

pub async fn readyz(State(state): State<Arc<AppState>>) -> impl IntoResponse {
    if state.migrated.get().copied().unwrap_or(false) {
        StatusCode::OK
    } else {
        StatusCode::SERVICE_UNAVAILABLE
    }
}
