import {HTTPGet} from '../../../api/request.js'
import {GetMsToken} from './ms_token.js'
import {GetVerifyFp} from './verify_fp.js'
import {GetWebId} from './web_id.js'
import {ABogus} from './a_bogus.js'
import {parse, stringify} from "qs";


export async function DouYinFavorite(url ,cookie){

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

    url = "https://www.douyin.com/aweme/v1/web/aweme/favorite/?"
    let fp = await GetVerifyFp()
    let web_id = await GetWebId()
    let mstoken = await GetMsToken()
    let max_cursor = 0
    let params = {
        'device_platform': 'webapp',
        'aid': '6383',
        'channel': 'channel_pc_web',
        'sec_user_id': 'MS4wLjABAAAAX92IFqsPH_-BclD5KVNocsgyCm1Sz93Xc8xEwmOJjLM2khnlWIjx-Yf-Ek7P0ql3',
        'max_cursor': max_cursor,
        'min_cursor': '0',
        'whale_cut_token': '',
        'cut_version': '1',
        'count': '18',
        'publish_video_strategy_type': '2',
        'update_version_code': '170400',
        'pc_client_type': '1',
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
        "webid": web_id,
        "verifyFp": fp,
        "fp": fp,
        "msToken": mstoken,
    }

    params['a_bogus'] = ABogus(Qs.stringify(params), headers['user-agent'])
    let response = await HTTPGet(url + Qs.stringify(params), null, headers)
    console.log(response)
}

await DouYinFavorite()