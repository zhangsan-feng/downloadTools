import {GetCookieMid, GetCookieDFid, GenSearchSignature} from './kugou_sign.ts'
import {ProxyApi, ProxyParams} from "../../../api/axios_http.ts";
import {word_analysis} from "../../comm.ts";

export async function KuGouMusicSearch(key_world, config){
    const request_url = "https://complexsearch.kugou.com/v2/search/song"
    const cookie = config['kg_music']['cookie']
    const request_headers = {
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en-US;q=0.7,en;q=0.6',
        'cookie': cookie,
        'referer': 'https://www.kugou.com/',
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    }
    const clienttime = Date.now();
    const request_params = {
        'callback': 'callback123',
        'srcappid': '2919',
        'clientver': '1000',
        'clienttime': clienttime,
        'mid': GetCookieMid(cookie),
        'uuid': GetCookieMid(cookie),
        'dfid': GetCookieDFid(cookie),
        'keyword': key_world,
        'page': '1',
        'pagesize': '30',
        'bitrate': '0',
        'isfuzzy': '0',
        'inputtype': '0',
        'platform': 'WebFilter',
        'userid': '0',
        'iscorrection': '1',
        'privilege_filter': '0',
        'filter': '10',
        'token': '',
        'appid': '1014',
        'signature':GenSearchSignature(cookie, clienttime, key_world)

    }

    const proxy_params:ProxyParams = {
        req_url:request_url,
        req_type:"GET",
        req_params:request_params,
        req_headers:request_headers
    }
    // console.log(proxy_params)
    const response = await ProxyApi(proxy_params)
    // console.log(response)
    // const response_header = response.headers
    const response_body = JSON.parse(response.body.replace("callback123(", "").slice(0, -1).slice(0, -1))
    // console.log(response_body)

    const call_back = []
    for (const index in response_body.data.lists) {
        const music_id = response_body.data.lists[index].EMixSongID
        const author = response_body.data.lists[index].SingerName
        const music_name = response_body.data.lists[index].SongName
        const download_link = "https://www.kugou.com/song/#" + music_id
        call_back.push({
            "id":Date.now() + Math.floor(Math.random() * 100000),
            "platform":"酷狗音乐",
            "music_id":music_id,
            "author":author,
            "music_name":music_name,
            "file_name":word_analysis(author) + "_" + music_name + "_" + ".mp3",
            "download_link":download_link
        })
        // console.log(response_body.data.lists[index])
    }
    // console.log(call_back)
    return call_back
}

