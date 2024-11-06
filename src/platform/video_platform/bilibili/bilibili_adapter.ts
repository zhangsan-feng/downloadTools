import {BiliBiliDetails} from './bilibili_details.ts'
import {BiliBiliLive} from "./bilibili_live.ts";
// import {BiliBiliPost} from "./bilibili_post.ts";



export async function BiliBiliAdapter(source, config){


     if (source.download_link.includes("bilibili.com/video/")){await BiliBiliDetails(source, config)}
     if (source.download_link.includes("live.bilibili.com/")){await BiliBiliLive(source)}
     // if (source.download_link.includes("space.bilibili.com")){await BiliBiliPost(source, config)}

}