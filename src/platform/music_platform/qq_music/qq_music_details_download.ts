import {QQMusicDetailsInfo} from './qq_music_details_info.ts'
import {DownloadFinishApi, ResourceDownloadApi, ResourceParams} from "../../../api/axios_http.ts";
import {message} from "antd";


export async function QQMusicDetailsDownLoad(source, config){
    const {response_body, request_headers} = await QQMusicDetailsInfo(source, config)
    // console.log(response_body)
    const mp3_link = "https://ws6.stream.qqmusic.qq.com/" + response_body.req_4.data.midurlinfo[0].purl
    request_headers["referer"] = mp3_link

    const resource_params:ResourceParams = {
        id:source.id,
        platform:"qq_music",
        source:source.download_link,
        req_headers:request_headers,
        download_link: { [source.file_name]: mp3_link }
    }
    // console.log(resource_params)
    await ResourceDownloadApi(resource_params)
    await DownloadFinishApi({"id":source.id})
}