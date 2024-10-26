import {KuWoMusicDetailsDownload} from './kuwo_music_details_download.ts'



export async function KuWoaMusicAdapter (source, config){
    if (source.download_link.includes("https://www.kuwo.cn/play_detail/")){
        await KuWoMusicDetailsDownload(source, config)
    }

}