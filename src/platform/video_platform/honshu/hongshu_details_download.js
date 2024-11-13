import {GetCookieKey, word_analysis, generateRandomString} from "../../comm.js";
import Qs from "qs";
import {get_sign} from "./X-S-Common.js";
import {DownloadFinishApi, ProxyApi, ResourceDownloadApi} from "../../../api/axios_http.ts";



export async function HongShuDetailsDownload(source, config){
    const url = source.download_link
    let request_headers =     {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/json;charset=UTF-8',
        'cookie': config['hongshu'].cookie,
        'origin': 'https://www.xiaohongshu.com',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://www.xiaohongshu.com/',
        'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': navigator.userAgent,
        'x-b3-traceid': '',
        'x-s': '',
        'x-s-common': '',
        'x-t': '',
        'x-xray-traceid': ''
    }


    let source_note_id = url.split("?")[0].split("/")
    source_note_id = source_note_id[source_note_id.length - 1]
    const request_url = 'https://edith.xiaohongshu.com/api/sns/web/v1/feed'
    let request_params= {
        'source_note_id': source_note_id,
        'image_formats': [
            'jpg',
            'webp',
            'avif',
        ],
        'extra': {
            'need_body_topic': '1',
        },
        'xsec_source': 'pc_feed',
        'xsec_token': Qs.parse(url.split("?")[1])["xsec_token"],
    }

    let a1 = GetCookieKey(request_headers['cookie'],"a1")
    let xs = window._webmsxyw("/api/sns/web/v1/feed", request_params)

    let x_s_common = get_sign(xs,  a1)
    request_headers["x-b3-traceid"] = generateRandomString(16)
    request_headers["x-xray-traceid"] = generateRandomString(32)
    request_headers["x-s"] = xs["X-s"]
    request_headers["x-s-common"] = x_s_common
    request_headers["x-t"] = xs["X-t"].toString()

    request_params = JSON.stringify(request_params).trim()

    const proxy_params = {
        req_url:request_url,
        req_type:"POST",
        req_params:request_params,
        req_headers:request_headers
    }
    // console.log(proxy_params)
    let {response_body} = await ProxyApi(proxy_params)
    response_body = JSON.parse(response_body)
    // console.log(response_body)


    let data = response_body.data
    let aweme_id    = data.items[0].id
    let title       = word_analysis(data.items[0].note_card.title)
    let image_list  = data.items[0].note_card.image_list
    let video_list  = data.items[0].note_card.video ? data.items[0].note_card.video : ""
    let nickname    = word_analysis(data.items[0].note_card.user.nickname)

    let download_data = {}

    // console.log(outMsg)
    image_list.forEach((value, index)=>{
        let file_name = nickname + "_" + title + "_" + aweme_id + "_" + index.toString() + ".png"
        download_data[file_name] = value.url_default
        if (value.stream){
            let file_name = nickname + "_" + title + "_" + aweme_id + "_" + index.toString() + ".mp4"
            download_data[file_name] =  value.stream?.h264?.[0].master_url
        }
    })

    if (video_list.length !== 0){
        let file_name = nickname + "_" + title + "_" + aweme_id + ".mp4"
        download_data[file_name] = video_list.media.stream.h264[0].master_url
    }

    const resource_params = {
        id:source.id,
        platform:"hongshu",
        source:source.download_link,
        req_headers:request_headers,
        download_link: download_data
    }
    // console.log(resource_params)
    const download_call_back = await ResourceDownloadApi(resource_params)
    await DownloadFinishApi({"id":source.id})
    return download_call_back
}