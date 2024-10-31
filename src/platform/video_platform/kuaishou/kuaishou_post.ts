import {HTTPGet, HTTPPost} from '../../../api/request.js'
import {CallDownLoadVideo,  CallUpdateTask} from "../../../api/call.js";
import {word_analysis} from '../../comm.js'
import Qs from "qs";

async function run1(url, headers){
    let task_name = url
    let user_id = url.replace("https://www.kuaishou.com/profile/","").split("?")[0]

    let json_data = {
        'operationName': 'visionProfilePhotoList',
        'variables': {
            'userId': user_id,
            'pcursor': '',
            'page': 'profile',
        },
        'query': 'fragment photoContent on PhotoEntity {\n  __typename\n  id\n  duration\n  caption\n  originCaption\n  likeCount\n  viewCount\n  commentCount\n  realLikeCount\n  coverUrl\n  photoUrl\n  photoH265Url\n  manifest\n  manifestH265\n  videoResource\n  coverUrls {\n    url\n    __typename\n  }\n  timestamp\n  expTag\n  animatedCoverUrl\n  distance\n  videoRatio\n  liked\n  stereoType\n  profileUserTopPhoto\n  musicBlocked\n  riskTagContent\n  riskTagUrl\n}\n\nfragment recoPhotoFragment on recoPhotoEntity {\n  __typename\n  id\n  duration\n  caption\n  originCaption\n  likeCount\n  viewCount\n  commentCount\n  realLikeCount\n  coverUrl\n  photoUrl\n  photoH265Url\n  manifest\n  manifestH265\n  videoResource\n  coverUrls {\n    url\n    __typename\n  }\n  timestamp\n  expTag\n  animatedCoverUrl\n  distance\n  videoRatio\n  liked\n  stereoType\n  profileUserTopPhoto\n  musicBlocked\n  riskTagContent\n  riskTagUrl\n}\n\nfragment feedContent on Feed {\n  type\n  author {\n    id\n    name\n    headerUrl\n    following\n    headerUrls {\n      url\n      __typename\n    }\n    __typename\n  }\n  photo {\n    ...photoContent\n    ...recoPhotoFragment\n    __typename\n  }\n  canAddComment\n  llsid\n  status\n  currentPcursor\n  tags {\n    type\n    name\n    __typename\n  }\n  __typename\n}\n\nquery visionProfilePhotoList($pcursor: String, $userId: String, $page: String, $webPageArea: String) {\n  visionProfilePhotoList(pcursor: $pcursor, userId: $userId, page: $page, webPageArea: $webPageArea) {\n    result\n    llsid\n    webPageArea\n    feeds {\n      ...feedContent\n      __typename\n    }\n    hostName\n    pcursor\n    __typename\n  }\n}\n',
    }
    let req_url = "https://www.kuaishou.com/graphql"

    for (;;) {

        let response = await HTTPPost(req_url, json_data, headers)
        let responseData = response.data.data.visionProfilePhotoList.feeds
        if (responseData.length === 0) {
            break
        }

        let pcursor = response.data["data"]["visionProfilePhotoList"]["pcursor"]
        json_data["variables"]["pcursor"] = pcursor


        // console.log(response)
        // console.log(responseData)
        // console.log(pcursor)
        //
        let download_data = {}
        responseData.forEach((value, index) => {
            // console.log(value)
            let nickname = word_analysis(value.author.name)
            let title    = word_analysis(value.photo.caption)
            let aweme_id    = value.photo.manifest.videoId
            let video_file_name = nickname + "_" + title + "_" + aweme_id + ".mp4"
            download_data[video_file_name] = value.photo.photoUrl
            let image_list = value.atlas ? value.atlas.list : ""
            if (image_list.length !== 0){
                for (let i in image_list) {
                    let image_url = "https://p5.a.yximgs.com" + image_list[i]
                    let l = image_list[i].split("/")
                    let image_file_name = nickname + "_" + title + "_" + aweme_id + "_" + l[l.length - 1]
                    download_data[image_file_name] = image_url
                    // console.log(image_url)
                }
            }
        })

        let call_params = {
            "task_name":task_name,
            "headers":headers,
            "platform":"kuaishou",
            "data":download_data
        }
        // console.log(download_data)
        // return
        let res =  await  CallDownLoadVideo(JSON.stringify(call_params))
        // console.log(res)
        if (JSON.parse(res).data === "stop"){
            break
        }
        if (pcursor === "no_more") {
            await CallUpdateTask(task_name);
            break
        }
    }
}
async function run2(url, headers){
    let task_name = url
    let id =  url.split("?")[0].split("/")
    let  params = {
        "count":"12",
        "pcursor":"",
        "principalId":id[id.length - 1],
        "hasMore":true,
    }
    let req_url = "https://live.kuaishou.com/live_api/profile/public?"

    for (;;){
        let download_data = {}
        let response = await HTTPGet(req_url + Qs.stringify(params), null, headers)
        let responseData = response["data"]["data"]["list"]
        if (responseData.length === 0) {
            break
        }

        let pcursor = response["data"]["data"]["pcursor"]
        params["pcursor"] = pcursor

        // console.log(response)
        // console.log(responseData)
        // console.log(pcursor)


        responseData.forEach((value, index) => {
            // console.log(value)
            let nickname = word_analysis(value.author.name)
            let aweme_id    = value.id
            let video_file_name = nickname +  + "_" + aweme_id + ".mp4"
            if (value.playUrl.length !== 0 ){
                download_data[video_file_name] = value.playUrl
            }
            let image_list = value.imgUrls ? value.imgUrls : ""
            if (image_list.length !== 0){
                for (let i in image_list) {
                    let image_url = image_list[i]
                    let l = image_list[i].split("/")
                    let image_file_name = nickname +  + "_" + aweme_id + "_" + l[l.length - 1]
                    download_data[image_file_name] = image_url
                    // console.log(image_url)
                }
            }
        })
        let call_params = {
            "task_name":task_name,
            "headers":headers,
            "platform":"kuaishou",
            "data":download_data
        }
        // console.log(download_data)
        let res =  await  CallDownLoadVideo(JSON.stringify(call_params))
        // console.log(res)
        if (JSON.parse(res).data === "stop"){
            break
        }
    }

}

export async function KuaishouPost(url, cookie){


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

    if (url.includes("live.kuaishou.com/profile/")){
        await run2(url, headers)
    }
    else if (url.includes("kuaishou.com/profile/")){
        await run1(url, headers)
    }
}
