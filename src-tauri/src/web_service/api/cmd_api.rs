use serde_json::{json, Value};
use crate::web_service::utils::response_impl::{ResponseImpl, ResponseStruct};
use axum::Json;




#[derive(Debug, Serialize, Deserialize, Clone,)]
pub struct RequestParams{
    cmd:String,
}
pub async fn call_command(Json(params):Json<RequestParams>) ->Json<Value>{

    ResponseStruct::success(json!("success"))
}