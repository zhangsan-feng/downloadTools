
import {DownloadFinishApi, ResourceDownloadApi, } from "../../../api/axios_http.js";
import {KuGouMusicDetailsInfo} from './kugou_music_details_info.js'

export async function KuGouMusicDetailsDownload(source, config){

    const {response_body, request_headers} = await KuGouMusicDetailsInfo(source, config)
    const mp3_link = response_body['data']['play_url']

    const resource_params = {
        id:source.id,
        platform:"kugou_music",
        nickname:source.author,
        source:source.download_link,
        req_headers:request_headers,
        download_link: { [source.file_name]: mp3_link }
    }
    // console.log(resource_params)
    await ResourceDownloadApi(resource_params)
    await DownloadFinishApi({"id":source.id})
}