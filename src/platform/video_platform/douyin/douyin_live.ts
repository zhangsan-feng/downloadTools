import {HTTPGet} from '../../../api/request.js'
import {GetMsToken} from './ms_token.js'
import {ABogus} from './a_bogus.js'

import Qs from "qs";
import {CallDownLoadLive, CallDwonLoadApi} from "../../../api/call.js";
import {GetTime} from '../../comm.js'

export async function DouYinLive(url, room_id, sec_user_id, platform, cookie){
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


    let task_name = url
    let live_stream_url = ""
    let file_name = ""
    if (platform === "app"){
        let params = {
            "verifyFp":"verify_lvuzy11u_Hthrr8sa_Y1QC_4Gcr_9Tb3_kzcv7AIESkMc",
            "type_id":"0","live_id":"1",
            "room_id":room_id,
            "sec_user_id":sec_user_id,
            "version_code":"99.99.99",
            "app_id":"1128",
        }

        url = 'https://webcast.amemv.com/webcast/room/reflow/info/?'

        let url_params = Qs.stringify(params, { indices: false })
        let response = await HTTPGet(url + url_params ,null,  headers)
        console.log(response)
        let nickname = response["data"]['data']["room"]["owner"]["nickname"]
        let stream_url = response["data"]['data']["room"]["stream_url"]
        let title = response["data"]["data"]["room"]["title"]

        file_name = nickname + "_" + title + "_" + GetTime() + ".flv"
        live_stream_url = stream_url["flv_pull_url"]["FULL_HD1"]
    }
    if (platform === "web"){
        url = "https://live.douyin.com/webcast/room/web/enter/?"

        let  params = {
            'aid': '6383',
            'app_name': 'douyin_web',
            'live_id': '1',
            'device_platform': 'web',
            'language': 'zh-CN',
            'enter_from': 'link_share',
            'cookie_enabled': 'true',
            'screen_width': '1920',
            'screen_height': '1080',
            'browser_language': 'zh-CN',
            'browser_platform': 'Win32',
            'browser_name': 'Chrome',
            'browser_version': '126.0.0.0',
            'web_rid': room_id,
            'room_id_str': '7388760160937724706',
            'enter_source': '',
            'is_need_double_stream': 'false',
            'insert_task_id': '',
            'live_reason': '',
            'msToken': await GetMsToken(),
        }
        params['a_bogus'] = ABogus(Qs.stringify(params, { indices: false }), headers['user-agent'])
        // params['a_bogus'] = generate_a_bogus(Qs.stringify(params, { indices: false }), headers['user-agent'])
        let url_params = Qs.stringify(params, { indices: false })
        // console.log(url_params)
        let response = await HTTPGet(url + url_params ,null,  headers)
        console.log(response)
        let stream_url = response["data"]["data"]["data"][0]["stream_url"]
        let nickname = response["data"]['data']['user']['nickname']
        let title = response["data"]['data']['data'][0]['title']
        file_name = nickname + "_" + title + "_" + GetTime() + ".flv"
        live_stream_url = stream_url["flv_pull_url"]["FULL_HD1"]
    }

    let call_data = {
        "task_name":task_name,
        "headers":headers,
        "platform":"douyin",
        "flv_url": live_stream_url,
        "flv_file_name":file_name,
    }
    await CallDownLoadLive(JSON.stringify(call_data))
}