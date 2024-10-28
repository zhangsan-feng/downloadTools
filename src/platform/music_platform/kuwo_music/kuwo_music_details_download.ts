
import {ResourceDownloadApi, ResourceParams} from '../../../api/axios_http.ts'

import {message} from 'antd'
import {KuWoMusicDetailsInfo} from './kuwo_music_details_info.ts'




export async function KuWoMusicDetailsDownload(source, config){

    const {response_body, request_headers} = await KuWoMusicDetailsInfo(source, config)

    if (response_body["msg"] ==="success"){
        const mp3_link = response_body['data']['url']

        const resource_params:ResourceParams = {
            id:source.id,
            platform:"kuwo_music",
            req_headers:request_headers,
            download_link: { [source.file_name]: mp3_link }
        }
        // console.log(resource_params)
        await ResourceDownloadApi(resource_params)
        message.success({content:"下载完成"})
    }else{
        message.error({content:response_body["msg"]})
    }
}

