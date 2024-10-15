
import {message} from 'antd'
import {match_url} from "../platform/comm.ts";
import {KuWoSearch} from '../platform/music_platform/ku_wo/ku_wo_search.ts'

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

export async function MusicSearchAdapter(key_world){
    await KuWoSearch(key_world, "")
}

export async function CommentAdapter(){}

export async function DownLoadAdapter(){}