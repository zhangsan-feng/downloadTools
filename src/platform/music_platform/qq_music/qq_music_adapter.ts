import {QQMusicDetailsDownLoad} from './qq_music_details_download.ts'

export async function QQMusicAdapter(source, config){
    if (source.download_link.includes("https://y.qq.com/n/ryqq/songDetail/")){
        await QQMusicDetailsDownLoad(source, config)
    }
}