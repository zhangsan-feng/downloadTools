
import {word_analysis, GetTime} from '../../comm.js'
import {ProxyApi,  StreamDownloadApi, } from "../../../api/axios_http.js";



async function RoomPlayInfo(url, headers){
    const room_id =  url.split("?")[0].replace("https://live.bilibili.com/","")
    // console.log(room_id)
    const request_params = {
        "room_id":room_id,
        "mask":"1",
        "qn":"0",
        "platform":"web",
        "protocol":"0,1",
        "format":"0,1,2",
        "codec":"0,1,2",
        "dolby":"5",
        "panorama":"1",
    }

    const request_url = "https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo"
    const proxy_params = {
        req_url:request_url,
        req_type:"GET",
        req_params:request_params,
        req_headers:headers
    }
    // console.log(proxy_params)
    let {response_body} = await ProxyApi(proxy_params)
    response_body  = JSON.parse(response_body)
    // console.log(response_body)


    const info = response_body['data']["playurl_info"]["playurl"]["stream"][0]["format"][0]["codec"][0]
    const uids = response_body['data']["uid"].toString()
    const flv_stream_url = info["url_info"][0]["host"] + info["base_url"] + info["url_info"][0]["extra"]

    console.log(uids)
    console.log(flv_stream_url)
    return {"uids":uids, "flv_stream_url":flv_stream_url,"m38u_stream_url":""}

}

async function RoomBaseInfo(uids, headers){
    const request_params = {
        "uids":uids,
        "req_biz":"video"
    }
    const request_url = "https://api.live.bilibili.com/xlive/web-room/v1/index/getRoomBaseInfo"
    const proxy_params = {
        req_url:request_url,
        req_type:"GET",
        req_params:request_params,
        req_headers:headers
    }
    // console.log(proxy_params)
    let {response_body} = await ProxyApi(proxy_params)
    response_body  = JSON.parse(response_body)
    console.log(response_body)


    const nickname = word_analysis(response_body['data']["by_uids"][uids]["uname"])
    const title = word_analysis(response_body['data']["by_uids"][uids]["title"])
    const flv_file_name = nickname + '_' + GetTime()+ ".flv"

    return {"flv_file_name":flv_file_name, "nickname":nickname,}

}

export async function BiliBiliLive(source){
    const request_headers = {
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

    const {uids, flv_stream_url} = await RoomPlayInfo(source.download_link, request_headers)
    const {flv_file_name, nickname} = await RoomBaseInfo(uids, request_headers)
    console.log(flv_file_name, flv_stream_url)

    const resource_params = {
        id:source.id,
        source:source.download_link,
        "nickname":nickname,
        platform:"bilibili",
        req_headers:request_headers,
        download_link: { "flv_file_name": flv_file_name, "flv_stream_url": flv_stream_url}
    }
    // console.log(resource_params)
    await StreamDownloadApi(resource_params)

}


// live("https://space.bilibili.com/2131609593/")
// live("https://space.bilibili.com/1876992986?spm_id_from=333.788.0.0")
// https://live.bilibili.com/22820500?broadcast_type=1&is_room_feed=1&spm_id_from=333.999.live_users_card.0.click&live_from=86001