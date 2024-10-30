import {HTTPGetForText, HTTPPost} from '../../../api/request.js'
import {CallDownLoadVideo,  CallUpdateTask} from "../../../api/call.js";
import Qs from "qs";
import {word_analysis} from '../../comm.ts'
import {HTTPGetForTextNoRedirect} from "../../../api/request.js";




async function run1(url, headers){
    let query = Qs.parse(url.split("?")[1])
    let params = {
        "env": 'SHARE_VIEWER_ENV_TX_TRICK',
        "photoId": query['photoId'],
        "shareToken": query['shareToken'],
        "shareObjectId": query['shareObjectId'],
        "shareResourceType": 'PHOTO_OTHER',
        "efid": query['efid'],
        "shareMethod": 'token',
        "shareChannel": 'share_copylink',
        "h5Domain": "v.m.chenzhongtech.com",
        "isLongVideo": false,
        "kpn": "KUAISHOU",
        "subBiz": "BROWSE_SLIDE_PHOTO",
    }

    let req_url =  'https://v.m.chenzhongtech.com/rest/wd/photo/info?kpn=KUAISHOU&captchaToken='

    return await  HTTPPost(req_url, params, headers)
}
async function run2(url, headers){
    let query = Qs.parse(url.split("?")[1])
    let photoId = url.split("?")[0].split("/")
    let  params = {
        'fid': query["fid"],
        'shareToken': query["shareToken"],
        'shareObjectId': query["shareObjectId"],
        'shareMethod': query["shareMethod"],
        'shareId': query["shareId"],
        'shareChannel': 'share_copylink',
        'kpn': query["kpn"],
        'subBiz': query["subBiz"],
        'env': 'SHARE_VIEWER_ENV_TX_TRICK',
        'h5Domain': 'm.gifshow.com',
        'photoId': photoId[photoId.length - 1],
        'isLongVideo': false,
    }

    let req_url =  'https://m.gifshow.com/rest/wd/photo/info?kpn=KUAISHOU_VISION&captchaToken='

    return await  HTTPPost(req_url, params, headers)
}

export async function KuaishouDetails(url ,cookie){
    let task_name = url
    let headers = {
        'accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Content-Type': 'application/json',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Origin': 'https://www.kuaishou.com',
        'Referer': url,
        'Cookie': cookie,
        'User-Agent': navigator.userAgent,
    }

    let response = {}

    if (url.includes("kuaishou.com/short-video/")){
        response = await run2(url, headers)
    }else{
        response = await run1(url, headers)
    }
    console.log(response)
    let download_data = {}

    let nickname = word_analysis(response.data.photo.userName)
    let title    = word_analysis(response.data.photo.caption)
    let aweme_id    = response.data.photo.photoId
    let video_file_name = nickname + "_" + title + "_" + aweme_id + ".mp4"
    download_data[video_file_name] = response.data.mp4Url
    let image_list = response.data.atlas ? response.data.atlas.list : ""
    if (image_list.length !== 0){
        for (let i in image_list) {
            let image_url = "https://p5.a.yximgs.com" + image_list[i]
            let l = image_list[i].split("/")
            let image_file_name = nickname + "_" + title + "_" + aweme_id + "_" + l[l.length - 1]
            download_data[image_file_name] = image_url
            // console.log(image_url)
        }
    }

    let call_params = {
        "task_name":task_name,
        "headers":headers,
        "platform":"kuaishou",
        "data":download_data
    }
    await CallDownLoadVideo(JSON.stringify(call_params))
    await CallUpdateTask(task_name)

}