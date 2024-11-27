
import {match_url, GetTime} from "../platform/comm.js";
import {PlatFormConfigQueryAPi, FfmpegDownloadM3U8Api} from "../api/axios_http.js";

import {KuWoMusicSearch} from '../platform/music_platform/kuwo_music/kuwo_music_search.js'
import {KuGouMusicSearch} from '../platform/music_platform/kugou_music/kugou_music_search.js'
import {QQMusicSearch} from '../platform/music_platform/qq_music/qq_music_search.js'
import {MiGuMusicSearch} from '../platform/music_platform/migu_music/migu_music_search.js'

import {KuWoMusicDetailsDownload} from '../platform/music_platform/kuwo_music/kuwo_music_details_download.js'
import {KuGouMusicDetailsDownload} from '../platform/music_platform/kugou_music/kugou_music_details_download.js'
import {QQMusicDetailsDownLoad} from '../platform/music_platform/qq_music/qq_music_details_download.js'
import {MiGuMusicDetailsDownload} from '../platform/music_platform/migu_music/migu_music_deatils_download.js'

import {KuGouMusicDetailsInfo} from '../platform/music_platform/kugou_music/kugou_music_details_info.js'
import {KuWoMusicDetailsInfo} from '../platform/music_platform/kuwo_music/kuwo_music_details_info.js'
import {QQMusicDetailsInfo} from '../platform/music_platform/qq_music/qq_music_details_info.js'
import {MiGuMusicDetailsInfo} from '../platform/music_platform/migu_music/migu_music_details_info.js'

import {HongSHuAdapter} from '../platform/video_platform/honshu/hongshu_adapter.js'
import {BiliBiliAdapter} from '../platform/video_platform/bilibili/bilibili_adapter.js'
import {KuAiShouAdapter} from '../platform/video_platform/kuaishou/kuaishou_adapter.js'
import {WeiBoAdapter} from '../platform/video_platform/weibo/weibo_adapter.js'
import {DouYinAdapter} from '../platform/video_platform/douyin/douyin_adapter.js'

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

export async function MusicDownLoadAdapter(source){
    // console.log(source)
    const config = await GenCookie()
    if (source.download_link.includes("https://www.kuwo.cn/play_detail/")){
        await KuWoMusicDetailsDownload(source,config)
    }
    if (source.download_link.includes("https://www.kugou.com/song/#")){
        await KuGouMusicDetailsDownload(source, config)
    }
    if (source.download_link.includes("https://y.qq.com/n/ryqq/songDetail/")){
        await QQMusicDetailsDownLoad(source, config)
    }
    if (source.download_link.includes("https://music.migu.cn/")){
        await MiGuMusicDetailsDownload(source, config)

    }
}

export async function MusicPlayerAdapter(source){
    const config = await GenCookie()
    if (source.download_link.includes("https://www.kuwo.cn/play_detail/")){
        const {response_body} = await KuWoMusicDetailsInfo(source, config)
        return response_body['data']['url']
    }
    if (source.download_link.includes("https://www.kugou.com/song/#")){
        const {response_body} = await KuGouMusicDetailsInfo(source, config)
        return response_body['data']['play_url']
    }
    if (source.download_link.includes("https://y.qq.com/n/ryqq/songDetail/")){
        const {response_body} = await QQMusicDetailsInfo(source, config)
        return "https://ws6.stream.qqmusic.qq.com/" + response_body.req_4.data.midurlinfo[0].purl
    }
    if (source.download_link.includes("https://music.migu.cn/")){
        const {response_body} = await MiGuMusicDetailsInfo(source, config)
        return response_body
    }

}

export async function MusicSearchAdapter(key_world){
    const functions = [KuGouMusicSearch, KuWoMusicSearch, QQMusicSearch, MiGuMusicSearch]
    const config = await GenCookie()
    const call_back = []
    for (let index = 0; index < functions.length; index++){
        try {
            call_back.push(...await functions[index](key_world, config))
        }catch (e) {
            console.log(e)
            message.error({content:"搜索失败"})
        }
    }
    // console.log(call_back)
    return call_back
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
        if (source.download_link.includes("kuaishou")){
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