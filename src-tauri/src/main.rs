// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod web_service;

use web_service::start_web_service;
use crate::web_service::config::config::init_config;
use web_service::utils::http_proxy::start_proxy_service;
use web_service::utils::http_reverse_proxy::start_reverse_proxy;

#[tokio::main]
async fn main() {
    init_config().await;
    tokio::spawn(async move {
        start_web_service().await;
    });

    // tokio::spawn(async move {
    //     start_proxy_service().await;
    // });

    // tokio::spawn(async move {
    //     start_reverse_proxy().await;
    // });

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

}


// https://v2.tauri.app/start/