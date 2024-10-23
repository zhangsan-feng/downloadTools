import {message} from 'antd'
import {match_url} from "../platform/comm.ts";
import {KuWoMusicSearch} from '../platform/music_platform/kuwo_music/kuwo_music_search.ts'
import {KuWoaMusicAdapter} from '../platform/music_platform/kuwo_music/kuwo_music_adapter.ts'
import {KuGouMusicSearch} from '../platform/music_platform//kugou_music/kugou_music_search.ts'
import {KuGouMusicAdapter} from '../platform/music_platform/kugou_music/kugou_music_adapter.ts'
function PlatFormParams (input){

    const url_list = input.split("\n")
    for (const index in url_list){
        let url = url_list[index]
        // console.log(url)
        try {
            url = match_url(url)
            url_list[index] = url
            // await invoke("del_task", {"taskName": url})
            // await invoke("creat_task", {"taskName": url})
        }catch (error){
            console.log(error)
            delete url_list[index]
            message.error({content:"解析url失败"}).then()
        }
    }
    return url_list
}

async function QueryConfig(){

}

export async function MusicDownLoadAdapter(source){
    if (source.download_link.includes("https://www.kuwo.cn/play_detail/")){
        await KuWoaMusicAdapter(source)
    }
    if (source.download_link.includes("https://www.kugou.com/song/#")){
        await KuGouMusicAdapter(source, "")
    }
}

export async function MusicSearchAdapter(key_world){
    return [
        ...await KuWoMusicSearch(key_world, ""),
        ...await KuGouMusicSearch(key_world, "")
    ]
}

export async function CommentDownLoadAdapter(){}

export async function DownLoadAdapter(){}