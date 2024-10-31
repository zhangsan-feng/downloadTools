use axum:: {routing::get, Router};
use axum::routing::post;
use crate::web_service::api::{
    platform_config::{platform_config_update, platform_config_query},
    // cmd::call_command,
    download::{download_resource, download_stream},
    download_task::{task_query, update_task_status, stop_task},
    proxy_api::{proxy}
};





pub fn application_router() -> Router<()> {
    Router::new()
        .route("/proxy", post(proxy))
        .route("/download_resource", post(download_resource))
        .route("/download_stream", post(download_stream))
        .route("/platform_config_query", get(platform_config_query))
        .route("/platform_config_update", post(platform_config_update))
        .route("/record_query", get(task_query))
        .route("/update_download_status", post(update_task_status))
        .route("/stop_download", post(stop_task))
        // .route("/call_cmd", post(call_command))
        // .layer(middleware::from_fn(_middleware::request_record::request_record))
}
