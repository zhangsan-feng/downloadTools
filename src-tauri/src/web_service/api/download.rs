
use serde_json::{json};
use axum::Json;
use std::fmt::{Debug};
use log::info;
use serde::{Deserialize, Serialize};
use crate::web_service::utils::http_client::{convert_headers, download_file, download_flv};
use crate::web_service::utils::response_impl::{ResponseImpl, ResponseStruct};
use crate::web_service::api::download_task::{add_task};

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
            download_file(file_link, headers.clone(), save_path.clone()).await;
            add_task(params.id, save_path.clone(), params.platform.clone()).await;
        }
    }


    ResponseStruct::success(json!("success"))
}



pub async fn download_stream(Json(params):Json<ResourceParams>) -> Json<serde_json::Value>  {
    let headers = convert_headers(params.req_headers);
    let tmp_path = format!("./download/{}/", params.platform.clone());

    match tokio::fs::create_dir_all(tmp_path.clone()).await {
        Ok(()) => info!("Directory created successfully {}", tmp_path),
        Err(e) => info!("Failed to create directory: {}", e),
    }

    if let Some(object) = params.download_link.as_object() {
        let flv_stream_url = object.get("flv_stream_url").unwrap().as_str().expect("").to_string();
        let flv_file_name = object.get("flv_file_name").unwrap().as_str().expect("").to_string();
        let save_path = format!("{}{}", tmp_path.clone(), flv_file_name);

        tokio::spawn(async move {
            add_task(params.id, save_path.clone(), params.platform.clone()).await;
            download_flv(flv_stream_url, headers, save_path, params.id).await;
        });
    }

    ResponseStruct::success(json!("success"))
}
