use log::info;
use serde_json::json;
use crate::web_service::config::sqlite::get_conn;
use sea_orm::{
    entity::{prelude::*, ActiveModelTrait},
    ColumnTrait, EntityTrait, Set,
};
use crate::web_service::entity::cookie_entity;

struct ParamsEntity{
    id:i64,
    platform:String,
    cookie:String,
    pub regexp_rule:String,
}


pub async fn cookie_query() {
    let conn = get_conn().await;
    let db_data = cookie_entity::Entity::find()
        .all(&conn)
        .await
        .expect("sql query error");
    // info!("{:?}", db_data);


}


pub async fn cookie_update()  {
    // info!("platform:{}", platform);
    // info!("cookie:{}", cookie);
    //
    // let conn = get_conn().await;
    // let db_data = cookie_entity::Entity::find()
    //     .filter(cookie_entity::Column::Platform.eq(platform.clone()))
    //     .one(&conn)
    //     .await
    //     .expect("sql query error");
    //
    // if db_data.is_none() {
    //     let object = cookie_entity::ActiveModel {
    //         platform: Set(platform.to_owned()),
    //         cookie: Set(cookie.to_owned()),
    //         ..Default::default()
    //     };
    //     object.insert(&conn).await.expect("sql insert error");
    // } else {
    //     let mut db_data: cookie_entity::ActiveModel = db_data.expect("").into();
    //     db_data.cookie = Set(cookie.to_owned());
    //     db_data.update(&conn).await.expect("sql update error");
    // }

}