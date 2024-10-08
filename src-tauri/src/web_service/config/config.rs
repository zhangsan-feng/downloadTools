use crate::web_service::config::{
    logger::init_logger, sqlite::init_db, static_path::init_dir_config,
};

pub async fn init_config() {
    init_dir_config().await;
    init_logger().await;
    init_db().await;
}
