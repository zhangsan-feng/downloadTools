
use serde_json::{json};
use axum::Json;
use std::fmt::{Debug};
use log::info;
use serde::{Deserialize, Serialize};
use crate::web_service::utils::http_client::{convert_headers, download_file, download_flv};
use crate::web_service::utils::response_impl::{ResponseImpl, ResponseStruct};

#[derive(Debug, Serialize, Deserialize, Clone,)]
pub struct ResourceParams{
    id:i64,
    req_headers:serde_json::Value,
    platform:String,
    download_link:serde_json::Value, // video audio image
}


pub async fn download_resource(Json(params):Json<ResourceParams>)-> Json<serde_json::Value> {
    let headers = convert_headers(params.req_headers);
    let tmp_path = format!("./download/{}/", params.platform.clone());

    match tokio::fs::create_dir_all(tmp_path.clone()).await {
        Ok(()) => info!("Directory created successfully {}", tmp_path),
        Err(e) => info!("Failed to create directory: {}", e),
    }

    if let Some(object) = params.download_link.as_object() {
        for (file_name, file_link) in object {
            let file_link = file_link.as_str().unwrap().to_string();
            let save_path = format!("{}{}", tmp_path.clone(), file_name);
            info!("{}", params.platform.clone());
            download_file(file_link, headers.clone(), save_path).await;
        }
    }
    ResponseStruct::success(json!("success"))
}


#[derive(Debug, Serialize, Deserialize, Clone,)]
pub struct StreamParams{
    id:i64,
    req_headers:serde_json::Value,
    platform:String,
    msg:serde_json::Value,
}

pub async fn download_stream(Json(params):Json<StreamParams>) -> Json<serde_json::Value>  {
    let headers = convert_headers(params.req_headers);
    let tmp_path = format!("./download/{}/", params.platform.clone());

    match tokio::fs::create_dir_all(tmp_path.clone()).await {
        Ok(()) => info!("Directory created successfully {}", tmp_path),
        Err(e) => info!("Failed to create directory: {}", e),
    }

    if let Some(object) = params.msg.as_object() {
        let flv_link = object.get("flv_link").expect("Missing flv link");
        let flv_file_name = object.get("flv_file_name").expect("Missing flv file name");
        let save_path = format!("{}{}", tmp_path.clone(), flv_file_name);
        let flv_link = flv_link.as_str().unwrap().to_string();
        tokio::spawn(async move {
            download_flv(flv_link, headers, save_path).await;
        });
    }

    ResponseStruct::success(json!("success"))
}
