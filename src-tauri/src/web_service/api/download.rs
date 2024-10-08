use crate::web_service::config::static_path::match_platform;
use crate::web_service::utils::download_task::{add_task, task_is_running};
use crate::web_service::utils::http_client::{download_file, download_flv, http_headers};
use log::info;
use serde_json::{from_str, json, Value};
use std::collections::HashMap;

pub async fn download_video(parameter: String) -> Result<String, String> {
    let json_data: Value = serde_json::from_str(parameter.as_str()).expect("Failed to parse JSON");
    info!(
        "call args parameter {}",
        serde_json::to_string_pretty(&json_data).expect("json error")
    );

    let task_name = format!("{}", json_data["task_name"].as_str().expect(""));
    let headers = http_headers(json_data["headers"].clone());
    let platform = match_platform(json_data["platform"].as_str().unwrap().to_string());
    let data_map: HashMap<String, String> = match json_data["data"].as_object() {
        Some(video_obj) => video_obj
            .iter()
            .filter_map(|(k, v)| v.as_str().map(|s| (k.clone(), s.to_string())))
            .collect(),
        None => HashMap::new(),
    };

    if task_is_running(task_name.clone()).await == false {
        return Ok(json!({
            "code" : "200",
            "data" : "stop"
        })
        .to_string());
    }

    for (key, value) in data_map {
        let file_name = format!("{}{}", platform, key);
        download_file(value, headers.clone(), file_name.clone()).await;
        add_task(task_name.clone(), file_name).await;
    }

    Ok(json!({
        "code":"200",
        "data":format!("download success {} ", json_data["task_name"])
    })
    .to_string())
}

pub async fn download_live(parameter: String) {
    let json_data: Value = from_str(parameter.as_str()).expect("Failed to parse JSON");
    info!(
        "call args parameter {}",
        serde_json::to_string_pretty(&json_data).expect("json error")
    );

    let task_name = format!("{}", json_data["task_name"]);
    let headers = http_headers(json_data["headers"].clone());
    let platform = match_platform(json_data["platform"].as_str().unwrap().to_string());
    let flv_file_name = format!(
        "{}{}",
        platform,
        json_data["flv_file_name"].as_str().unwrap().to_string()
    );
    let flv_url = json_data["flv_url"]
        .as_str()
        .map(|s| s.to_string())
        .unwrap_or("".to_string());

    info!("{}", flv_file_name);
    info!("{}", flv_url);

    add_task(task_name.clone(), flv_file_name.clone()).await;
    download_flv(
        flv_url.clone(),
        headers,
        flv_file_name.clone(),
        task_name.clone(),
    ).await;

}
