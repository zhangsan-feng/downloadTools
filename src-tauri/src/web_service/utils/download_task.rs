use lazy_static::lazy_static;
use log::info;
use rand::{thread_rng, Rng};
use sea_orm::sea_query::IndexType::Hash;
use sea_orm::sea_query::IntoLikeExpr;
use sea_orm::ColIdx;
use serde::{Deserialize, Serialize};
use serde_json::{json, to_value, Value};
use std::collections::HashMap;
use std::sync::Arc;
use std::time::Duration;
use tokio::sync::RwLock;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DownLoadTaskManager {
    pub task_status: String,
    pub children: Vec<String>,
}

lazy_static! {
    pub static ref DOWN_LOAD_TASK_MANAGER: Arc<RwLock<HashMap<String, DownLoadTaskManager>>> =
        Arc::new(RwLock::new(HashMap::new()));
}

// pub async fn task_exist(task_name:String) -> bool{
//     let task_manager = DOWN_LOAD_TASK_MANAGER.read().await;
//     task_manager.get(&task_name).is_none()
// }

#[tauri::command]
pub async fn creat_task(task_name: String) {
    let mut task_manager = DOWN_LOAD_TASK_MANAGER.write().await;
    if task_manager.get(&task_name).is_none() {
        let new_task_vec = Vec::new();
        let manager = DownLoadTaskManager {
            task_status: "running".to_string(),
            children: new_task_vec,
        };
        task_manager.insert(task_name, manager);
    }
}

pub async fn add_task(task_name: String, task: String) {
    info!("add new task {}", task_name);
    let mut task_manager = DOWN_LOAD_TASK_MANAGER.write().await;
    match task_manager.get_mut(&task_name) {
        Some(task_vec) => {
            task_vec.children.push(task);
        }
        None => {
            let mut new_task_vec = Vec::new();
            new_task_vec.push(task);
            let manager = DownLoadTaskManager {
                task_status: "running".to_string(),
                children: new_task_vec,
            };
            task_manager.insert(task_name, manager);
        }
    }
}

#[tauri::command]
pub async fn del_task(task_name: String) -> Result<String, String> {
    let mut task_manager = DOWN_LOAD_TASK_MANAGER.write().await;
    task_manager.remove(&task_name);
    Ok(json!({
       "code":200,
        "data":format!("{} delete success", task_name),
    })
    .to_string())
}

#[tauri::command]
pub async fn update_status(task_name: String) {
    let mut task_manager = DOWN_LOAD_TASK_MANAGER.write().await;
    info!("update taks status {}", task_name);
    match task_manager.get_mut(&task_name) {
        Some(task) => {
            task.task_status = "finish".to_string();
        }
        None => {}
    }
    // info!("{:?}", task_manager)
}

#[tauri::command]
pub async fn update_status_filed(task_name: String) {
    let mut task_manager = DOWN_LOAD_TASK_MANAGER.write().await;
    info!("update taks status {}", task_name);
    match task_manager.get_mut(&task_name) {
        Some(task) => {
            task.task_status = "filed".to_string();
        }
        None => {}
    }
    // info!("{:?}", task_manager)
}

#[tauri::command]
pub async fn task_query_all() -> Result<String, String> {
    let tasks_manager = DOWN_LOAD_TASK_MANAGER.read().await;
    let mut tmp_list: Vec<HashMap<String, Value>> = Vec::new();
    let mut index = 0;
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
            children_map.insert("task_name".to_string(), to_value(c).unwrap());
            children.push(to_value(children_map).unwrap());
        }

        tmp_map.insert("id".to_string(), to_value(index).unwrap());
        tmp_map.insert("task_name".to_string(), to_value(key).unwrap());
        tmp_map.insert(
            "task_status".to_string(),
            to_value(&value.task_status).unwrap(),
        );
        tmp_map.insert("children".to_string(), to_value(&children).unwrap());
        tmp_list.push(tmp_map);
        index += 1;
    }

    Ok(json!({
        "code" : 200,
        "data" : tmp_list,
    })
    .to_string())
}

#[tauri::command]
pub async fn task_clean_all() -> Result<String, String> {
    DOWN_LOAD_TASK_MANAGER.write().await.clear();

    Ok(json!({
        "code":200,
        "data":"clean success",
    })
    .to_string())
}

#[tauri::command]
pub async fn task_stop(task_name: String) -> Result<String, String> {
    let mut task_manager = DOWN_LOAD_TASK_MANAGER.write().await;
    // info!("{}", task_name);
    match task_manager.get_mut(&task_name) {
        Some(task) => {
            task.task_status = "stop".to_string();
        }
        None => {}
    }
    // info!("{:?}",task_manager);
    Ok(json!({
        "code":200,
        "data":format!("{} stop success", task_name),
    })
    .to_string())
}

pub async fn task_is_running(task_name: String) -> bool {
    let task_manager = DOWN_LOAD_TASK_MANAGER.read().await;
    match task_manager.get(&task_name) {
        Some(task_vec) => {
            if task_vec.task_status == "done".to_string()
                || task_vec.task_status == "stop".to_string()
            {
                return false;
            }
        }
        None => {}
    }
    true
}

/*
task_name : [{},{},{}] video/image
task_name : [{}]   live



*/
