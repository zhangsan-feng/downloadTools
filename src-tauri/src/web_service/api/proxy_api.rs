use std::collections::HashMap;
use serde::{Deserialize, Serialize};
use serde_json::json;

use axum::response::Response;
use log::error;
use log::kv::ToValue;
use tracing::info;
use crate::web_service::utils::http_client::{
    convert_headers, http_get,http_get_no_redirect,http_post, http_post_json, http_post_form
};

#[derive(Debug, Serialize, Deserialize, Clone, Default)]
pub struct Params{
    req_url:String,
    req_type:String,
    req_headers: serde_json::Value,
    req_params: serde_json::Value,
}

pub async fn proxy(axum::Json(params): axum::Json<Params>) -> axum::Json<serde_json::Value>{

    let req_headers = convert_headers(params.req_headers);
    let res = match params.req_type.as_str() {
        "GETNoRedirect" =>http_get_no_redirect(params.req_url, req_headers, params.req_params).await,
        "POST" => http_post(params.req_url, req_headers, params.req_params.to_string()).await,
        "POSTJson" => http_post_json(params.req_url, req_headers, params.req_params).await,
        "POSTForm" => http_post_form(params.req_url, req_headers, params.req_params).await,
        _ => http_get(params.req_url, req_headers, params.req_params).await
    };

    let headers_value: HashMap<String, String> = res.headers().iter()
        .map(|(name, value)| { (
            name.to_string(),
            value.to_str().unwrap_or_default().to_string(),
            ) }).collect();

    let body_text =  res.text().await.unwrap();

    let response_json = json!({
        "headers": headers_value,
        "body": body_text
    });

    axum::Json(response_json)
}

