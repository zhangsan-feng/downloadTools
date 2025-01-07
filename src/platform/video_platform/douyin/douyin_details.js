
import {GetMsToken} from './ms_token.js'
import {GetVerifyFp} from './verify_fp.js'
import {ABogus} from "./a_bogus.js";
import {word_analysis, GetCookieKey} from '../../comm.js'
import {stringify} from "qs";
import {GetWebId} from "./web_id.js";
import {DownloadFinishApi, ProxyApi, ResourceDownloadApi} from "../../../api/axios_http.js";


export async  function DouYinDetails(source, config){

    let request_headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'cookie': config["douyin"].cookie,
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
    // console.log(headers)

    const request_url = "https://www.douyin.com/aweme/v1/web/aweme/detail/?"
    let fp = await GetVerifyFp()
    let web_id = await GetWebId()
    let mstoken = await GetMsToken()
    let request_params = {
        'device_platform': 'webapp',
        'aid': "6383",
        'channel': 'channel_pc_web',
        'aweme_id': source.aweme_id,
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
        // "uifid":GetCookieKey(request_headers['cookie'], "UIFID")
    }

    // params['a_bogus'] = generate_a_bogus(Qs.stringify(params, { indices: false }), headers['user-agent'])
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
    // return
    // console.log(response)
    let data = response_body.aweme_detail

    let nickname   = word_analysis(data["author"]["nickname"])
    let desc       = word_analysis(data["desc"])
    // let video_list = data["video"]["play_addr"]["url_list"]  .reduce((max, obj) => (obj.value > max.value ? obj : max), { value: -Infinity });
    let video_list = data["video"]["bit_rate"].reduce((max, obj) => (obj.bit_rate > max.bit_rate ? obj : max), { bit_rate: -Infinity })["play_addr"]["url_list"];
    let image_list = data["images"] ? data["images"] : []
    let aweme_id = source.aweme_id


    let download_data = {}
    image_list.forEach((value, index)=>{
        let file_name = nickname + "_" + desc + "_" + aweme_id + "_" + word_analysis(value.uri) + ".png"
        download_data[file_name] = value.url_list[0]
        if (value["video"]){
            let file_name = nickname + "_" + desc + "_" + aweme_id  + "_" + Date.now() + Math.floor(Math.random() * 120000) +  ".mp4"
            video_list = value["video"]["play_addr"]["url_list"]
            // console.log(file_name, video_list)
            download_data[file_name] = video_list[video_list.length - 1]
        }
    })
    // console.log(image_list)
    if (image_list.length === 0){
        let file_name = nickname + "_" + desc + "_" + aweme_id + ".mp4"
        download_data[file_name] = video_list[video_list.length - 1]
    }

    const resource_params = {
        id:source.id,
        platform:"douyin",
        "nickname":nickname,
        source:source.download_link,
        req_headers:request_headers,
        download_link: download_data
    }
    // console.log(resource_params)
    await ResourceDownloadApi(resource_params)
    await DownloadFinishApi({"id":source.id})
}

