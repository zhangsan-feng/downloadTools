import {ProxyApi} from "../../../api/axios_http.js";
import {getSecret} from "./kuwo_music_Secret";
import {word_analysis} from "../../comm";


export async function KuWoMusicRecommend(config){

    const request_url = 'https://www.kuwo.cn/api/www/playlist/playListInfo'
    const cookie = config['kw_music']['cookie']
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
        'pid': '1082685104',
        'pn': '1',
        'rn': '20',
        'httpsStatus': '1',
        'reqId': '232242d0-b1f0-11ef-ae90-a1d826fca634',
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
    // console.log(response_body)
    response_body = JSON.parse(response_body)

    // console.log(response_body)
    const call_back = []
    for (const index in response_body.data.musicList) {
        const music_id   = response_body.data.musicList[index]['musicrid'].replace("MUSIC_", "")
        const author     = response_body.data.musicList[index]['artist']
        const music_name = response_body.data.musicList[index]['name']
        const download_link = "https://www.kuwo.cn/play_detail/" + music_id
        call_back.push({
            "id":Date.now() + Math.floor(Math.random() * 110000),
            "platform":"酷我音乐",
            "music_id":music_id,
            "author":author,
            "music_name":music_name,
            "file_name":word_analysis(author) + "_" + word_analysis(music_name) + "_" + ".mp3",
            "download_link":download_link
        })
        // console.log(response_body.abslist[index])
    }
    // console.log(call_back)
    return call_back


}