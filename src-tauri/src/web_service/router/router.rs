use axum::{response::Html, routing::get, Router};

use crate::web_service::api::task::test_api;

pub fn application_router() -> Router<()> {
    Router::new().route("/test", get(test_api))
}
