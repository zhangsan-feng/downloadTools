
import {HongShuDetails} from './hongshu_details.js'
import {HTTPGetForText} from '../../../api/request.js'
import {HongShuPost} from './hongshu_post.js'

// 37 【“夫人的香水味是我对自由的想象” - 鈴铃铃 | 小红书 - 你的生活指南】 😆 GCKijwTTqip9gAL 😆 http://xhslink.com/ch8AHP
export async function HongShuHandlerLink(url, cookie){
    let headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'cookie': cookie,
        'origin': 'https://www.xiaohongshu.com',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://www.xiaohongshu.com/',
        'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': navigator.userAgent,
    }

    cookie.split(";").forEach((data)=>{
        document.cookie = data
    })

    if (url.includes("xhslink")){
        let response = await HTTPGetForText(url, {},headers)
        // console.log(response.url)
        url = response.url
    }
    else if (url.includes("xiaohongshu.com/user/profile/")){await HongShuPost(url, cookie)}
    else if (url.includes("xiaohongshu")){await HongShuDetails(url, cookie)}
    else {throw ""}

}