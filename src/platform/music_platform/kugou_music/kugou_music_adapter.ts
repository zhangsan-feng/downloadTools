import {KuGouMusicDetailsDownload} from './kugou_music_details_download.ts'

export async function KuGouMusicAdapter(source, config){
    if (source.download_link.includes("https://www.kugou.com/song/#")){
        await KuGouMusicDetailsDownload(source, config)
    }
}