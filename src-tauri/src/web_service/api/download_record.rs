use lazy_static::lazy_static;
use log::info;
use rand::{thread_rng, Rng};
use serde::{Deserialize, Serialize};
use serde_json::{json, to_value, Value};
use std::collections::HashMap;
use std::sync::Arc;
use axum::Json;
use tokio::sync::RwLock;
use crate::web_service::utils::response_impl::{ResponseImpl, ResponseStruct};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Task {
    pub status:String,
    pub source:String,
    pub nickname:String,
    pub platform:String,
    pub children: Vec<String>,
}

lazy_static! {
     static ref TaskManager: Arc<RwLock<HashMap<i64, Task>>> = Arc::new(RwLock::new(HashMap::new()));
}


#[derive(Debug, Serialize, Deserialize, Clone,)]
pub struct RequestParams{
    id:i64,
}


pub async fn add_record(id: i64, file_name: String, _platform:String, source:String, nickname:String) {
    info!("add new task {}, {}, {}", id, _platform, file_name);
    let mut task_manager = TaskManager.write().await;
    match task_manager.get_mut(&id) {
        Some(task_vec) => {
            task_vec.children.push(file_name);
        }
        None => {
            let record = Task{
                nickname:nickname.clone(),
                source:source.clone(),
                status: "running".to_string(),
                children: vec![file_name],
                platform: _platform
            };
            task_manager.insert(id, record);
        }
    }
}


pub async fn download_record_query() -> axum::Json<Value> {
    let tasks_manager = TaskManager.read().await;
    let mut tmp_list: Vec<HashMap<String, Value>> = Vec::new();
    let mut rng = thread_rng();

    for (key, value) in tasks_manager.iter() {
        // log::info!("{:?}", key);
        // log::info!("{:?}", value);

        let mut tmp_map: HashMap<String, Value> = HashMap::new();
        let mut children: Vec<Value> = Vec::new();

        for (i, c) in value.children.iter().enumerate() {
            let mut children_map: HashMap<String, Value> = HashMap::new();

            let n4: i64 = rng.gen_range(1..=i64::MAX);
            children_map.insert("id".to_string(), to_value(i as i64 + n4).unwrap());
            children_map.insert("file_name".to_string(), to_value(c).unwrap());
            children.push(to_value(children_map).unwrap());
        }

        tmp_map.insert("id".to_string(), to_value(key).unwrap());
        tmp_map.insert("status".to_string(), to_value(&value.status).unwrap());
        tmp_map.insert("nickname".to_string(), to_value(&value.nickname).unwrap());
        tmp_map.insert("source".to_string(), to_value(&value.source).unwrap());
        tmp_map.insert("platform".to_string(), to_value(&value.platform).unwrap());
        tmp_map.insert("children_element".to_string(), to_value(&children).unwrap());
        tmp_list.push(tmp_map);

    };

    ResponseStruct::success(json!(tmp_list))

}

pub async fn stop_download_task(Json(params):Json<RequestParams>) ->axum::Json<Value>{
    let mut task_manager = TaskManager.write().await;
    // info!("{}", task_name);
    match task_manager.get_mut(&params.id) {
        Some(task) => {
            task.status = "stop".to_string();
        }
        None => {}
    };

    ResponseStruct::success(json!("success"))
}

pub async fn download_finish(Json(params):Json<RequestParams>) -> axum::Json<Value>{
    let mut task_manager = TaskManager.write().await;
    // info!("{}", task_name);
    match task_manager.get_mut(&params.id) {
        Some(task) => {
            task.status = "finish".to_string();
        }
        None => {}
    };

    ResponseStruct::success(json!("success"))
}


pub async fn task_is_running(id:i64) -> bool {
    let task_manager = TaskManager.read().await;
    match task_manager.get(&id) {
        Some(task_vec) => {
            if task_vec.status == "done".to_string() || task_vec.status == "stop".to_string() {
                return false;
            }
        }
        None => {}
    }
    true
}
