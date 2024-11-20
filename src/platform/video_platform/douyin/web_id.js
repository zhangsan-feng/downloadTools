
import {ProxyApi} from "../../../api/axios_http.ts";

let request_headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': navigator.userAgent,
}

export async function GetWebId(){

    let request_url = "https://mcs.zijieapi.com/webid"
    let request_params = {
        "app_id": 6383,
        "referer": "https://www.douyin.com/",
        "url": "https://www.douyin.com/",
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
        "user_unique_id": "",
    }

    const proxy_params = {
        req_url:request_url,
        req_type:"POSTJson",
        req_params:request_params,
        req_headers:request_headers
    }
    // console.log(proxy_params)
    let {response_body} = await ProxyApi(proxy_params)
    response_body = JSON.parse(response_body)
    console.log(response_body)
    return response_body.web_id
}
// console.log(await GetWebId())