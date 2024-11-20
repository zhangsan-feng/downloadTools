use crate::web_service::config::static_path::BILI_BILI_DIR;
use crate::web_service::api::download_task::{add_record, task_is_running};
use crate::web_service::utils::http_client::{download_file, http_headers};
use log::info;
use serde_json::{from_str, json, Value};
use std::collections::HashMap;
use std::fs;
use std::process::Command;
use tauri::command;


fn check_ffmpeg_installed() -> bool {
    Command::new("ffmpeg")
        .arg("-version")
        .output()
        .map(|output| output.status.success())
        .unwrap_or(false)
}

pub async fn bilibili_video(parameter: String) -> Result<String, String> {
    if !check_ffmpeg_installed() {
        return Ok(json!({
            "code" : "500",
            "data" : format!("please download ffmpeg")
        })
        .to_string());
    }

    let json_data: Value = from_str(parameter.as_str()).expect("json encode error");
    // info!("{:?}", json_data);
    let headers = http_headers(json_data["headers"].clone());
    // info!("{:?}", headers.clone());

    let task_name = format!(
        "{}",
        json_data["task_name"].as_str().expect("convert str error")
    );

    if !json_data["data"].clone().is_null() {
        let data_list: &Vec<Value> = json_data["data"].as_array().expect("");

        // info!("{:?}", data_list);
        for data in data_list {
            if task_is_running(task_name.clone()).await == false {
                return Ok(json!({
                    "code" : "200",
                    "data" : "stop"
                })
                .to_string());
            }

            // info!("{}", data);
            let data_map: HashMap<String, String> = match data.as_object() {
                Some(video_obj) => video_obj
                    .iter()
                    .filter_map(|(k, v)| v.as_str().map(|s| (k.clone(), s.to_string())))
                    .collect(),
                None => HashMap::new(),
            };
            // info!("{:?}", data_map);

            let video_url = data_map.get("video_url").expect("").to_string();
            let audio_url = data_map.get("audio_url").expect("").to_string();
            let video_file_name = format!(
                "{}{}",
                BILI_BILI_DIR,
                data_map.get("video_file_name").expect("").to_string()
            );
            let audio_file_name = format!(
                "{}{}",
                BILI_BILI_DIR,
                data_map.get("audio_file_name").expect("").to_string()
            );
            let merge_file_name = format!(
                "{}{}",
                BILI_BILI_DIR,
                data_map.get("merge_file_name").expect("").to_string()
            );

            info!("video_url:{}", video_url);
            info!("audio_url:{}", audio_url);
            info!("video_file_name:{}", video_file_name);
            info!("audio_file_name:{}", audio_file_name);
            info!("merge_file_name:{}", merge_file_name);

            if tokio::fs::metadata(merge_file_name.clone()).await.is_ok() {
                continue;
            }

            download_file(video_url.clone(), headers.clone(), video_file_name.clone()).await;
            download_file(audio_url.clone(), headers.clone(), audio_file_name.clone()).await;

            let args = format!(
                " -i {} -i {} -c:v copy -c:a aac {} -y",
                video_file_name, audio_file_name, merge_file_name
            );
            info!("call ffmpeg: {}", args);
            Command::new("ffmpeg").
                // creation_flags(0x08000000).
                args(args.split_whitespace()).spawn().
                expect("call ffmpeg error").wait().expect("cmd wait error");

            tokio::fs::remove_file(video_file_name)
                .await
                .expect("remove file error");
            tokio::fs::remove_file(audio_file_name)
                .await
                .expect("remove file error");

            add_record(task_name.clone(), merge_file_name.clone()).await;
        }
    }
    return Ok(json!({
        "code" : "200",
        "data" : format!("{} success", json_data["task_name"])
    })
    .to_string());
}
