
import {match_url, GetTime} from "../../platform/comm.js";
import {PlatFormConfigQueryAPi, FfmpegDownloadM3U8Api} from "../../api/axios_http.js";


import {HongSHuAdapter} from '../../platform/video_platform/honshu/hongshu_adapter.js'
import {BiliBiliAdapter} from '../../platform/video_platform/bilibili/bilibili_adapter.js'
import {KuAiShouAdapter} from '../../platform/video_platform/kuaishou/kuaishou_adapter.js'
import {WeiBoAdapter} from '../../platform/video_platform/weibo/weibo_adapter.js'
import {DouYinAdapter} from '../../platform/video_platform/douyin/douyin_adapter.js'

import {message} from "antd";

async function GenCookie() {
    const response = await PlatFormConfigQueryAPi({})
    const config = {}
    for (const index in response.data) {
        config[response.data[index].platform] = {
            "cookie":response.data[index].cookie
        }
    }
    // console.log(config)
    return config
}



export async function CommentDownLoadAdapter(){}

export async function DownLoadAdapter(input_link){
    input_link = input_link.split("\n")
    for (const index in input_link){
        let link ;
        try {
            link = match_url(input_link[index])
        }catch (err){
            message.error({content:"解析链接失败"})
        }
        if (link.length === 0){continue}
        const source = {
            "download_link":link,
            "id":Date.now() + Math.floor(Math.random() * 100000)
        }
        localStorage.clear()
        sessionStorage.clear()
        document.cookie = ''
        const config = await GenCookie()

        if (source.download_link.includes("xiaohongshu")){
            await HongSHuAdapter(source, config)
        }
        if (source.download_link.includes("bilibili")){
            await BiliBiliAdapter(source, config)
        }
        if (source.download_link.includes("kuaishou") || source.download_link.includes("chenzhongtech")){
            await KuAiShouAdapter(source, config)
        }
        if (source.download_link.includes("weibo")){
            await WeiBoAdapter(source, config)
        }
        if (source.download_link.includes("douyin")){
            await DouYinAdapter(source, config)
        }
        if (source.download_link.includes(".m3u8")){
            await FfmpegDownloadM3U8Api({url:link, id:source.id})
        }
    }


}