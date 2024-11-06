use axum:: {routing::get, Router};
use axum::routing::post;
use crate::web_service::api::{
    platform_config::{platform_config_update, platform_config_query},
    cmd_api::ffmpeg_composite_video,
    download::{download_resource, download_stream},
    download_task::{download_record_query,stop_download_task, download_finish},
    proxy_api::{proxy}
};





pub fn application_router() -> Router<()> {
    Router::new()
        .route("/proxy", post(proxy))
        .route("/download_resource", post(download_resource))
        .route("/download_stream", post(download_stream))
        .route("/platform_config_query", get(platform_config_query))
        .route("/platform_config_update", post(platform_config_update))
        .route("/download_record_query", get(download_record_query))
        .route("/stop_download_task", post(stop_download_task))
        .route("/download_finish", post(download_finish))
        .route("/ffmpeg_composite_video", post(ffmpeg_composite_video))
        // .layer(middleware::from_fn(_middleware::request_record::request_record))
}
