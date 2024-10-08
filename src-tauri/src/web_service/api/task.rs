use crate::web_service::middleware::error::ApplicationError;
use crate::web_service::utils::response_impl::{ResponseImpl, ResponseStruct};
use axum::Json;
use serde_json::Value;

struct TaskParameter {}

pub async fn test_api() -> Result<Json<Value>, ApplicationError> {
    Ok(ResponseStruct::success().await)
}
