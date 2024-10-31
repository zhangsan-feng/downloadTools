use std::collections::HashMap;
use log::info;
use serde::{Deserialize, Serialize};
use serde_json::json;
use crate::web_service::utils::http_client::{
    convert_headers, http_get,http_get_no_redirect,http_post,
};

#[derive(Debug, Serialize, Deserialize, Clone, Default)]
pub struct ProxyParams{
    req_url:String,
    req_type:String,
    req_headers: serde_json::Value,
    req_params: serde_json::Value,
}

pub async fn proxy(axum::Json(params): axum::Json<ProxyParams>) -> axum::Json<serde_json::Value>{
    // info!("{}", params.req_url);
    // info!("{}", params.req_params);

    let req_headers = convert_headers(params.req_headers);
    let res = match params.req_type.as_str() {
        "POST" => http_post(params.req_url, req_headers, params.req_params.as_str().unwrap().to_string()).await,
        // "POSTJson" => http_post_json(params.req_url, req_headers, params.req_params).await,
        // "POSTForm" => http_post_form(params.req_url, req_headers, params.req_params).await,
        "GETNoRedirect" =>http_get_no_redirect(params.req_url, req_headers, params.req_params).await,
        _ => http_get(params.req_url, req_headers, params.req_params).await
    };

    let headers_value: HashMap<String, String> = res.headers().iter()
        .map(|(name, value)| { (
            name.to_string(),
            value.to_str().unwrap_or_default().to_string(),
            ) }).collect();

    let body_text =  res.text().await.unwrap();

    let response_json = json!({
        "response_headers": headers_value,
        "response_body": body_text
    });

    axum::Json(response_json)
}

