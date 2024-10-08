use axum::Json;
use serde_json::{json, Value};

pub trait ResponseImpl {
    async fn success() -> Json<Value>;
    async fn failed() -> Json<Value>;
}

pub struct ResponseStruct;

impl ResponseImpl for ResponseStruct {
    async fn success() -> Json<Value> {
        Json(json!({
            "code": 200,
            "data": "",
            "message": ""
        }))
    }

    async fn failed() -> Json<Value> {
        Json(json!({
            "code": 500,
            "data": "",
            "message": ""
        }))
    }
}
