use axum::body::{Body, Bytes};
use axum::extract::Request;
use axum::http::{HeaderValue, StatusCode};
use axum::middleware::Next;
use axum::response::{Html, IntoResponse, Response};
use axum::BoxError;
use http_body_util::BodyExt;
use log::debug;
use log::info;

pub async fn request_record(req: Request, next: Next, ) -> Result<impl IntoResponse, (StatusCode, String)> {
    let (parts, body) = req.into_parts();
    let bytes = body
        .collect()
        .await
        .expect("collect request body error")
        .to_bytes();
    let req = Request::from_parts(parts, Body::from(bytes.clone()));
    info!("{:?}", req);

    let res = next.run(req).await;

    let (parts, body) = res.into_parts();
    let bytes = body
        .collect()
        .await
        .expect("collect response body error")
        .to_bytes();
    let res = Response::from_parts(parts, Body::from(bytes.clone()));
    info!("{:?}", res);
    Ok(res)
}
