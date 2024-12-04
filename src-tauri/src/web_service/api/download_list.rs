use axum::Json;
use serde_json::{json, Value};
use crate::web_service::utils::response_impl::{ResponseImpl, ResponseStruct};



pub async fn download_list_query() ->Json<Value>{
    ResponseStruct::success(json!("success"))
}


pub async fn download_list_add()->Json<Value>{
    ResponseStruct::success(json!("success"))
}


pub async fn download_list_delete()->Json<Value>{
    ResponseStruct::success(json!("success"))
}