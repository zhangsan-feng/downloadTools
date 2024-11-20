import {GetUrlParams} from '../../comm.js'
import {ProxyApi} from "../../../api/axios_http.js";


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

    // if (source.download_linkincludes("douyin.com/video/")){
    //     let aweme_id = source.download_linkreplace("https://www.douyin.com/video/","").split("?")[0]
    //
    // }
    // if (source.download_linkincludes("douyin.com/note/")){
    //     let aweme_id = source.download_link.replace("https://www.douyin.com/note/","").split("?")[0]
    //
    // }
    //
    // if (source.download_linkincludes("iesdouyin.com/share/user/")){
    //     let sec_uid = source.download_linkreplace("https://www.iesdouyin.com/share/video/","").split("?")[0]
    // }

    // if (source.download_linkincludes("iesdouyin.com/share/user/")){
    //     let sec_uid = source.download_linkreplace("https://www.iesdouyin.com/share/user/","").split("?")[0]
    // }
    //
    // if (source.download_linkincludes("douyin.com/user/")){
    //     let sec_uid = source.download_link.replace("https://www.douyin.com/user/","").split("?")[0]
    //
    // }
    //
    // if (source.download_linkincludes("live.douyin.com")){
    //     let room_id = source.download_link.split("?")[0].replace("https://live.douyin.com/", "")
    //
    //
    // }
    //
    // if (source.download_linkincludes("webcast.amemv.com")) {
    //     let url_split = source.download_linksplit("?")
    //     let room_id = url_split[0].replace("https://webcast.amemv.com/douyin/webcast/reflow/", "")
    //     let sec_user_id = GetUrlParams(source.download_link, "sec_user_id")
    //
    // }

}