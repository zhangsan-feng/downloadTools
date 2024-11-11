import {MiGuMusicDetailsInfo} from './migu_music_details_info.ts'
import {DownloadFinishApi, ResourceDownloadApi, ResourceParams} from "../../../api/axios_http.ts";

export async function MiGuMusicDetailsDownload(source, config){
    const {response_body, request_headers} = await MiGuMusicDetailsInfo(source, config)
    const resource_params:ResourceParams = {
        id:source.id,
        platform:"migu_music",
        source:source.download_link,
        req_headers:request_headers,
        download_link: { [source.file_name]: response_body }
    }
    // console.log(resource_params)
    await ResourceDownloadApi(resource_params)
    await DownloadFinishApi({"id":source.id})

}