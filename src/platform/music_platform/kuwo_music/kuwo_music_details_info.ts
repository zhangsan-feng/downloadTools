import {getReqId, getSecret} from "./kuwo_music_Secret.js";
import {ProxyApi, ProxyParams} from "../../../api/axios_http.ts";


async function KuWoMusicDetailsInfoForHtml(source, config){

}

async function KuWoMusicDetailsInfoForApi(source, config){
    const music_id = source.download_link.split("?")[0].replace("https://www.kuwo.cn/play_detail/", "")
    // console.log(music_id)
    const cookie = '_ga=GA1.2.1312299211.1726711416; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1728628418,1729043449,1729492565; HMACCOUNT=767E63CB2A05D70F; _gid=GA1.2.545340960.1729492586; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1729493427; _ga_ETPBRPM9ML=GS1.2.1729492599.7.1.1729493426.15.0.0; Hm_Iuvt_cdb524f42f23cer9b268564v7y735ewrq2324=8TS4X2pjaiDkwQicT2hnxTTRj3PwwpeJ'
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
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

    const proxy_params:ProxyParams = {
        req_url:request_url,
        req_type:"GET",
        req_params:request_params,
        req_headers:request_headers
    }
    // console.log(proxy_params)
    const response = await ProxyApi(proxy_params)
    // const response_header = response.headers
    const response_body = JSON.parse(response.body)
    // console.log(response_body)
    return {"response_body":response_body, "request_headers":request_headers}
}

export async function KuWoMusicDetailsInfo(source, config){
    return await KuWoMusicDetailsInfoForApi(source, config)
}