
use serde_json::{json};
use axum::Json;
use std::hash::Hash;
use log::kv::ToValue;
use std::fmt::{Debug, Display};
use serde::{Deserialize, Serialize};



#[derive(Debug, Serialize, Deserialize, Clone,)]
pub struct ResourceParams{
    id:i64,
    input_link:String,
    headers:serde_json::Value,
    platform:String,
    details_info:serde_json::Value,
    download_link:serde_json::Value, // video audio image
    live_link:serde_json::Value,
}

#[derive(Debug, Serialize, Deserialize, Clone,)]
pub struct StreamParams{
    id:i64,
    input_link:String,
    headers:serde_json::Value,
    platform:String,
    download_link:serde_json::Value, // video audio image
}

pub async fn download_resource(Json(params):Json<ResourceParams>)-> Json<serde_json::Value> {

    Json(json!({"code":"200","data":""}))

}

pub async fn download_stream(Json(params):Json<StreamParams>) -> Json<serde_json::Value>  {
    Json(json!({"code":"200","data":""}))
}

pub async fn download_m38u(Json(params):Json<StreamParams>) -> Json<serde_json::Value>  {
    Json(json!({"code":"200","data":""}))
}
