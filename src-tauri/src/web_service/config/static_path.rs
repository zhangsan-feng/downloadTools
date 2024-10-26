use log::info;



pub static LOGGER_PATH: &str = "./logs/";
pub static APPS: &str = "./apps/";

pub async fn init_dir_config() {
    let dir_list = [LOGGER_PATH, APPS];

    for path in dir_list {
        if tokio::fs::metadata(path).await.is_ok() {
            continue;
        }

        match tokio::fs::create_dir_all(path).await {
            Ok(()) => info!("Directory created successfully {}", path),
            Err(e) => info!("Failed to create directory: {}", e),
        }
    }
}

