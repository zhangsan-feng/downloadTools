
import {KuAiShouDetails} from './kuaishou_details.ts'
import {KuaishouLive} from "./kuaishou_live.ts";
import {KuaishouPost} from './kuaishou_post.ts'


export async function KuAiShouAdapter(source, config){

    // if (url.includes("kuaishou.com/short-video/")){}
    // if (url.includes("v.m.chenzhongtech.com")){await KuaishouDetails(url, cookie)}
    // if (url.includes("kuaishou.com/profile/")){await KuaishouPost(url, cookie)}
    // if (url.includes("live.kuaishou")){await KuaishouLive(url, cookie)}
    await KuAiShouDetails(source, config)
}