// use crate::web_service::api::task::task_is_running;
use futures_util::StreamExt;
use log::info;
use reqwest::header::{HeaderMap, HeaderName, HeaderValue};
use reqwest::Response;
use std::io::Write;
use std::str::FromStr;
use reqwest::redirect::Policy;

pub async fn http_get(url: String, headers: HeaderMap,  params: serde_json::Value) -> Response {
    let client = reqwest::Client::new();
    let response = client.get(url)
        .headers(headers)
        .query(&params)
        .send()
        .await
        .expect("call error");
    response
}

pub async fn http_get_no_redirect(url: String, headers: HeaderMap,  params: serde_json::Value) -> Response {
    let client = reqwest::Client::builder().redirect(Policy::none()).build().unwrap();
    let response = client.get(url)
        .headers(headers)
        .query(&params)
        .send()
        .await
        .expect("call error");
    response
}

pub async fn http_post(url: String, headers: HeaderMap, params: String) -> Response {
    let client = reqwest::Client::new();
    let response = client
        .post(url)
        .headers(headers)
        .body(params)
        .send()
        .await
        .expect("call error");
    response
}

pub async fn http_post_json(url: String, headers: HeaderMap, params: serde_json::Value) -> Response {
    let client = reqwest::Client::new();
    let response = client
        .post(url)
        .headers(headers)
        .json(&params)
        .send()
        .await
        .expect("call error");
    response
}

pub async fn http_post_form(url: String, headers: HeaderMap, params: serde_json::Value) -> Response {

    let client = reqwest::Client::new();
    let response = client
        .post(url)
        .headers(headers)
        .form(&params)
        .send()
        .await
        .expect("call error");
    response
}

pub async fn download_file(url: String, headers: HeaderMap, save_path: String) -> bool {
    if tokio::fs::metadata(save_path.clone()).await.is_ok() {
        tokio::time::sleep(std::time::Duration::from_millis(100)).await;
        return true;
    }

    let client = reqwest::Client::new();
    let response = client
        .get(url.clone())
        .headers(headers)
        .send()
        .await
        .expect("call error");

    info!("current request url {} response code {} ",url.clone(),response.status());
    info!("current file path {} ", save_path.clone());

    // let mut file = std::fs::OpenOptions::new().create(true).write(true).append(true).open((save_path.clone())).expect("create file fd error");
    let mut file = std::fs::OpenOptions::new()
        .create(true)
        .write(true)
        .open(save_path.clone())
        .expect("create file fd error");
    let mut stream = response.bytes_stream();

    while let Some(item) = stream.next().await {
        let chunk = item.expect("item error");
        file.write_all(&chunk).expect("file write error");
    }
    info!("current download file {} success", save_path.clone());

    true
}

pub async fn download_flv(url: String, headers: HeaderMap, save_path: String) {
    let client = reqwest::Client::new();
    let response = client
        .get(url.clone())
        .headers(headers)
        .send()
        .await
        .expect("call error");

    info!(
        "current request url {} response code {} ",
        url.clone(),
        response.status()
    );
    info!("current file path {} ", save_path.clone());

    // let mut file = std::fs::OpenOptions::new().create(true).write(true).append(true).open(save_path.clone()).expect("create file fd error");
    let mut file = std::fs::OpenOptions::new()
        .create(true)
        .write(true)
        .open(save_path.clone())
        .expect("create file fd error");
    let mut stream = response.bytes_stream();

    while let Some(item) = stream.next().await {
        let chunk = item.expect("item error");
        file.write_all(&chunk).expect("file write error");

        // if task_is_running(task_name.clone()).await == false {
        //     return;
        // }
    }
}

// async fn download_m3u8(url:String, headers:Box<dyn Hash>, params: Box<dyn Hash>, save_path:String){}

// async fn try_func(){
//     let url = "".to_string();
//     get(url.clone(),HeaderMap::new(),HashMap::new()).await;
//     post(url.clone(),HeaderMap::new(),url.clone()).await;
//     post_form(url.clone(),HeaderMap::new(),json!({})).await;
//     post_json(url.clone(),HeaderMap::new(),json!({})).await;
// }

pub fn convert_headers(headers: serde_json::Value) -> HeaderMap {
    let headers_obj = headers.as_object().expect("json error");

    let mut header_map = HeaderMap::new();
    for (key, value) in headers_obj {
        let header_key = HeaderName::from_str(key.as_str()).expect("");
        let header_value = HeaderValue::from_str(value.as_str().expect("")).expect("");
        header_map.insert(header_key, header_value);
    }
    header_map
}
