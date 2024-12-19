
import {word_analysis, GetTime} from '../../comm.js'
import {ProxyApi, StreamDownloadApi} from "../../../api/axios_http.js";



export async function KuAiShouLive(source, config){


    const request_headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Cookie':  config['kuaishou'].cookie,
        'Origin': 'https://livev.m.chenzhongtech.com',
        'Pragma': 'no-cache',
        'Referer': source.download_link,
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
        'content-type': 'application/json',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
    }
    let eid = ""
    if (source.download_link.includes('https://live.kuaishou.com/u/')) {
        eid = source.download_link.split("?")[0].replace("https://live.kuaishou.com/u/", "")
    }

    if (source.download_link.includes('https://livev.m.chenzhongtech.com/fw/live/')){
        eid = source.download_link.split("?")[0].replace("https://livev.m.chenzhongtech.com/fw/live/", "")
    }
    console.log(eid)
    const request_params = {
        'source': 6,
        'eid': eid,
        'shareMethod': 'card',
        'clientType': 'WEB_OUTSIDE_SHARE_H5',
        'efid': '0',
    }
    // https://live.kuaishou.com/live_api/liveroom/livedetail
    const request_url = "https://livev.m.chenzhongtech.com/rest/k/live/byUser?kpn=GAME_ZONE&kpf=OUTSIDE_ANDROID_H5&captchaToken="

    const proxy_params = {
        req_url:request_url,
        req_type:"POSTJson",
        req_params: request_params,
        req_headers:request_headers
    }
    // console.log(proxy_params)
    let {response_body} = await ProxyApi(proxy_params)
    response_body  = JSON.parse(response_body)
    console.log(response_body)

    const nickname = word_analysis(response_body.shareInfo.shareTitle.split(" ")[1])
    const flv_file_name = nickname + "_" + GetTime() + ".flv"
    const flv_stream_url = response_body.liveStream.playUrls[0].url
    // console.log(file_name)
    // console.log(live_stream_url)

    const resource_params = {
        id:source.id,
        source:source.download_link,
        nickname:nickname,
        platform:"kuaishou",
        req_headers:request_headers,
        download_link: { "flv_file_name": flv_file_name, "flv_stream_url": flv_stream_url}
    }
    // console.log(resource_params)
    await StreamDownloadApi(resource_params)

}