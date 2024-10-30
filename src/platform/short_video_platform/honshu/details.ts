import Qs from "qs";
import {GetCookieA1} from "./headers.ts";
import {get_sign} from "./X-S-Common.js";
import {traceid} from "./X-B3-Traceid.js";
import {HTTPPost} from "../../../api/request.js";
import {word_analysis, ScriptHandler} from "../../comm.ts";
import {CallDownLoadVideo} from "../../../api/call.js";

export async function Details(url, headers, task_name){
    const scriptHandler = ScriptHandler();
    await scriptHandler.loadScript("src/platform/honshu/x-s.js")

    let source_note_id = url.split("?")[0].split("/")
    source_note_id = source_note_id[source_note_id.length - 1]
    url = 'https://edith.xiaohongshu.com/api/sns/web/v1/feed'
    let params= {
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
        'xsec_token': Qs.parse( url.split("?")[1])["xsec_token"],
    }

    let a1 = GetCookieA1(headers['cookie'])
    let xs = window._webmsxyw("/api/sns/web/v1/feed",params)
    let xscomm = get_sign(xs,  a1)
    headers["x-b3-traceid"] = traceid()
    headers["x-s"] = xs["X-s"]
    headers["x-s-common"] = xscomm
    headers["x-t"] = xs["X-t"].toString()

    let response = await HTTPPost(url, params, headers)
    console.log(response)
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