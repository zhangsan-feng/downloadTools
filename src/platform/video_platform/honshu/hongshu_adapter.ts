import {HongShuDetailsDownload} from './hongshu_details_download.js'

export async function HongSHuAdapter(source, config){
    if (source.download_link.includes("https://www.xiaohongshu.com/explore")){
        await HongShuDetailsDownload(source, config)
    }
}