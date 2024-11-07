
import {
    ProxyApi, ProxyParams, ResourceDownloadApi, ResourceParams,
    FfmpegCompositeVideoApi, FfmpegParams, DownloadFinishApi
} from '../../../api/axios_http.ts'
import {word_analysis} from '../../comm.js'
import {get_wrid} from './w_rid.ts'

async function GetVideoApiMsg(url, headers){
    const bvid = url.replace("https://www.bilibili.com/video/", "").split("?")[0].replace("/","")
    const request_url = "https://api.bilibili.com/x/web-interface/view?bvid=" + bvid

    const proxy_params:ProxyParams = {
        req_url:request_url,
        req_type:"GET",
        req_params:{},
        req_headers:headers
    }
    // console.log(proxy_params)
    let {response_body} = await ProxyApi(proxy_params)
    response_body  = JSON.parse(response_body)
    // console.log(response_body)
    return {
        "aid":response_body.data["aid"],
        "bvid":bvid,
        "cid":response_body.data["cid"],
        "nickname":response_body.data["owner"]["name"],
        "title":response_body.data["title"],

    }
}


export async function BiliBiliDetails(source, config) {


    const request_headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'cookie': config["bilibili"].cookie,
        'origin': 'https://www.bilibili.com/',
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

    const {aid, bvid, cid, nickname, title} = await GetVideoApiMsg(source.download_link, request_headers)

    let request_params = {
        "qn": "32",
        "fnver": "0",
        "fnval": "4048",
        "fourk": "1",
        "voice_balance": "1",
        "gaia_source": "pre-load",
        "isGaiaAvoided": "true",
        "avid": aid,
        "bvid": bvid,
        "cid": cid,
        "web_location": "1315873",
    }

    request_params = await get_wrid(request_params, request_headers)

    const request_url =  "https://api.bilibili.com/x/player/wbi/playurl"
    const proxy_params:ProxyParams = {
        req_url:request_url,
        req_type:"GET",
        req_params:request_params,
        req_headers:request_headers
    }
    // console.log(proxy_params)
    let {response_body} = await ProxyApi(proxy_params)
    response_body  = JSON.parse(response_body)
    // console.log(response_body)

    const audio_url = response_body['data']['dash']['audio'][0]['baseUrl']
    const video_url = response_body['data']['dash']['video'][0]['baseUrl']
    const tmp_name  = word_analysis(nickname)+ "_" + aid + "_" + word_analysis(title)
    const audio_file_name  = tmp_name + ".mp3"
    const video_file_name  = tmp_name + ".mp4"
    const merge_file_name = tmp_name + "_merge.mp4"

    const resource_params:ResourceParams = {
        id:source.id,
        platform:"bilibili",
        source:source.download_link,
        req_headers:request_headers,
        download_link: { [audio_file_name]: audio_url, [video_file_name]: video_url}
    }
    // console.log(resource_params)
    await ResourceDownloadApi(resource_params)


    const ffmpeg_params:FfmpegParams = {
        id:source.id,
        platform:"bilibili",
        audio_file_name:audio_file_name,
        video_file_name:video_file_name,
        merge_file_name:merge_file_name
    }

    await FfmpegCompositeVideoApi(ffmpeg_params)
    await DownloadFinishApi({"id":source.id})
}



