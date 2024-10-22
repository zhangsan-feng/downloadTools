import {KuWoMusicDetails} from './kuwo_music_details.ts'



export async function KuWoaMusicAdapter (source_data){
    if (source_data.download_link.includes("https://www.kuwo.cn/play_detail/")){
        await KuWoMusicDetails(source_data)
    }

}