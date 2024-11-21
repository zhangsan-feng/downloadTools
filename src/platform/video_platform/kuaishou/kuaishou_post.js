
import {word_analysis, sleep} from '../../comm.js'
import {DownloadFinishApi, ProxyApi,  ResourceDownloadApi} from "../../../api/axios_http.js";


async function run1(source, headers){

    const user_id = source.download_link.replace("https://www.kuaishou.com/profile/","").split("?")[0]
    const request_params = {
        'operationName': 'visionProfilePhotoList',
        'variables': {
            'userId': user_id,
            'pcursor': '',
            'page': 'profile',
        },
        'query': 'fragment photoContent on PhotoEntity {\n  __typename\n  id\n  duration\n  caption\n  originCaption\n  likeCount\n  viewCount\n  commentCount\n  realLikeCount\n  coverUrl\n  photoUrl\n  photoH265Url\n  manifest\n  manifestH265\n  videoResource\n  coverUrls {\n    url\n    __typename\n  }\n  timestamp\n  expTag\n  animatedCoverUrl\n  distance\n  videoRatio\n  liked\n  stereoType\n  profileUserTopPhoto\n  musicBlocked\n  riskTagContent\n  riskTagUrl\n}\n\nfragment recoPhotoFragment on recoPhotoEntity {\n  __typename\n  id\n  duration\n  caption\n  originCaption\n  likeCount\n  viewCount\n  commentCount\n  realLikeCount\n  coverUrl\n  photoUrl\n  photoH265Url\n  manifest\n  manifestH265\n  videoResource\n  coverUrls {\n    url\n    __typename\n  }\n  timestamp\n  expTag\n  animatedCoverUrl\n  distance\n  videoRatio\n  liked\n  stereoType\n  profileUserTopPhoto\n  musicBlocked\n  riskTagContent\n  riskTagUrl\n}\n\nfragment feedContent on Feed {\n  type\n  author {\n    id\n    name\n    headerUrl\n    following\n    headerUrls {\n      url\n      __typename\n    }\n    __typename\n  }\n  photo {\n    ...photoContent\n    ...recoPhotoFragment\n    __typename\n  }\n  canAddComment\n  llsid\n  status\n  currentPcursor\n  tags {\n    type\n    name\n    __typename\n  }\n  __typename\n}\n\nquery visionProfilePhotoList($pcursor: String, $userId: String, $page: String, $webPageArea: String) {\n  visionProfilePhotoList(pcursor: $pcursor, userId: $userId, page: $page, webPageArea: $webPageArea) {\n    result\n    llsid\n    webPageArea\n    feeds {\n      ...feedContent\n      __typename\n    }\n    hostName\n    pcursor\n    __typename\n  }\n}\n',
    }
    const request_url = "https://www.kuaishou.com/graphql"

    for (;;) {

        const proxy_params = {
            req_url:request_url,
            req_type:"POSTJson",
            req_params:request_params,
            req_headers:headers
        }
        // console.log(proxy_params)
        let {response_body} = await ProxyApi(proxy_params)
        response_body  = JSON.parse(response_body)
        console.log(response_body)

        const responseData = response_body.data.visionProfilePhotoList.feeds
        const pcursor = response_body.data.visionProfilePhotoList.pcursor
        request_params["variables"]["pcursor"] = pcursor

        const download_data = {}
        let nickname
        responseData.forEach((value, index) => {
            // console.log(value)
            nickname = word_analysis(value.author.name)
            const title    = word_analysis(value.photo.caption)
            const aweme_id    = value.photo.manifest.videoId
            const video_file_name = nickname + "_" + title + "_" + aweme_id + ".mp4"
            download_data[video_file_name] = value.photo.photoUrl
            const image_list = value.atlas ? value.atlas.list : ""
            if (image_list.length !== 0){
                for (const i in image_list) {
                    const image_url = "https://p5.a.yximgs.com" + image_list[i]
                    const l = image_list[i].split("/")
                    const image_file_name = nickname + "_" + title + "_" + aweme_id + "_" + l[l.length - 1]
                    download_data[image_file_name] = image_url
                    // console.log(image_url)
                }
            }
        })

        const resource_params = {
            id:source.id,
            platform:"kuaishou",
            nickname:nickname,
            source:source.download_link,
            req_headers:headers,
            download_link: download_data
        }
        // console.log(resource_params)
        const {data} = await ResourceDownloadApi(resource_params)
        if (data === "stop"){
            break
        }
        if (responseData.length === 0 || pcursor.length === 0) {
            break
        }
        await sleep()
    }
    await DownloadFinishApi({"id":source.id})
}


async function run2(source, headers){

    const id =  source.download_link.split("?")[0].split("/")
    const  request_params = {
        "count":"12",
        "pcursor":"",
        "principalId":id[id.length - 1],
        "hasMore":true,
    }
    const request_url = "https://live.kuaishou.com/live_api/profile/public"

    for (;;){
        const proxy_params = {
            req_url:request_url,
            req_type:"GET",
            req_params:request_params,
            req_headers:headers
        }
        // console.log(proxy_params)
        let {response_body} = await ProxyApi(proxy_params)
        response_body  = JSON.parse(response_body)
        // console.log(response_body)

        const responseData = response_body.data.list
        const pcursor = response_body.data.pcursor
        request_params["pcursor"] = pcursor

        const download_data = {}
        let nickname;
        responseData.forEach((value, index) => {
            // console.log(value)
            nickname = word_analysis(value.author.name)
            const aweme_id    = value.id
            const video_file_name = nickname +  + "_" + aweme_id + ".mp4"
            if (value.playUrl.length !== 0 ){
                download_data[video_file_name] = value.playUrl
            }
            const image_list = value.imgUrls ? value.imgUrls : ""
            if (image_list.length !== 0){
                for (const i in image_list) {
                    const image_url = image_list[i]
                    const l = image_list[i].split("/")
                    const image_file_name = nickname +  + "_" + aweme_id + "_" + l[l.length - 1]
                    download_data[image_file_name] = image_url
                    // console.log(image_url)
                }
            }
        })

        const resource_params = {
            id:source.id,
            platform:"kuaishou",
            nickname:nickname,
            source:source.download_link,
            req_headers:headers,
            download_link: download_data
        }
        // console.log(resource_params)

        const {data} = await ResourceDownloadApi(resource_params)
        if (data === "stop"){
            break
        }
        if (responseData.length === 0 || pcursor.length === 0){
            break
        }
        await sleep()
    }
    await DownloadFinishApi({"id":source.id})
}

export async function KuAiShouPost(source, config){


    const headers = {
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
        'Referer': source.download_link,
        'Cookie': config['kuaishou'].cookie,
        'User-Agent': navigator.userAgent,
    }

    if (source.download_link.includes("live.kuaishou.com/profile/")){
        await run2(source, headers)
    }
    if (source.download_link.includes("kuaishou.com/profile/")){
        await run1(source, headers)
    }
}
