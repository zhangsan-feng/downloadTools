use crate::web_service::api::{
    platform_config::{platform_config_update, platform_config_query},
    cmd_api::ffmpeg_composite_video,
    download::{download_resource, download_stream},
    download_record::{download_record_query,stop_download_task, download_finish},
    proxy_api::{proxy}
};
use tower::{BoxError, ServiceBuilder};
use axum::{
    error_handling::HandleErrorLayer,
    http::StatusCode, response::IntoResponse,
    routing::{get, post}, Extension, Router
};
use std::{borrow::Cow };
use std::sync::{Arc, RwLock};
use tower_http::{trace::TraceLayer};

async fn handle_error(error: BoxError) -> impl IntoResponse {
    if error.is::<tower::timeout::error::Elapsed>() {
        return (StatusCode::REQUEST_TIMEOUT, Cow::from("request timed out"));
    }

    if error.is::<tower::load_shed::error::Overloaded>() {
        return (
            StatusCode::SERVICE_UNAVAILABLE,
            Cow::from("service is overloaded, try again later"),
        );
    }
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        Cow::from(format!("Unhandled internal error: {error}")),
    )
}

#[derive(Default, Debug, Clone)]
struct AppState {

}



pub fn application_router() -> Router<()> {
    // Router::new().nest("/v1",
    //     Router::new().nest("/web",
    //         Router::new().nest("/user",
    //             Router::new().nest("",()))


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
        .layer(           ServiceBuilder::new()
            // Handle errors from middleware
            .layer(HandleErrorLayer::new(handle_error))
            .load_shed()
            // .concurrency_limit(1024)
            // .timeout(Duration::from_secs(10))
            .layer(TraceLayer::new_for_http()),)
        .layer(Extension(AppState::default()))
        .with_state(Arc::new(RwLock::new(AppState::default())))

}
