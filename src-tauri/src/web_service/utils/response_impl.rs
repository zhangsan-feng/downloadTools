
use serde_json::{json, Value};

pub trait ResponseImpl {
     fn success(data:Value) -> axum::Json<Value>;
}

pub struct ResponseStruct;

impl ResponseImpl for ResponseStruct {

     fn success(data:Value) -> axum::Json<Value> {
        axum::Json(json!({
            "code": 200,
            "data": data,
            "msg": ""
        }))
    }

}
