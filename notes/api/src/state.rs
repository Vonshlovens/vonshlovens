use sqlx::PgPool;
use tokio::sync::OnceCell;

use crate::config::Config;

pub struct AppState {
    pub config: Config,
    pub pg: PgPool,
    pub s3: aws_sdk_s3::Client,
    pub migrated: OnceCell<bool>,
}

impl AppState {
    pub fn new(config: Config, pg: PgPool, s3: aws_sdk_s3::Client) -> Self {
        Self {
            config,
            pg,
            s3,
            migrated: OnceCell::new(),
        }
    }
}
