import {DownloadFinishApi, ProxyApi, ResourceDownloadApi,} from "../../../api/axios_http.js";
import {generateRandomUpperString} from "../../comm.js";


export async function WeiBoUserFeed(source, config){
    const request_headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'client-version': 'v2.46.33',
        'cookie': config['weibo'].cookie,
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': source.download_link,
        'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'server-version': 'v2024.11.13.2',
        'user-agent': navigator.userAgent,
        'x-requested-with': 'XMLHttpRequest',
        'x-xsrf-token': generateRandomUpperString(24),
    }

    const uid = source.download_link.split("?")[0].replace("https://weibo.com/u/", "")
    let page = 1
    while (page > 0 ) {

        // console.log(uid[uid.length - 1])
        const request_params = {
            "uid": uid,
            "page": page.toString(),
            "feature": "0",
        }
        const request_url = "https://weibo.com/ajax/statuses/mymblog"
        const proxy_params = {
            req_url:request_url,
            req_type:"GET",
            req_params:request_params,
            req_headers:request_headers
        }
        // console.log(proxy_params)
        let {response_body} = await ProxyApi(proxy_params)
        response_body  = JSON.parse(response_body)
        // console.log(response_body)

        const data_list = response_body.data.list

        const download_data = {}
        let nickname = ""
        data_list.forEach((data, index) => {
            // const user_id = data["user"]["id"]
            nickname = data["user"]["screen_name"].replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "")
            const aweme_id = data["id"]
            const aweme_title = data["text"]?.split("<")[0].replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "")

            if (data["page_info"]) {
                // console.log(data["page_info"]["media_info"]["playback_list"])
                const video_file_name = nickname + "_" + aweme_title + "_" + aweme_id + ".mp4"
                download_data[video_file_name] = data["page_info"]?.["media_info"]?.["playback_list"][0]["play_info"]["url"]
            }

            if (data["pic_infos"]) {
                // console.log(data["pic_infos"])
                const image_list = Object.keys(data["pic_infos"])
                image_list.forEach((value, index) => {
                    const image_file_name = nickname + "_" + aweme_title + "_" + aweme_id + "_" + value + ".png"
                    download_data[image_file_name] = data["pic_infos"][value]["largest"]["url"] ? data["pic_infos"][value]["largest"]["url"] : data["pic_infos"][value]["mw2000"]["url"]
                    download_data[image_file_name] = download_data[value] ? download_data[value] : data["pic_infos"][value]["original"]["url"]
                })
            }

        })
        const resource_params = {
            id:source.id,
            platform:"weibo",
            nickname:nickname,
            source:source.download_link,
            req_headers:request_headers,
            download_link:download_data
        }
        // console.log(resource_params)
        if (data_list.length === 0) {
            break
        }
        const {data} = await ResourceDownloadApi(resource_params)
        if (data === "stop"){
            break
        }
        page += 1
    }
    await DownloadFinishApi({"id":source.id})
}


