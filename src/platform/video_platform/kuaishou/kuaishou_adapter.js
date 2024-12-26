
import {KuAiShouDetails} from './kuaishou_details.js'
import {KuAiShouLive} from "./kuaishou_live.js";
import {ProxyApi} from "../../../api/axios_http.js";
import {KuAiShouPost} from './kuaishou_post.js'


export async function KuAiShouAdapter(source, config){
    let request_headers  = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Cookie': config['kuaishou'].cookie,
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

    if (source.download_link.includes("https://v.kuaishou.com/") || source.download_link.includes("https://www.kuaishou.com/f/")){
        if (source.download_link.includes("https://live.kuaishou.com/u/")){
            request_headers = {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Pragma': 'no-cache',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
                'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
            }
            // let proxy_params = {
            //     req_url:source.download_link,
            //     req_type:"GET",
            //     req_params:{},
            //     req_headers:request_headers
            // }
            // // console.log(proxy_params)
            // const {response_url} = await ProxyApi(proxy_params)
            // source.download_link = response_url
        }
        const proxy_params = {
            req_url:source.download_link,
            req_type:"GETNoRedirect",
            req_params:{},
            req_headers:request_headers
        }
        // console.log(proxy_params)
        const {response_headers} = await ProxyApi(proxy_params)
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

    if (
        source.download_link.includes("https://www.kuaishou.com/short-video/") ||
        source.download_link.includes("https://v.m.chenzhongtech.com/")
    ){await KuAiShouDetails(source, config)}

    if (source.download_link.includes("kuaishou.com/profile/")){
        await KuAiShouPost(source, config)
    }

    if (source.download_link.includes("https://live.kuaishou.com/u/") ||
        source.download_link.includes("https://livev.m.chenzhongtech.com/fw/live/")
    ){
        await KuAiShouLive(source, config)
    }

}