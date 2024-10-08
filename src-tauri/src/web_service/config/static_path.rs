use log::info;

pub static WEI_BO_DIR: &str = "./download/weibo/";
pub static DOU_YIN_DIR: &str = "./download/douyin/";
pub static BILI_BILI_DIR: &str = "./download/bilibili/";
pub static LOGGER_PATH: &str = "./logs/";
pub static HONG_SHU_DIR: &str = "./download/xiaohongshu/";
pub static KUAI_SHOU_DIR: &str = "./download/kuaishou/";
pub static APPS: &str = "./apps/";

pub async fn init_dir_config() {
    let dir_list = [
        BILI_BILI_DIR,
        WEI_BO_DIR,
        DOU_YIN_DIR,
        LOGGER_PATH,
        APPS,
        HONG_SHU_DIR,
        KUAI_SHOU_DIR,
    ];

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

pub fn match_platform(platform: String) -> String {
    if platform == "douyin" {
        return DOU_YIN_DIR.to_string();
    }
    if platform == "weibo" {
        return WEI_BO_DIR.to_string();
    }
    if platform == "hongshu" {
        return HONG_SHU_DIR.to_string();
    }
    if platform == "kuaishou" {
        return KUAI_SHOU_DIR.to_string();
    }
    if platform == "bilibili" {
        return BILI_BILI_DIR.to_string();
    }

    "".to_string()
}
