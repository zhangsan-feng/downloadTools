use crate::web_service::config::sqlite::get_conn;
use log::info;
use sea_orm::TransactionError::Connection;
use sea_orm::{
    entity::{prelude::*, ActiveModelTrait},
    ColumnTrait, EntityTrait, Set,
};
use serde_json::json;
use std::collections::HashMap;

use crate::web_service::entity::cookie_entity;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "download_config")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = true)]
    pub id: i64,
    pub platform: String,
    pub cookie: String,
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
pub async fn download_config_query() -> Result<String, String> {
    let conn = get_conn().await;
    let db_data = cookie_entity::Entity::find()
        .all(&conn)
        .await
        .expect("sql query error");
    // info!("{:?}", db_data);

    Ok(json!({
        "code":200,
        "data":db_data,
    })
    .to_string())
}

#[tauri::command]
pub async fn download_config_update(platform: String, cookie: String) -> Result<String, String> {
    info!("platform:{}", platform);
    info!("cookie:{}", cookie);

    let conn = get_conn().await;
    let db_data = cookie_entity::Entity::find()
        .filter(cookie_entity::Column::Platform.eq(platform.clone()))
        .one(&conn)
        .await
        .expect("sql query error");

    if db_data.is_none() {
        let object = cookie_entity::ActiveModel {
            platform: Set(platform.to_owned()),
            cookie: Set(cookie.to_owned()),
            ..Default::default()
        };
        object.insert(&conn).await.expect("sql insert error");
    } else {
        let mut db_data: ActiveModel = db_data.expect("").into();
        db_data.cookie = Set(cookie.to_owned());
        db_data.update(&conn).await.expect("sql update error");
    }

    Ok(json!({
        "code":200,
        "data":  format!("{} update success", platform),
    })
    .to_string())
}
