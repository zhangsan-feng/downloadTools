// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod web_service;

use web_service::start_web_service;

#[tokio::main]
async fn main() {

    // tokio::spawn(async move {
    //     start_web_service().await;
    // });

    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

}


// https://v2.tauri.app/start/