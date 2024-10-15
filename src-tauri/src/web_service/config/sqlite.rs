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

pub async fn init_db() {
    let conn = get_conn().await;

    let table_sql_download_config = "
        CREATE TABLE IF NOT EXISTS download_config (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cookie text not null,
            platform varchar not null,
            regexp_rule text not null
        );
    ";

    // let table_sql_download_list = "
    //     CREATE TABLE IF NOT EXISTS download_list (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         url text not null
    //     );
    // ";

    conn.execute(Statement::from_string(
        DatabaseBackend::Sqlite,
        table_sql_download_config,
    )).await.expect("create table error");

    // conn.execute(Statement::from_string(
    //     DatabaseBackend::Sqlite,
    //     table_sql_download_list,
    // )).await.expect("create table error");

    info!("init databases success")
}
