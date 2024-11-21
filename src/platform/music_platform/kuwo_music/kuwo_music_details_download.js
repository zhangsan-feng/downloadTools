
import {DownloadFinishApi, ResourceDownloadApi, } from '../../../api/axios_http.js'
import {message} from 'antd'
import {KuWoMusicDetailsInfo} from './kuwo_music_details_info.js'


export async function KuWoMusicDetailsDownload(source, config){

    const {response_body, request_headers} = await KuWoMusicDetailsInfo(source, config)

    if (response_body["msg"] ==="success"){
        const mp3_link = response_body['data']['url']

        const resource_params = {
            id:source.id,
            platform:"kuwo_music",
            nickname:source.author,
            source:source.download_link,
            req_headers:request_headers,
            download_link: { [source.file_name]: mp3_link }
        }
        // console.log(resource_params)
        await ResourceDownloadApi(resource_params)
        await DownloadFinishApi({"id":source.id})
    }else{
        message.error({content:response_body["msg"]})
        throw ""
    }
}

