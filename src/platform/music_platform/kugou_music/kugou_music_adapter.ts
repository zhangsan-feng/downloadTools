import {KuGouMusicDetails} from './kugou_music_details.ts'

export async function KuGouMusicAdapter(source, config){
    if (source.download_link.includes("https://www.kugou.com/song/#")){
        await KuGouMusicDetails(source, "")
    }
}