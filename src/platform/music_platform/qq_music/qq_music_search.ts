import {stringify} from "qs";
import {ProxyApi, ProxyParams, ResourceParams} from '../../../api/axios_http.ts'
import {zzcSign} from './qq_music_sign.ts'
import {GetCookieKey, RandomNumber, word_analysis} from '../../comm.ts'


export async function QQMusicSearch(key_world, config) {
    let request_url = "https://u6.y.qq.com/cgi-bin/musics.fcg"
    const request_headers = {
        'accept': 'application/json',
        'accept-language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en-US;q=0.7,en;q=0.6',
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': config['qq_music']['cookie'],
        'origin': 'https://y.qq.com',
        'priority': 'u=1, i',
        'referer': 'https://y.qq.com/',
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
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
            "g_tk_new_20200303": 421216218,
            "g_tk": 421216218
        },
        "req_1": {
            "method": "DoSearchForQQMusicDesktop",
            "module": "music.search.SearchCgiService",
            "param": {
                "remoteplace": "txt.yqq.top",
                "searchid": RandomNumber(16,18),
                "search_type": 0,
                "query": key_world,
                "page_num": 1,
                "num_per_page": 10
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
    // const response_headers = response.response_headers
    const response_body = JSON.parse(response.body)
    // console.log(response_body)

    const call_back = []
    for (const index in response_body.req_1.data.body.song.list){
        const music_id   = response_body.req_1.data.body.song.list[index]['mid']
        const song_id    = response_body.req_1.data.body.song.list[index]['id']
        const album_mid  = response_body.req_1.data.body.song.list[index]['album']['mid']
        const author     = response_body.req_1.data.body.song.list[index]['singer'][0].name
        const music_name = response_body.req_1.data.body.song.list[index]['name']
        const download_link = "https://y.qq.com/n/ryqq/songDetail/" + music_id
        call_back.push({
            "id":Date.now() + Math.floor(Math.random() * 120000),
            "song_id":song_id,
            "platform":"qq音乐",
            "music_id":music_id,
            "author":author,
            "music_name":music_name,
            "file_name":word_analysis(author) + "_" + word_analysis(music_name) + "_" + ".mp3",
            "download_link":download_link
        })
    }
    return call_back

}