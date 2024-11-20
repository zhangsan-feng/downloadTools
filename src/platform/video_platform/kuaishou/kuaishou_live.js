
import {word_analysis, GetTime} from '../../comm.js'
import {ProxyApi, StreamDownloadApi} from "../../../api/axios_http.js";



export async function KuAiShouLive(source, config){


    const request_headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en-US;q=0.7,en;q=0.6',
        'Connection': 'keep-alive',
        'Cookie': config['kuaishou'].cookie,
        'Origin': 'https://v.m.chenzhongtech.com',
        'Referer': 'https://live.kuaishou.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
    }
    const request_params = {
        "principalId":source.download_link.replace("https://live.kuaishou.com/u/", "")
    }
    const request_url = "https://live.kuaishou.com/live_api/liveroom/livedetail"


    const proxy_params = {
        req_url:request_url,
        req_type:"GET",
        req_params: request_params,
        req_headers:request_headers
    }
    // console.log(proxy_params)
    let {response_body} = await ProxyApi(proxy_params)
    response_body  = JSON.parse(response_body)
    console.log(response_body)

    const nickname = word_analysis(response_body.data.author.name)
    const flv_file_name = nickname + "_" + GetTime() + ".flv"
    const play_info = response_body.data.liveStream.playUrls[0].adaptationSet.representation
    const flv_stream_url = play_info[play_info.length - 1].url
    // console.log(file_name)
    // console.log(live_stream_url)

    const resource_params = {
        id:source.id,
        source:source.download_link,
        platform:"bilibili",
        req_headers:request_headers,
        download_link: { "flv_file_name": flv_file_name, "flv_stream_url": flv_stream_url}
    }
    // console.log(resource_params)
    await StreamDownloadApi(resource_params)

}