use serde_json::{json, Value};
use crate::web_service::utils::response_impl::{ResponseImpl, ResponseStruct};
use axum::Json;

pub async fn call_command(Json(params):Json<Value>) ->Json<Value>{

    ResponseStruct::success(json!("success"))
}