
import {KuaishouDetails} from './kuaishou_details.js'
import {KuaishouLive} from "./kuaishou_live.js";
import {KuaishouPost} from './kuaishou_post.js'
import {HTTPGetForTextNoRedirect} from "../../../api/request.js";
import {match_url} from '../../comm.ts'

export async function KuaiShouHandlerLink(url, cookie){
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


    if (url.includes("v.kuaishou.com") || url.includes("kuaishou.com/f/")){
        let response = await HTTPGetForTextNoRedirect(url, null, headers )
        url = response.headers.location
    }

    if (url.includes("c.kuaishou.com/fw/user/")){
        let response = await HTTPGetForTextNoRedirect(url, null, headers )
        url = response.headers.location
    }

    // console.log(url)

    if (url.includes("kuaishou.com/short-video/")){await KuaishouDetails(url, cookie)}
    else if (url.includes("v.m.chenzhongtech.com")){await KuaishouDetails(url, cookie)}
    else if (url.includes("kuaishou.com/profile/")){await KuaishouPost(url, cookie)}
    else if (url.includes("live.kuaishou")){await KuaishouLive(url, cookie)}
    else{
        throw ""
    }
}