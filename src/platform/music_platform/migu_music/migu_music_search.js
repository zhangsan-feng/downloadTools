import {ProxyApi} from "../../../api/axios_http.js";
import {word_analysis} from "../../comm";


export async function MiGuMusicSearch() {
    const request_params = {
        'ua': 'Android_migu',
        'version': '5.0.1',
        'text': '牵丝戏',
        'pageNo': 1,
        'pageSize': 1,
        'searchSwitch': '{"song":1,"album":0,"singer":0,"tagSong":0,"mvSong":0,"songlist":0,"bestShow":1}'
    }
    const request_headers = {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        'Accept-Encoding': 'gzip,deflate,sdch',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Connection': 'keep-alive',
        'Accept-Charset': 'UTF-8,*;q=0.5',
        'Accept-Language': 'en-US,en;q=0.8',
        'referer': 'http://music.migu.cn/'
    }
    const request_url = "http://pd.musicapp.migu.cn/MIGUM2.0/v1.0/content/search_all.do"

    const proxy_params = {
        req_url: request_url,
        req_type: "GET",
        req_params: request_params,
        req_headers: request_headers
    }
    // console.log(proxy_params)
    let {response_body} = await ProxyApi(proxy_params)
    response_body = JSON.parse(response_body)
    // console.log(response_body)

    const call_back = []
    for (const index in response_body.songResultData.result) {

        const music_id = response_body.songResultData.result[index]['id']
        const contentId = response_body.songResultData.result[index]['contentId']
        const rateFormats = response_body.songResultData.result[index]['rateFormats']
        const author = response_body.songResultData.result[index]['singers'][0].name
        const music_name = response_body.songResultData.result[index]['name']
        const download_link = "https://music.migu.cn/" + music_id
        call_back.push({
            "id": Date.now() + Math.floor(Math.random() * 120000),
            "platform": "咪咕音乐",
            "music_id": music_id,
            "contentId": contentId,
            "rateFormats": rateFormats,
            "author": author,
            "music_name": music_name,
            "file_name": word_analysis(author) + "_" + word_analysis(music_name) + "_" + ".mp3",
            "download_link": download_link
        })
    }
    return call_back
}