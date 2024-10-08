use crate::web_service::config::sqlite::get_conn;
use crate::web_service::entity::download_list_entity;
use log::info;
use sea_orm::{
    entity::{prelude::*, ActiveModelTrait},
    ColumnTrait, DatabaseBackend, EntityTrait, Set, Statement,
};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "download_list")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = true)]
    pub id: i64,
    pub url: String,
}

#[derive(Copy, Clone, Debug, EnumIter)]
pub enum Relation {}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        panic!("No RelationDef")
    }
}

impl ActiveModelBehavior for ActiveModel {}

#[tauri::command]
pub async fn download_list_query() -> Result<String, String> {
    let conn = get_conn().await;
    let db_data = download_list_entity::Entity::find()
        .all(&conn)
        .await
        .expect("db query error");

    Ok(json!({
        "code":200,
        "data":db_data,
    })
    .to_string())
}

#[tauri::command]
pub async fn download_list_add(url: String) -> Result<String, String> {
    info!("{}", url);
    let conn = get_conn().await;
    let db_data = download_list_entity::Entity::find()
        .filter(download_list_entity::Column::Url.eq(url.clone()))
        .one(&conn)
        .await
        .expect("db query error");
    if db_data.is_none() {
        let object = download_list_entity::ActiveModel {
            url: Set(url),
            ..Default::default()
        };
        object.insert(&conn).await.expect("db insert error");
    } else {
        return Ok(json!({
            "code":200,
            "data":"url exist"
        })
        .to_string());
    }

    Ok(json!({
        "code":200,
        "data":"success"
    })
    .to_string())
}

#[tauri::command]
pub async fn download_list_del(id: i64) -> Result<String, String> {
    let conn = get_conn().await;
    download_list_entity::Entity::delete_many()
        .filter(download_list_entity::Column::Id.eq(id))
        .exec(&conn)
        .await
        .expect("db delete error");
    Ok(json!({
        "code":200,
        "data":"success"
    })
    .to_string())
}

#[tauri::command]
pub async fn download_list_clean() -> Result<String, String> {
    let conn = get_conn().await;

    conn.execute(Statement::from_string(
        DatabaseBackend::Sqlite,
        r"
               DROP TABLE download_list;
               CREATE TABLE IF NOT EXISTS download_list (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    url text not null
                );
       ",
    ))
    .await
    .expect("call sql error");

    Ok(json!({
        "code":200,
        "data":"success"
    })
    .to_string())
}
