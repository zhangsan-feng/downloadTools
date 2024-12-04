import {GetUrlParams} from '../../comm.js'
import {ProxyApi} from "../../../api/axios_http.js";
import {DouYinDetails} from "./douyin_details.js";
import {DouYinPost} from "./douyin_post.js";
import {DouYinLive} from "./douyin_live.js";
// import {} from './a_bogus_1.19.js'

export async function DouYinAdapter(source, config){

    if (source.download_link.includes("v.douyin.com")){
        const request_headers =  {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'priority': 'u=1, i',
            'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': navigator.userAgent,
        }
        const proxy_params = {
            req_url:source.download_link,
            req_type:"GETNoRedirect",
            req_params:{},
            req_headers:request_headers
        }
        // console.log(proxy_params)
        const {response_headers} = await ProxyApi(proxy_params)
        console.log(response_headers['location'])
        source.download_link = response_headers['location']
    }


    if (source.download_link.includes("https://www.douyin.com/video/")){
        source.aweme_id = source.download_link.replace("https://www.douyin.com/video/","").split("?")[0].replace("/","")
        console.log(source.aweme_id)
        await DouYinDetails(source, config)
    }
    if (source.download_link.includes("douyin.com/note/")){
        source.aweme_id = source.download_link.replace("https://www.douyin.com/note/","").split("?")[0].replace("/","")
        // console.log(source.aweme_id)
        await DouYinDetails(source, config)
    }

    if (source.download_link.includes("https://www.iesdouyin.com/share/video/")){
        source.aweme_id = source.download_link.replace("https://www.iesdouyin.com/share/video/","").split("?")[0].replace("/","")
        // console.log(source.aweme_id)
        await DouYinDetails(source, config)
    }

    if (source.download_link.includes("https://www.iesdouyin.com/share/user/")){
        source.sec_uid = source.download_link.replace("https://www.iesdouyin.com/share/user/","").split("?")[0].replace("/","")
        // console.log(source.sec_uid)
        await DouYinPost(source, config)
    }

    if (source.download_link.includes("https://www.douyin.com/user/")){
        source.sec_uid = source.download_link.replace("https://www.douyin.com/user/","").split("?")[0].replace("/","")
        // console.log(source.sec_uid)
        await DouYinPost(source, config)
    }

    if (source.download_link.includes("live.douyin.com")){
        source.room_id = source.download_link.split("?")[0].replace("https://live.douyin.com/", "").replace("/","")
        source.platform = "web"
        console.log(source)
        await DouYinLive(source, config)

    }

    if (source.download_link.includes("webcast.amemv.com")) {
        let url_split = source.download_link.split("?")
        source.room_id = url_split[0].replace("https://webcast.amemv.com/douyin/webcast/reflow/", "").replace("/","")
        source.sec_user_id = GetUrlParams(source.download_link, "sec_user_id")
        source.platform = "app"
        console.log(source)
        await DouYinLive(source, config)
    }

}