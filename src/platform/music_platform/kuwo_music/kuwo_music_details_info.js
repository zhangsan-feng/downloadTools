import {getReqId, getSecret} from "./kuwo_music_Secret.js";
import {ProxyApi} from "../../../api/axios_http.js";




export async function KuWoMusicDetailsInfo(source, config){
    const music_id = source.download_link.split("?")[0].replace("https://www.kuwo.cn/play_detail/", "")
    // console.log(music_id)
    const cookie = config['kw_music']['cookie']
    const request_url = "https://www.kuwo.cn/api/v1/www/music/playUrl"
    const request_headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Cookie': cookie,
        'Pragma': 'no-cache',
        'Referer': 'https://www.kuwo.cn/play_detail/324244',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': navigator.userAgent,
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'Secret' : getSecret(cookie)
    }

    const request_params = {
        'mid': music_id,
        'type': 'music',
        'httpsStatus': '1',
        'reqId': getReqId(),
        'plat': 'web_www',
        'from': '',
    }

    const proxy_params = {
        req_url:request_url,
        req_type:"GET",
        req_params:request_params,
        req_headers:request_headers
    }
    // console.log(proxy_params)
    let {response_body} = await ProxyApi(proxy_params)
    response_body = JSON.parse(response_body)
    // console.log(response_body)
    return {"response_body":response_body, "request_headers":request_headers}
}

