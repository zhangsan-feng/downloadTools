import {GetCookieKey, ScriptHandler, word_analysis} from "../../comm.js";
import Qs from "qs";
import {get_sign} from "./X-S-Common.js";
import {traceid} from "./X-B3-Traceid.js";
import {ProxyApi} from "../../../api/axios_http.ts";


export async function HongShuDetailsDownload(source, config){
    const url = source.download_link
    let request_headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'cookie': config['hongshu'].cookie,
        'origin': 'https://www.xiaohongshu.com/',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': url,
        'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': navigator.userAgent,
    }

    const scriptHandler = ScriptHandler();
    await scriptHandler.loadScript("src/platform/honshu/x-s.js")


    request_headers['cookie'].split(";").forEach((data)=>{
        document.cookie = data
    })

    let source_note_id = url.split("?")[0].split("/")
    source_note_id = source_note_id[source_note_id.length - 1]
    const request_url = 'https://edith.xiaohongshu.com/api/sns/web/v1/feed'
    const request_params= {
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
    let xs = window._webmsxyw("/api/sns/web/v1/feed",request_params)
    let x_s_common = get_sign(xs,  a1)
    request_headers["x-b3-traceid"] = traceid()
    request_headers["x-s"] = xs["X-s"]
    request_headers["x-s-common"] = x_s_common
    request_headers["x-t"] = xs["X-t"].toString()

    const proxy_params = {
        req_url:request_url,
        req_type:"POSTJson",
        req_params:request_params,
        req_headers:request_headers
    }
    console.log(proxy_params)
    let {response_body} = await ProxyApi(proxy_params)
    // console.log(response_body)
    response_body = JSON.parse(response_body)
    console.log(response_body)

    return
    let data = response.data.data
    let aweme_id    = data.items[0].id
    let title       = word_analysis(data.items[0].note_card.title)
    let image_list  = data.items[0].note_card.image_list
    let video_list  = data.items[0].note_card.video ? data.items[0].note_card.video : ""
    let nickname    = word_analysis(data.items[0].note_card.user.nickname)

    let outMsg = {
        "aweme_id":aweme_id,
        "title":title,
        "nickname":nickname,
        "image_list":image_list,
        "video_list":video_list

    }

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

    let call_params = {
        "task_name":task_name,
        "headers":headers,
        "platform":"hongshu",
        "data":download_data
    }
    scriptHandler.removeScript()
    return await CallDownLoadVideo(JSON.stringify(call_params))
}