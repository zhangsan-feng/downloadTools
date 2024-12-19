
import {GetMsToken} from './ms_token.js'
import {ABogus} from './a_bogus.js'
import {parse, stringify} from "qs";
import {GetTime} from '../../comm.js'
import {ProxyApi, StreamDownloadApi} from "../../../api/axios_http.js";

export async function DouYinLive(source, config){
    let request_headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'cookie': config['douyin'].cookie,
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': source.download_link,
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': navigator.userAgent,
    }

    let flv_stream_url;
    let flv_file_name;
    let nickname = ""
    if (source.platform === "app"){
        let request_params = {
            "verifyFp":"verify_lvuzy11u_Hthrr8sa_Y1QC_4Gcr_9Tb3_kzcv7AIESkMc",
            "type_id":"0","live_id":"1",
            "room_id":source.room_id,
            "sec_user_id":source.sec_user_id,
            "version_code":"99.99.99",
            "app_id":"1128",
        }

        let request_url = 'https://webcast.amemv.com/webcast/room/reflow/info/?'
        request_headers['cookie'] = ''
        request_headers['user-agent'] = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36'
        const proxy_params = {
            req_url: request_url + stringify(request_params),
            req_type: "GET",
            req_params: request_params,
            req_headers: request_headers
        }
        // console.log(proxy_params)
        let {response_body} = await ProxyApi(proxy_params)
        response_body = JSON.parse(response_body)
        console.log(response_body)

        nickname = response_body['data']["room"]["owner"]["nickname"]
        let stream_url = response_body['data']["room"]["stream_url"]
        let title = response_body["data"]["room"]["title"]

        flv_file_name = nickname + "_" + title + "_" + GetTime() + ".flv"
        flv_stream_url = stream_url["flv_pull_url"]["FULL_HD1"]
    }
    if (source.platform === "web") {

        let request_url = "https://live.douyin.com/webcast/room/web/enter/?"
        let request_params = {
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
            'web_rid': source.room_id,
            'room_id_str': source.room_id,
            'enter_source': '',
            'is_need_double_stream': 'false',
            'insert_task_id': '',
            'live_reason': '',
            'msToken': await GetMsToken(),
        }
        request_params['a_bogus'] = ABogus(stringify(request_params, {indices: false}), request_headers['user-agent'])
        // params['a_bogus'] = generate_a_bogus(Qs.stringify(params, { indices: false }), headers['user-agent'])
        let url_params = stringify(request_params, {indices: false})
        // console.log(url_params)
        const proxy_params = {
            req_url: request_url + stringify(request_params),
            req_type: "GET",
            req_params: request_params,
            req_headers: request_headers
        }
        // console.log(proxy_params)
        let {response_body} = await ProxyApi(proxy_params)
        response_body = JSON.parse(response_body)
        console.log(response_body)

        let stream_url = response_body["data"]["data"][0]["stream_url"]
        nickname = response_body['data']['user']['nickname']
        let title = response_body['data']['data'][0]['title']
        flv_file_name = nickname + "_" + title + "_" + GetTime() + ".flv"
        flv_stream_url = stream_url["flv_pull_url"]["FULL_HD1"]
    }


    const resource_params = {
        id:source.id,
        source:source.download_link,
        "nickname":nickname,
        platform:"douyin",
        req_headers:request_headers,
        download_link: { "flv_file_name": flv_file_name, "flv_stream_url": flv_stream_url}
    }
    // console.log(resource_params)
    await StreamDownloadApi(resource_params)

}