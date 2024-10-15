import {HTTPPostForm} from '../../../api/request.js'
import {GetMsToken} from './ms_token.js'
import {GetVerifyFp} from './verify_fp.js'
import {GetWebId} from './web_id.js'
import {ABogus} from './a_bogus.js'
import {} from '@tauri-apps/api'
import Qs from "qs";
import * as http from "@tauri-apps/plugin-http"

export async function DouYinCollection(url, cookie){

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

    url = "https://www.douyin.com/aweme/v1/web/aweme/listcollection/?"
    let fp = await GetVerifyFp()
    let web_id = await GetWebId()
    let mstoken = await GetMsToken()

    let params = {
        'device_platform': 'webapp',
        'aid': '6383',
        'channel': 'channel_pc_web',
        'publish_video_strategy_type': '2',
        'pc_client_type': '1',
        'update_version_code': '170400',
        'version_code': '170400',
        'version_name': '17.4.0',
        'cookie_enabled': 'true',
        'screen_width': '1920',
        'screen_height': '1080',
        'browser_language': 'zh-CN',
        'browser_platform': 'Win32',
        'browser_name': 'Edge',
        'browser_version': '126.0.0.0',
        'browser_online': 'true',
        'engine_name': 'Blink',
        'engine_version': '126.0.0.0',
        'os_name': 'Windows',
        'os_version': '10',
        'cpu_core_num': '16',
        'device_memory': '8',
        'platform': 'PC',
        'downlink': '7.55',
        'effective_type': '4g',
        'round_trip_time': '100',
        'webid': web_id,
        "verifyFp": fp,
        "fp": fp,
        "msToken": mstoken,
    }
    let cursor = 0
    let fromData = {
        'count': '10',
        'cursor': cursor
    }
    params['a_bogus'] = ABogus(Qs.stringify(params), headers['user-agent'])
    let response = await HTTPPostForm(url + Qs.stringify(params), fromData, headers)
    console.log(response)

    // http.fetch(url + Qs.stringify(params), {body:http.Body.form(from), headers:headers, method:"POST"}).then(res=>{
    //     console.log(res)
    // })
}

await DouYinCollection()