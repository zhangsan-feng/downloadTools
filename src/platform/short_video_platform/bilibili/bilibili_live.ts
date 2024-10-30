import {HTTPGet} from '../../../api/request.js'
import { CallDownLoadLive} from '../../../api/call.js'
import {word_analysis} from '../../comm.ts'

export async function bilibili_live(url){
    let headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'origin': 'https://live.bilibili.com/',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://live.bilibili.com/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': navigator.userAgent,
    }

    let task_name = url
    let room_id =  url.split("?")[0].replace("https://live.bilibili.com/","")
    // console.log(room_id)
    let params = {
        "room_id":room_id.toString(),
        "mask":"1",
        "qn":"0",
        "platform":"web",
        "protocol":"0,1",
        "format":"0,1,2",
        "codec":"0,1,2",
        "dolby":"5",
        "panorama":"1",
    }

    url = "https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo"


    let response = await HTTPGet(url, params, headers)
    console.log(response)
    let data = await response.data.data
    // console.log(data)
    let info = data["playurl_info"]["playurl"]["stream"][0]["format"][0]["codec"][0]
    let uids = data["uid"].toString()
    let live_stream_url = info["url_info"][0]["host"] + info["base_url"] + info["url_info"][0]["extra"]
    // console.log(host)
    // console.log(base_url)
    // console.log(extra)
    // console.log(live_stream_url)


    params = {
        "uids":uids,
        "req_biz":"video"
    }
    url = "https://api.live.bilibili.com/xlive/web-room/v1/index/getRoomBaseInfo"
    response = await HTTPGet(url, params, headers)
    console.log(response)

    data = await response.data.data
    let nickname = word_analysis(data["by_uids"][uids]["uname"])
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var ms = String(today.getHours())+ String(today.getMinutes())
    today = yyyy + '_' + mm + '_' + dd + "_" + ms


    let call_data = {
        "task_name":task_name,
        "headers":headers,
        "platform":"bilibili",
        "flv_url": live_stream_url,
        "flv_file_name":nickname + "_" + today + ".flv",
    }

    await CallDownLoadLive(JSON.stringify(call_data))

}


// live("https://space.bilibili.com/2131609593/")
// live("https://space.bilibili.com/1876992986?spm_id_from=333.788.0.0")
// https://live.bilibili.com/22820500?broadcast_type=1&is_room_feed=1&spm_id_from=333.999.live_users_card.0.click&live_from=86001