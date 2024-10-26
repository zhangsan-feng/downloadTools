use log::info;
use serde_json::json;
use crate::web_service::config::sqlite::get_conn;
use sea_orm::{entity::{prelude::*}, Set};
use serde::{Deserialize, Serialize};
use crate::web_service::entity::platform_config_entity;
use crate::web_service::utils::response_impl::{ResponseImpl, ResponseStruct};




pub async fn platform_config_query() -> axum::Json<serde_json::Value>{
    let conn = get_conn().await;
    let db_data = platform_config_entity::Entity::find()
        .all(&conn)
        .await
        .expect("sql query error");
    // info!("{:?}", db_data);

    ResponseStruct::success(json!(db_data))
}

#[derive(Debug, Serialize, Deserialize, Clone, Default)]
pub struct PlatformConfigParams{
    platform:String,
    cookie:String,
}

pub async fn platform_config_update(axum::Json(params): axum::Json<PlatformConfigParams>) -> axum::Json<serde_json::Value>  {
    info!("platform:{}", params.platform);
    info!("cookie:{}", params.cookie);

    let conn = get_conn().await;
    let db_data = platform_config_entity::Entity::find()
        .filter(platform_config_entity::Column::Platform.eq(params.platform.clone()))
        .one(&conn)
        .await
        .expect("sql query error");

    if db_data.is_none() {
        let object = platform_config_entity::ActiveModel {
            platform: Set(params.platform.to_owned()),
            cookie: Set(params.cookie.to_owned()),
            ..Default::default()
        };
        object.insert(&conn).await.expect("sql insert error");
    } else {
        let mut db_data: platform_config_entity::ActiveModel = db_data.expect("").into();
        db_data.cookie = Set(params.cookie.to_owned());
        db_data.update(&conn).await.expect("sql update error");
    }
    let s = format!("{} {}", params.platform, "更新成功");
    ResponseStruct::success(json!(s))
}