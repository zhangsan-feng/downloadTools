import {WeiBoUserFeed} from "./weibo_user_feed.js";
import {WeiBoDetails1} from "./weibo_details1.js";
import {weibo_details2} from './weibo_details2.js'
import {WeiBoUserHome} from './weibo_user_home.js'
import {WeiBoUserVideo} from './weibo_user_video.js'
import {WeiBoUserImage} from './weibo_user_image.js'


export async function WeiBoAdapter(source, config){

    if (source.download_link.includes("https://weibo.com/tv/show/")){await weibo_details2(source, config)}
    else if (source.download_link.includes("tabtype=home")){await WeiBoUserHome(source, config)}
    else if (source.download_link.includes("tabtype=feed")){await WeiBoUserFeed(source, config)}
    else if (source.download_link.includes("tabtype=newVideo")){await WeiBoUserVideo(source, config)}
    else if (source.download_link.includes("tabtype=album")){await WeiBoUserImage(source, config)}
    else if (source.download_link.includes("weibo.com/u/")){ await WeiBoUserFeed(source, config)}
    else if (source.download_link.includes("weibo.com")){await WeiBoDetails1(source, config)}

}

/*
https://weibo.com/u/7277950214
https://weibo.com/u/7821585704
https://weibo.com/u/1887095340
https://weibo.com/u/3518608920
https://weibo.com/u/5205636486
https://weibo.com/u/2014402415


*/