import {HTTPGet} from '../../../api/request.js'
import {GetMsToken} from './ms_token.js'
import {GetVerifyFp} from './verify_fp.js'
import {ABogus} from "./a_bogus.js";
import {CallDownLoadVideo, CallUpdateTask} from '../../../api/call.js'
import {word_analysis} from '../../comm.ts'
import Qs from "qs";
import {GetWebId} from "./web_id.js";


export async  function DouYinDetails(url, aweme_id, cookie){

    let headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'cookie': cookie,
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
    // console.log(headers)

    let task_name = url
    url = "https://www.douyin.com/aweme/v1/web/aweme/detail/?"
    let fp = await GetVerifyFp()
    let web_id = await GetWebId()
    let mstoken = await GetMsToken()

    let params = {
        'device_platform': 'webapp',
        'aid': "6383",
        'channel': 'channel_pc_web',
        'aweme_id': aweme_id,
        'update_version_code': '170400',
        'pc_client_type': '1',
        'version_code': '190500',
        'version_name': '19.5.0',
        'cookie_enabled': 'true',
        'screen_width': '1920',
        'screen_height': '1080',
        'browser_language': 'zh-CN',
        'browser_platform': 'Win32',
        'browser_name': 'Chrome',
        'browser_version': '127.0.0.0',
        'browser_online': 'true',
        'engine_name': 'Blink',
        'engine_version': '127.0.0.0',
        'os_name': 'Windows',
        'os_version': '10',
        'cpu_core_num': '16',
        'device_memory': '8',
        'platform': 'PC',
        'downlink': '10',
        'effective_type': '4g',
        'round_trip_time': '200',
        'webid': web_id,
        "verifyFp": fp,
        "fp": fp,
        "msToken": mstoken,
    }

    // params['a_bogus'] = generate_a_bogus(Qs.stringify(params, { indices: false }), headers['user-agent'])
    params['a_bogus'] = ABogus(Qs.stringify(params), headers['user-agent'])
    // console.log(ABogus(Qs.stringify(params), headers['user-agent']).length)

    // console.log(url_params)
    let response = await HTTPGet(url + Qs.stringify(params) ,null,  headers)
    // console.log(response)
    let data = response.data.aweme_detail

    let nickname   = word_analysis(data["author"]["nickname"])
    let uid        = data["author"]["uid"]
    let sec_uid    = data["author"]["sec_uid"]
    let desc       = word_analysis(data["desc"])
    let share_url  = data["share_url"].split("?")[0].replace("iesdouyin.com/share","douyin.com")
    let width      = data["video"]["play_addr"]["width"]
    let height     = data["video"]["play_addr"]["height"]
    let ratio      = data["video"]["ratio"]
    let statistics = data["statistics"]
    let video_tag  = data["video_tag"]

    let video_list = data["video"]["play_addr"]["url_list"]
    let image_list = data["images"] ? data["images"] : []

    let outMsg = {
        "nickname": nickname,
        "uid:": uid,
        "sec_uid:": sec_uid,
        "desc": desc,
        "aweme_id:": aweme_id,
        "share_url": share_url,
        "width": width,
        "height": height,
        "ratio": ratio,
        "statistics":statistics,
        "video_tag:": video_tag,
        "video_list:": video_list,
        "image_list:": image_list,
    }
    // console.log(outMsg)
    let download_data = {}


    image_list.forEach((value, index)=>{
        let file_name = nickname + "_" + desc + "_" + aweme_id + "_" +word_analysis(value.uri) + ".png"
        download_data[file_name] = value.url_list[0]
        if (value["video"]){
            let file_name = nickname + "_" + desc + "_" + aweme_id + "_" +word_analysis(value.uri) + ".mp4"
            video_list = value["video"]["play_addr"]["url_list"]
            download_data[file_name] = video_list[video_list.length - 1]
        }
    })
    // console.log(image_list)
    if (image_list.length === 0){
        let file_name = nickname + "_" + desc + "_" + aweme_id + ".mp4"
        download_data[file_name] = video_list[video_list.length - 1]
    }

    let call_params = {
        "task_name":task_name,
        "headers":headers,
        "platform":"douyin",
        "data":download_data
    }
    await CallDownLoadVideo(JSON.stringify(call_params))
    await CallUpdateTask(task_name)
}

// DouyinDetails()