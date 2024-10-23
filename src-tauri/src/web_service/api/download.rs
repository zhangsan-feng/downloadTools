use std::collections::HashMap;
use serde_json::{json};
use axum::Json;
use std::hash::Hash;
use log::kv::ToValue;
use std::fmt::{Debug, Display};
use log::info;
use serde::{Deserialize, Serialize};
use crate::web_service::utils::http_client::{convert_headers, download_file};
use crate::web_service::config::static_path::{match_platform};

#[derive(Debug, Serialize, Deserialize, Clone,)]
pub struct ResourceParams{
    id:i64,
    req_headers:serde_json::Value,
    platform:String,
    download_link:serde_json::Value, // video audio image
}


pub async fn download_resource(Json(params):Json<ResourceParams>)-> Json<serde_json::Value> {
    let headers = convert_headers(params.req_headers);
    if let Some(object) = params.download_link.as_object() {
        for (file_name, file_link) in object {
            let file_link = file_link.as_str().unwrap().to_string();
            let save_path = format!("{}{}",match_platform(params.platform.clone()), file_name);
            info!("{}", file_link);
            info!("{}", file_name);
            info!("{}", save_path);
            download_file(file_link, headers.clone(), save_path).await;
        }
    }

    Json(json!({"code":"200","data":"ok"}))

}

pub async fn download_stream(Json(params):Json<ResourceParams>) -> Json<serde_json::Value>  {
    Json(json!({"code":"200","data":""}))
}

pub async fn download_m38u(Json(params):Json<ResourceParams>) -> Json<serde_json::Value>  {
    Json(json!({"code":"200","data":""}))
}
