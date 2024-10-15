use router::router::application_router;
use axum::http::{Method};
use axum::Router;
use log::info;
use tower_http::cors::{Any, CorsLayer};
use crate::web_service::config::config::init_config;

pub mod config;
pub mod utils;
pub mod api;
pub mod _middleware;
pub mod router;
pub mod entity;
pub mod cache;


pub async fn start_web_service() {
    init_config().await;

    let app = Router::new()
        .nest("/v1", Router::new().nest("/web_api", application_router()))
        // .layer(_middleware::from_fn(_middleware::request_record::request_record))
        .layer(
            CorsLayer::new()
                .allow_headers(Any)
                .allow_origin(Any)
                .allow_methods([Method::GET, Method::POST, Method::OPTIONS]),
        );

    let listener = tokio::net::TcpListener::bind("127.0.0.1:54435").await.unwrap();
    info!("web service start listen on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}


