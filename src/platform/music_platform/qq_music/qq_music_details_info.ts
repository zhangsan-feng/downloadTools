import {stringify} from 'Qs'
import {ProxyApi, ProxyParams} from "../../../api/axios_http.ts";
import {RandomNumber, GetCookieKey} from "../../comm.ts";
import {zzcSign} from "./qq_music_sign.ts";


async function QQMusicDetailsInfoForHtml() {
}


async function QQMusicDetailsInfoForApi(source, config) {
    console.log(source)
    let request_url = "https://u6.y.qq.com/cgi-bin/musics.fcg"
    const request_headers = {
        'accept': 'application/json',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': config['qq_music']['cookie'],
        'origin': 'https://y.qq.com',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://y.qq.com/',
        'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    }
    const uin = GetCookieKey(request_headers['cookie'], "o2_uin")
    const request_params = {
        "comm": {
            "cv": 4747474,
            "ct": 24,
            "format": "json",
            "inCharset": "utf-8",
            "outCharset": "utf-8",
            "notice": 0,
            "platform": "yqq.json",
            "needNewCode": 1,
            "uin": uin,
            "g_tk_new_20200303": 1243203646,
            "g_tk": 1243203646
        },

        "req_4": {
            "module": "music.vkey.GetVkey",
            "method": "GetUrl",
            "param": {
                "guid": RandomNumber( 10),
                "songmid": [source.music_id],
                "songtype": [0],
                "uin": uin,
                "loginflag": 1,
                "platform": "20"
            }
        }
    }

    const clienttime = Date.now();
    const url_params = {
        '_': clienttime,
        'sign': zzcSign(JSON.stringify(request_params)),
    }

    request_url = request_url + "?" + stringify(url_params)
    const proxy_params: ProxyParams = {
        req_url: request_url,
        req_type: "POST",
        req_params: JSON.stringify(request_params),
        req_headers: request_headers
    }
    // console.log(proxy_params)
    const response = await ProxyApi(proxy_params)
    // const response_header = response.headers
    const response_body = JSON.parse(response.body)
    // console.log(response_body)
    return {"response_body":response_body, "request_headers":request_headers}
}


export async function QQMusicDetailsInfo(source, config) {
    return await QQMusicDetailsInfoForApi(source, config)
}