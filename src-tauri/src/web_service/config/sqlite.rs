use log::{info, LevelFilter};
use sea_orm::{
    ConnectOptions, ConnectionTrait, Database, DatabaseBackend, DatabaseConnection, Statement,
};

// https://www.sea-ql.org/SeaORM/docs/install-and-config/connection/
// https://www.sea-ql.org/SeaORM/docs/install-and-config/debug-log/#sqlx-logging
pub async fn get_conn() -> DatabaseConnection {
    let mut opt = ConnectOptions::new("sqlite:./databases.db?mode=rwc".to_owned());
    opt.sqlx_logging(true);
    opt.sqlx_logging_level(LevelFilter::Debug);
    Database::connect(opt).await.expect("open db file error")
}

pub async fn get_web_site_conn() -> DatabaseConnection {
    let p = "C:/Users/10463/AppData/Local/Google/Chrome/User Data/Default/Network/Cookies";
    // let p = "C:/Users/10463/AppData/Local/Google/Chrome/User Data/Default/Network/Cookies";
    // let p = "C:/Users/10463/AppData/Local/Google/Chrome/User Data/Default/Network/Cookies";

    let db_file = format!("sqlite:{}?mode=rwc", p);
    let mut opt = ConnectOptions::new(db_file);
    opt.sqlx_logging(true);
    opt.sqlx_logging_level(LevelFilter::Debug);
    Database::connect(opt).await.expect("open db file error")
}

pub async fn init_db() {
    let conn = get_conn().await;

    // let table_sql_bilibili = "
    //     CREATE TABLE IF NOT EXISTS bilibili (
    //         aid int PRIMARY KEY ,
    //         bvid VARCHAR(30),
    //         cid int ,
    //         download_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //         save_path VARCHAR(200),
    //         author VARCHAR(50),
    //         title VARCHAR(200)
    //     );
    // ";
    //
    let table_sql_download_config = "
        CREATE TABLE IF NOT EXISTS download_config (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cookie text not null,
            platform varchar not null
        );
    ";

    let table_sql_download_list = "
        CREATE TABLE IF NOT EXISTS download_list (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url text not null
        );
    ";

    conn.execute(Statement::from_string(
        DatabaseBackend::Sqlite,
        table_sql_download_config,
    ))
    .await
    .expect("create table error");

    conn.execute(Statement::from_string(
        DatabaseBackend::Sqlite,
        table_sql_download_list,
    ))
    .await
    .expect("create table error");

    info!("init databases success")
}
