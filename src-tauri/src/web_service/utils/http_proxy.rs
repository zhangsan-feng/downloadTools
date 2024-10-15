//! Run with
//!
//! ```not_rust
//! $ cargo run -p example-http-proxy
//! ```
//!
//! In another terminal:
//!
//! ```not_rust
//! $ curl --proxy "127.0.0.1:3000" https://tokio.rs
//! ```
//!
//! Example is based on <https://github.com/hyperium/hyper/blob/master/examples/http_proxy.rs>

use axum::{
    body::Body,
    extract::Request,
    http::{Method, StatusCode, HeaderValue},
    response::{IntoResponse, Response},
    routing::get,
    Router,
};

use hyper::body::Incoming;
use hyper::server::conn::http1;
use hyper::upgrade::Upgraded;
use std::net::SocketAddr;
use tokio::net::{TcpListener, TcpStream};
use tower::Service;
use tower::ServiceExt;

use hyper_util::rt::TokioIo;
use log::info;
use tower_http::cors::{AllowHeaders, Any, CorsLayer};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

pub async fn start_proxy_service() {

    let router_svc = Router::new().route("/", get(|| async {  }))
        .layer(
            CorsLayer::new()
                .allow_headers(Any)
                .allow_origin(Any)
                .allow_methods(Any),
        );;

    let tower_service = tower::service_fn(move |req: Request<_>| {
        let router_svc = router_svc.clone();
        let req = req.map(Body::new);
        async move {
            if req.method() == Method::CONNECT {
                proxy(req).await
            } else {
                router_svc.oneshot(req).await.map_err(|err| match err {})
            }
        }
    });

    let hyper_service = hyper::service::service_fn(move |request: Request<Incoming>| {
        tower_service.clone().call(request)
    });

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    info!(" proxy listen on {}:{}", addr.ip(), addr.port());
    let listener = TcpListener::bind(addr).await.unwrap();
    loop {
        let (stream, _) = listener.accept().await.unwrap();
        let io = TokioIo::new(stream);
        let hyper_service = hyper_service.clone();
        tokio::task::spawn(async move {
            if let Err(err) = http1::Builder::new()
                .preserve_header_case(true)
                .title_case_headers(true)
                .serve_connection(io, hyper_service)
                .with_upgrades()
                .await
            {
                info!("Failed to serve connection: {:?}", err);
            }
        });
    }
}

async fn proxy(req: Request<Body>) -> Result<Response<Body>, hyper::Error> {

    if let Some(host_addr) = req.uri().authority().map(|auth| auth.to_string()) {
        let on_upgrade = hyper::upgrade::on(req);
        let mut response = Response::new(Body::empty());

        tokio::task::spawn(async move {
            match on_upgrade.await {
                Ok(upgraded) => {

                    if let Err(e) = tunnel(upgraded, host_addr).await {
                        info!("server io error: {}", e);
                    }
                }
                Err(e) => info!("upgrade error: {}", e),
            }
        });
        let mut headers = response.headers_mut();
        headers.insert("X-Proxy-Header1", HeaderValue::from_static("value"));
        headers.insert("X-Proxy-Header2", HeaderValue::from_static("value"));
        headers.insert("X-Proxy-Header3", HeaderValue::from_static("value"));
        headers.insert("X-Proxy-Header4", HeaderValue::from_static("value"));
        Ok(response)
    } else {
        info!("CONNECT host is not socket addr: {:?}", req.uri());
        let mut response = Response::new(Body::empty());
        *response.status_mut() = StatusCode::BAD_REQUEST;
        Ok(response)
    }
}

async fn tunnel(upgraded: Upgraded, addr: String) -> std::io::Result<()> {

    let mut server = TcpStream::connect(addr).await?;
    let mut upgraded = TokioIo::new(upgraded);

    let (from_client, from_server) =
        tokio::io::copy_bidirectional(&mut upgraded, &mut server).await?;

    info!(
        "client wrote {} bytes and received {} bytes",
        from_client,
        from_server
    );

    Ok(())
}