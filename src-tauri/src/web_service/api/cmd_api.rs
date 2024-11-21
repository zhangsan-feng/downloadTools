use serde_json::{json, Value};
use crate::web_service::utils::response_impl::{ResponseImpl, ResponseStruct};
use axum::Json;
use serde::{Deserialize, Serialize};
use crate::web_service::api::download_record::add_record;


#[derive(Debug, Serialize, Deserialize, Clone,)]
pub struct RequestParams{
    id:i64,
    platform:String,
    audio_file_name:String,
    video_file_name:String,
    merge_file_name:String,

}
// pub async fn call_command(Json(params):Json<RequestParams>) ->Json<Value>{
//
//     std::process::Command::new("curl").args(params.cmd.split_whitespace()).output().unwrap();
//     ResponseStruct::success(json!("success"))
// }

pub async fn ffmpeg_composite_video(Json(params):Json<RequestParams>) ->Json<Value>{
    let tmp_path = format!("./download/{}/", params.platform.clone());
    let audio_file_name = format!("{}{}",tmp_path, params.audio_file_name.clone());
    let video_file_name = format!("{}{}",tmp_path, params.video_file_name.clone());
    let merge_file_name = format!("{}{}",tmp_path, params.merge_file_name.clone());
    let cmd = format!("-i {} -i {} -c:v copy -c:a aac -async 1 {}", video_file_name,  audio_file_name, merge_file_name);
    std::process::Command::new("ffmpeg").args(cmd.split_whitespace()).output().expect("ffmpeg command failed");
    tokio::fs::remove_file(audio_file_name).await.unwrap();
    tokio::fs::remove_file(video_file_name).await.unwrap();
    add_record(params.id, merge_file_name.clone(), params.platform.clone(), "".to_string(), "".to_string()).await;

    ResponseStruct::success(json!("success"))
}

// pub async fn ffmpeg_download_m38u(){}