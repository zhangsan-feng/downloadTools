import {HTTPPost} from '../../../api/request.js'


// AxiosHTTPPost(url,params, headers).then(res=>{
//     console.log(res.data.web_id)
// })

let headers = {
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

    let url = "https://mcs.zijieapi.com/webid"
    let params = {
        "app_id": 6383,
        "referer": "https://www.douyin.com/",
        "url": "https://www.douyin.com/",
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
        "user_unique_id": "",
    }

    let response = await  HTTPPost(url,params, headers)
    let response_data = await response.data
    return response_data.web_id
}
// console.log(await GetWebId())