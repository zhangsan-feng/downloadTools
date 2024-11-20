import {BiliBiliDetails} from './bilibili_details.js'
import {BiliBiliLive} from "./bilibili_live.js";
// import {BiliBiliPost} from "./bilibili_post.js";



export async function BiliBiliAdapter(source, config){


     if (source.download_link.includes("bilibili.com/video/")){await BiliBiliDetails(source, config)}
     if (source.download_link.includes("live.bilibili.com/")){await BiliBiliLive(source)}
     // if (source.download_link.includes("space.bilibili.com")){await BiliBiliPost(source, config)}

}