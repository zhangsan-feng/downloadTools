
// import  {get_wrid} from './w_rid.js'
import {HttpGet} from '../../../api/tauri_http.ts'
// import {word_analysis} from '../../comm.js'



export async function BiliBiliDetails(url, cookie) {
    let task_name = url;

    // console.log(url, headers)
    let headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'cookie': cookie,
        'origin': 'https://www.bilibili.com/',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': url,
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': navigator.userAgent,
    }

    let bvid = url.replace("https://www.bilibili.com/video/", "").split("?")[0].replace("/","")
    url = "https://api.bilibili.com/x/web-interface/view?bvid=" + bvid.replace()
    let response = await (await HttpGet(url, null, headers)).json();
    console.log(response);

    // let data = await response.data.data
    // let aid = data["aid"]
    // let cid = data["cid"]
    // let nickname = data["owner"]["name"]
    // let title = data["title"]
    //
    // let params = {
    //     "qn": "32",
    //     "fnver": "0",
    //     "fnval": "4048",
    //     "fourk": "1",
    //     "voice_balance": "1",
    //     "gaia_source": "pre-load",
    //     "isGaiaAvoided": "true",
    //     "avid": aid,
    //     "bvid": bvid,
    //     "cid": cid,
    //     "web_location": "1315873",
    // }

    // params = await get_wrid(params, headers)
    //
    // url =  "https://api.bilibili.com/x/player/wbi/playurl"
    // response = await (await HttpGet(url, params, headers)).json();
    // console.log(response)
    //
    // data = await response.data.data
    // // console.log(data)
    // let audio_url = data['dash']['audio'][0]['baseUrl']
    // let video_url = data['dash']['video'][0]['baseUrl']
    // let tmp_name  = word_analysis(nickname)+ "_" + aid + "_" + word_analysis(title)
    // let audio_file_name  = tmp_name + ".mp3"
    // let video_file_name  = tmp_name + ".mp4"
    // let merge_file_name = tmp_name + "_merge.mp4"
    //
    // let call_data = {
    //     "task_name":task_name,
    //     "headers":headers,
    //     "data":[
    //         {
    //             "video_file_name":video_file_name,
    //             "audio_file_name":audio_file_name,
    //             "video_url":video_url,
    //             "audio_url":audio_url,
    //             "merge_file_name":merge_file_name,
    //         },
    //     ],
    // }
    // console.log(call_data)
}



