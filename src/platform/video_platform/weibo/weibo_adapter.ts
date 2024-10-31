import {weibo_user_feed} from "./weibo_user_feed.ts";
import {weibo_details1} from "./weibo_details1.ts";
import {weibo_details2} from './weibo_details2.ts'
import {weibo_user_home} from './weibo_user_home.ts'
import {weibo_user_video} from './weibo_user_video.ts'
import {weibo_user_image} from './weibo_user_image.ts'


export async function WeiBoAdapter(url, config){

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'origin': 'https://weibo.com',
        'referer': 'https://weibo.com',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'User-Agent': navigator.userAgent,
        'cookie': config['weibo'].cookie
    }

    if (url.includes("https://weibo.com/tv/show/")){await weibo_details2(url, headers)}
    else if (url.includes("weibo.com") && url.includes("tabtype=home")){await weibo_user_home(url, headers)}
    else if (url.includes("weibo.com") && url.includes("tabtype=feed")){await weibo_user_feed(url, headers)}
    else if (url.includes("weibo.com") && url.includes("tabtype=newVideo")){await weibo_user_video(url, headers)}
    else if (url.includes("weibo.com") && url.includes("tabtype=album")){await weibo_user_image(url, headers)}
    else if (url.includes("weibo.com/u/")){ await weibo_user_feed(url, headers)}
    else if (url.includes("weibo.com")){await weibo_details1(url, headers)}
    else{throw ""}


}