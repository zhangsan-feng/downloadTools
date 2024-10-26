
import { ResourceDownloadApi, ResourceParams} from "../../../api/axios_http.ts";
import {message} from "antd";
import {KuGouMusicDetailsInfo} from './kugou_music_details_info.ts'

export async function KuGouMusicDetailsDownload(source, config){

    const {response_body, request_headers} = await KuGouMusicDetailsInfo(source, config)
    const mp3_link = response_body['data']['play_url']

    const resource_params:ResourceParams = {
        id:source.id,
        platform:"kugou_music",
        req_headers:request_headers,
        download_link: { [source.file_name]: mp3_link }
    }
    // console.log(resource_params)
    await ResourceDownloadApi(resource_params)
    message.success({content:"下载完成"})
}