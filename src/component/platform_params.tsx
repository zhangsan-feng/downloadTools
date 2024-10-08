import {WeiBoHandlerLink} from '../../platform/short_video_platform/weibo/handler_link.js'
import {BiliBiliHandlerLink} from '../../platform/short_video_platform/bilibili/handler_link.js'
import {DouyinHandlerLink} from '../../platform/short_video_platform/douyin/handler_link.js'
import {HongShuHandlerLink} from '../../platform/short_video_platform/honshu/handler_link.js'
import {KuaiShouHandlerLink} from '../../platform/short_video_platform/kuaishou/handler_link.js'
import {invoke} from "@tauri-apps/api";
import {message} from 'antd'
import {match_url} from "../../platform/comm.js";


async function retry(func, retryNums) {
    try {
        return await func();
    } catch (error) {
        if (retryNums > 0) {
            console.log(`Error occurred: ${error.message}. Retrying...`);
            return await retry(func, retryNums - 1);
        } else {
            console.log(`Error occurred: ${error.message}. No more retries left.`);
            throw error;
        }
    }
}

async function PlatFormParams (input){

    let url_list = input.split("\n")
    for (let index in url_list){
        let url = url_list[index]
        // console.log(url)
        try {
            url = match_url(url)
            url_list[index] = url
            // await invoke("del_task", {"taskName": url})
            // await invoke("creat_task", {"taskName": url})
        }catch (e){
            delete url_list[index]
            message.error({content:"解析url失败"}).then()
        }
    }
    // console.log(url_list)
    for (let index in url_list){
        let cookies = await invoke("download_config_query",{})
        cookies = JSON.parse(cookies).data
        // console.log(cookies)
        let url = url_list[index]
        try {
            if (url.includes("douyin")){await DouyinHandlerLink(url, cookies[2]["cookie"]);}
            else if (url.includes("weibo")){await WeiBoHandlerLink(url, cookies[1]["cookie"]);}
            else if (url.includes("bilibili")){await BiliBiliHandlerLink(url, cookies[0]["cookie"]);}
            else if (url.includes("xhslink")){await HongShuHandlerLink(url, cookies[3]["cookie"]);}
            else if (url.includes("xiaohongshu")){await HongShuHandlerLink(url, cookies[3]["cookie"]);}
            else if (url.includes("kuaishou")){await KuaiShouHandlerLink(url, cookies[4]["cookie"]);}
            else {message.error({content:"平台链接解析失败"}).then()}
        }catch (e) {
            await invoke("update_status_filed", {"taskName": url})
            console.log(e)
            message.error({content:"下载失败"}).then()
        }

    }

}

 export default PlatFormParams