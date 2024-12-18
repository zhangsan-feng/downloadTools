
import {KuAiShouDetails} from './kuaishou_details.js'
import {KuAiShouLive} from "./kuaishou_live.js";
import {ProxyApi} from "../../../api/axios_http.js";
import {KuAiShouPost} from './kuaishou_post.js'


export async function KuAiShouAdapter(source, config){
    const request_headers  = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Cookie': 'did=web_2e13bff6082bb0b1e93924487e017e8f; didv=1731394619000; userId=2704089021',
        'Pragma': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': navigator.userAgent,
        'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }

    if (source.download_link.includes("v.kuaishou.com") || source.download_link.includes("kuaishou.com/f/")){

        const proxy_params = {
            req_url:source.download_link,
            req_type:"GETNoRedirect",
            req_params:{},
            req_headers:request_headers
        }
        // console.log(proxy_params)
        const {response_headers} = await ProxyApi(proxy_params)
        // console.log(response_headers['location'])
        source.download_link = response_headers['location']
    }

    if (source.download_link.includes("c.kuaishou.com/fw/user/")){
        const proxy_params = {
            req_url:source.download_link,
            req_type:"GETNoRedirect",
            req_params:{},
            req_headers:request_headers
        }
        // console.log(proxy_params)
        const {response_headers} = await ProxyApi(proxy_params)
        // console.log(response_headers['location'])
        source.download_link = response_headers['location']
    }

    // console.log(source)
    if (
        source.download_link.includes("kuaishou.com/short-video/") ||
        source.download_link.includes("v.m.chenzhongtech.com")
    ){await KuAiShouDetails(source, config)}

    if (source.download_link.includes("kuaishou.com/profile/")){
        await KuAiShouPost(source, config)
    }

    if (source.download_link.includes("https://live.kuaishou.com/u/") ||
        source.download_link.includes("https://livev.m.chenzhongtech.com/fw/live/")
    ){await KuAiShouLive(source, config)}

}