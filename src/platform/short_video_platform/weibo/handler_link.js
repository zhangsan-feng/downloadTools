import {weibo_user_feed} from "./weibo_user_feed.js";
import {weibo_details1} from "./weibo_details1.js";
import {weibo_details2} from './weibo_details2.js'
import {weibo_user_home} from './weibo_user_home.js'
import {weibo_user_video} from './weibo_user_video.js'
import {weibo_user_image} from './weibo_user_image.js'
import {headers} from "./headers.js";

export async function WeiBoHandlerLink(url, cookie){
    if (cookie === null || cookie.length === 0){
        return '{"data":"缺少cookie","code":"500"}'
    }
    headers['cookie'] = cookie

    if (url.includes("https://weibo.com/tv/show/")){await weibo_details2(url, headers)}
    else if (url.includes("weibo.com") && url.includes("tabtype=home")){await weibo_user_home(url, headers)}
    else if (url.includes("weibo.com") && url.includes("tabtype=feed")){await weibo_user_feed(url, headers)}
    else if (url.includes("weibo.com") && url.includes("tabtype=newVideo")){await weibo_user_video(url, headers)}
    else if (url.includes("weibo.com") && url.includes("tabtype=album")){await weibo_user_image(url, headers)}
    else if (url.includes("weibo.com/u/")){ await weibo_user_feed(url, headers)}
    else if (url.includes("weibo.com")){await weibo_details1(url, headers)}
    else{throw ""}


}