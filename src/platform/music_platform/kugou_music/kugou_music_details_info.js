import {GenDetailsSignature, GetCookieDFid, GetCookieMid} from "./kugou_sign.js";
import {ProxyApi} from "../../../api/axios_http.js";



export async function KuGouMusicDetailsInfo(source, config){
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
        'user-agent': navigator.userAgent,
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

