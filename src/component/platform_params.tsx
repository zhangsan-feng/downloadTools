
import {match_url} from "../platform/comm.js";
import {PlatFormConfigQueryAPi} from "../api/axios_http.ts";

import {KuWoMusicSearch} from '../platform/music_platform/kuwo_music/kuwo_music_search.ts'
import {KuGouMusicSearch} from '../platform/music_platform//kugou_music/kugou_music_search.ts'
import {QQMusicSearch} from '../platform/music_platform/qq_music/qq_music_search.ts'

import {KuWoaMusicAdapter} from '../platform/music_platform/kuwo_music/kuwo_music_adapter.ts'
import {KuGouMusicAdapter} from '../platform/music_platform/kugou_music/kugou_music_adapter.ts'
import {QQMusicAdapter} from '../platform/music_platform/qq_music/qq_music_adapter.ts'

import {HongSHuAdapter} from '../platform/video_platform/honshu/hongshu_adapter.ts'
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
        await KuWoaMusicAdapter(source,config)
    }
    if (source.download_link.includes("https://www.kugou.com/song/#")){
        await KuGouMusicAdapter(source, config)
    }
    if (source.download_link.includes("https://y.qq.com/n/ryqq/songDetail/")){
        await QQMusicAdapter(source, config)
    }
}

export async function MusicPlayerAdapter(source){

}


export async function MusicSearchAdapter(key_world){
    const functions = [ KuGouMusicSearch, KuWoMusicSearch, QQMusicSearch]
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
    const source = {
        "download_link":match_url(input_link),
        "id":Date.now() + Math.floor(Math.random() * 100000)
    }
    const config = await GenCookie()
    if (source.download_link.includes("https://www.xiaohongshu.com/")){
        await HongSHuAdapter(source, config)
    }

}