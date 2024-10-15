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
use tokio::sync::RwLock;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct TaskInfo{
    author: String,
    title: String,
    description: String,
    sec_uid: String,
    uid: String,

}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DownLoadTaskManager {
    pub task_status: String,
    pub children: Vec<TaskInfo>,
    pub platform:String,
    pub file_size:i64
}

lazy_static! {
    pub static ref DOWN_LOAD_TASK_MANAGER: Arc<RwLock<HashMap<i64, DownLoadTaskManager>>> =
        Arc::new(RwLock::new(HashMap::new()));
}


pub async fn add_task(id: i64, task: TaskInfo, _platform:String) {
    info!("add new task {}", id);
    let mut task_manager = DOWN_LOAD_TASK_MANAGER.write().await;
    match task_manager.get_mut(&id) {
        Some(task_vec) => {
            task_vec.children.push(task);
        }
        None => {
            let mut new_task_vec = Vec::new();
            new_task_vec.push(task);
            let manager = DownLoadTaskManager {
                task_status: "running".to_string(),
                children: new_task_vec,
                platform: _platform,
                file_size: 0,
            };
            task_manager.insert(id, manager);
        }
    }
}


pub async fn task_query() {
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
    };

}


pub async fn task_update() {
    // let mut task_manager = DOWN_LOAD_TASK_MANAGER.write().await;
    // // info!("{}", task_name);
    // match task_manager.get_mut(&id) {
    //     Some(task) => {
    //         task.task_status = "stop".to_string();
    //     }
    //     None => {}
    // };

}

pub async fn task_is_running(id: i64) -> bool {
    // let task_manager = DOWN_LOAD_TASK_MANAGER.read().await;
    // match task_manager.get(&id) {
    //     Some(task_vec) => {
    //         if task_vec.task_status == "done".to_string()
    //             || task_vec.task_status == "stop".to_string()
    //         {
    //             return false;
    //         }
    //     }
    //     None => {}
    // }
    true
}
