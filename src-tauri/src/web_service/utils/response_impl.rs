use axum::Json;
use serde_json::{json, Value};

pub trait ResponseImpl {
     fn success(data:Value) -> Json<Value>;
}

pub struct ResponseStruct;

impl ResponseImpl for ResponseStruct {

     fn success(data:Value) -> Json<Value> {
        Json(json!({
            "code": 200,
            "data": data,
            "msg": ""
        }))
    }

}
