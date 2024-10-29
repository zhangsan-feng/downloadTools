import {GenDetailsSignature, GetCookieDFid, GetCookieMid} from "./kugou_sign.ts";
import {ProxyApi, ProxyParams} from "../../../api/axios_http.ts";


async function KuGouMusicDetailsForHtml(){}


async function KuGouMusicDetailsForApi(source, config){
    const request_url = "https://wwwapi.kugou.com/play/songinfo"
    const cookie = config['kg_music']['cookie']
    const request_headers = {
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en-US;q=0.7,en;q=0.6',
        'origin': 'https://www.kugou.com',
        'priority': 'u=1, i',
        'referer': 'https://www.kugou.com/',
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    }

    const clienttime = Date.now();
    const request_params = {
        'srcappid': '2919',
        'clientver': '20000',
        'clienttime': clienttime,
        'mid': GetCookieMid(cookie),
        'uuid': GetCookieMid(cookie),
        'dfid': GetCookieDFid(cookie),
        'appid': '1014',
        'platid': '4',
        'encode_album_audio_id': source.music_id,
        'token': '',
        'userid': '0',
        'signature': GenDetailsSignature(cookie, clienttime, source.music_id)
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

export async function KuGouMusicDetailsInfo(source, config){
    return await KuGouMusicDetailsForApi(source, config)
}