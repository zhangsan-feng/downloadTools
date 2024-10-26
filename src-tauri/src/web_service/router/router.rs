use axum:: {routing::get, Router};
use axum::routing::post;
use crate::web_service::api::{
    platform_config::{platform_config_update, platform_config_query},
    // cmd::call_command,
    download::{download_resource, download_stream},
    // task::{task_query, task_update},
    proxy_api::{proxy}
};





pub fn application_router() -> Router<()> {
    Router::new()
        .route("/proxy", post(proxy))
        .route("/download_resource", post(download_resource))
        .route("/download_stream", post(download_stream))
        .route("/platform_config_query", get(platform_config_query))
        .route("/platform_config_update", post(platform_config_update))
        // .route("/task_query", get(task_query))
        // .route("/task_update", post(task_update))
        // .route("/call_cmd", post(call_command))
        // .layer(middleware::from_fn(_middleware::request_record::request_record))
}
