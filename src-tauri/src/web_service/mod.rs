use router::router::application_router;
use axum::http::{HeaderValue, Method};
use axum::Router;
use log::info;
use tower_http::cors::CorsLayer;

pub mod config;
pub mod utils;
pub mod api;
pub mod middleware;
pub mod router;
pub mod entity;
pub mod cache;

use crate::web_service::config::config::init_config;

pub async fn start_web_service() {
    init_config().await;

    let app = Router::new()
        .nest("/v1", Router::new().nest("/web_api", application_router()))
        // .layer(middleware::from_fn(_middleware::request_record::request_record))
        .layer(
            CorsLayer::new()
                .allow_origin("*".parse::<HeaderValue>().unwrap())
                .allow_methods([Method::GET, Method::POST, Method::OPTIONS]),
        );

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8000")
        .await
        .unwrap();
    info!("web service start listen on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

/*

https://juejin.cn/post/7298160530292703244
- api --> parameter verification
    - service adapter --> service type
        - service --> parameter handler
            - infrastructure  adapter
                - repo
                    - entity
                    - cache
                    - value_objects


*/
