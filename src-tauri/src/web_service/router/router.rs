use axum::{middleware, routing::get, Router};
use axum::routing::post;
use crate::web_service::_middleware;
use crate::web_service::api::{
    cookie::{cookie_update, cookie_query},
    cmd::call_command,
    download::{download_resource, download_stream, download_m38u},
    task::{task_query, task_update},
    proxy_api::{proxy}
};





pub fn application_router() -> Router<()> {
    Router::new()
        .route("/proxy", post(proxy))
        .route("/download_resource", post(download_resource))
        .route("/download_stream", post(download_stream))
        .route("/download_m38u", post(download_m38u))
        .route("/cookie_query", get(cookie_query))
        .route("/cookie_update", post(cookie_update))
        .route("/task_query", get(task_query))
        .route("/task_update", post(task_update))
        .route("/call_cmd", post(call_command))
        // .layer(middleware::from_fn(_middleware::request_record::request_record))
}
