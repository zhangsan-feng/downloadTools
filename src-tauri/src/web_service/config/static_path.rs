use log::info;

pub static WEI_BO_DIR: &str = "./download/weibo/";
pub static DOU_YIN_DIR: &str = "./download/douyin/";
pub static BILI_BILI_DIR: &str = "./download/bilibili/";
pub static HONG_SHU_DIR: &str = "./download/xiaohongshu/";
pub static KUAI_SHOU_DIR: &str = "./download/kuaishou/";

pub static KU_GOU_DIR: &str = "./download/kugou/";
pub static KU_WO_DIR: &str = "./download/kuwo/";
pub static WANG_YI_DIR: &str = "./download/wangyi/";
pub static QQ_MUSIC_DIR: &str = "./download/qqmusic/";

pub static LOGGER_PATH: &str = "./logs/";

pub static APPS: &str = "./apps/";

pub async fn init_dir_config() {
    let dir_list = [
        LOGGER_PATH, APPS, BILI_BILI_DIR, WEI_BO_DIR, DOU_YIN_DIR, HONG_SHU_DIR,
        KUAI_SHOU_DIR, KU_GOU_DIR, KU_WO_DIR, WANG_YI_DIR, QQ_MUSIC_DIR
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
    match platform.as_str() {
        "douyin" => DOU_YIN_DIR.to_string(),
        "hongshu" => DOU_YIN_DIR.to_string(),
        "kuaishou" => DOU_YIN_DIR.to_string(),
        "bilibili" => DOU_YIN_DIR.to_string(),
        "weibo" => DOU_YIN_DIR.to_string(),
        "kuwo_music" => DOU_YIN_DIR.to_string(),
        "kugou_music" => DOU_YIN_DIR.to_string(),
        "wangyi_music" => DOU_YIN_DIR.to_string(),
        "qq_music" => DOU_YIN_DIR.to_string(),
        _ => "./download/".to_string()
    }

}
