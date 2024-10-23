import {KuWoMusicDetails} from './kuwo_music_details.ts'



export async function KuWoaMusicAdapter (source){
    if (source.download_link.includes("https://www.kuwo.cn/play_detail/")){
        await KuWoMusicDetails(source)
    }

}