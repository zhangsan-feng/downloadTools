
import {GetMsToken} from './ms_token.js'
import {GetVerifyFp} from './verify_fp.js'
import {ABogus} from './a_bogus.js'
import {GetWebId} from "./web_id.js";
import {word_analysis, sleep} from '../../comm.js'
import {parse, stringify} from "qs";
import {DownloadFinishApi, ProxyApi, ResourceDownloadApi} from "../../../api/axios_http.js";


export async function DouYinPost(source, config){
    let request_headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'cookie': config["douyin"].cookie,
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': "https://www.douyin.com/user/" + source.sec_uid,
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': navigator.userAgent,
    }



    let request_url = "https://www.douyin.com/aweme/v1/web/aweme/post/?"
    let fp = await GetVerifyFp()
    let web_id = await GetWebId()
    let mstoken = await GetMsToken()
    let request_params = {
        'device_platform': 'webapp',
        'aid': '6383',
        'channel': 'channel_pc_web',
        'sec_user_id': source.sec_uid,
        'max_cursor': 0,
        'locate_query': 'false',
        'show_live_replay_strategy': '1',
        'need_time_list': '1',
        'time_list_query': '0',
        'whale_cut_token': '',
        'cut_version': '1',
        'count': '18',
        'publish_video_strategy_type': '2',
        'update_version_code': '170400',
        'pc_client_type': '1',
        'version_code': '290100',
        'version_name': '29.1.0',
        'cookie_enabled': 'true',
        'screen_width': '1920',
        'screen_height': '1080',
        'browser_language': 'zh-CN',
        'browser_platform': 'Win32',
        'browser_name': 'Chrome',
        'browser_version': '126.0.0.0',
        'browser_online': 'true',
        'engine_name': 'Blink',
        'engine_version': '126.0.0.0',
        'os_name': 'Windows',
        'os_version': '10',
        'cpu_core_num': '16',
        'device_memory': '8',
        'platform': 'PC',
        'downlink': '10',
        'effective_type': '4g',
        'round_trip_time': '50',
        'webid': web_id,
        "verifyFp": fp,
        "fp": fp,
        "msToken": mstoken,
        // "uifid":GetCookieKey(request_headers['cookie'], "UIFID")
    }
    for (;;) {
        // console.log(headers)
        request_params['a_bogus'] = ABogus(stringify(request_params), request_headers['user-agent'])

        const proxy_params = {
            req_url:request_url + stringify(request_params),
            req_type:"GET",
            req_params:{},
            req_headers:request_headers
        }
        // console.log(proxy_params)
        let {response_body} = await ProxyApi(proxy_params)
        response_body = JSON.parse(response_body)
        // console.log(response_body)

        request_params['max_cursor'] = response_body.max_cursor
        // console.log(response_body.has_more, response_body.max_cursor)
        let download_data = {}
        let nickname;
        response_body.aweme_list.forEach((data, index) => {
            // console.log(data)
            nickname = word_analysis(data["author"]["nickname"])
            let desc = word_analysis(data["desc"])
            let aweme_id = data["aweme_id"]
            let video_list = data["video"]["play_addr"]["url_list"]
            let image_list = data["images"] ? data["images"] : []

            image_list.forEach((value, index) => {
                let file_name = nickname + "_" + desc + "_" + aweme_id + "_" + word_analysis(value.uri) + ".png"
                download_data[file_name] = value.url_list[0]
            })
            // console.log(image_list)
            if (image_list.length === 0) {
                let file_name = nickname + "_" + desc + "_" + aweme_id + ".mp4"
                download_data[file_name] = video_list[video_list.length - 1]
            }
        })

        const resource_params = {
            id:source.id,
            platform:"douyin",
            "nickname":nickname,
            source:source.download_link,
            req_headers:request_headers,
            download_link: download_data
        }

        const {data} = await ResourceDownloadApi(resource_params)
        if (data === "stop"){
            break
        }
        if (response_body.has_more === 0){
            break
        }
        await sleep()
    }

    await DownloadFinishApi({"id":source.id})
}
