import {BiliBiliDetails} from "./bilibili_details.ts";
import {bilibili_live} from "./bilibili_live.ts";
import {BiliBiliPost} from "./bilibili_post.ts";

export async function BiliBiliHandlerLink(url, cookie){

    if (url.includes("bilibili.com/video/")){await BiliBiliDetails(url, cookie)}
    else if (url.includes("live.bilibili.com/")){await bilibili_live(url)}
    // else if (url.includes("space.bilibili.com")){await BiliBiliPost(url, cookie)}
    else{
        throw ""
    }

}