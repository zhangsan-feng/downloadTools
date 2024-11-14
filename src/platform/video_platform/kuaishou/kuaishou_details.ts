

import {word_analysis, findJsonKey} from '../../comm.js'
import {
    DownloadFinishApi,
    ProxyApi,
    ProxyParams,
    ResourceDownloadApi,
    ResourceParams
} from "../../../api/axios_http.ts";



export async function KuAiShouDetails(source ,config){
    const request_headers  = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Cookie': config['kuaishou'].cookie,
        'Pragma': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
        'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
    }

    const proxy_params:ProxyParams = {
        req_url:source.download_link,
        req_type:"GET",
        req_params:{},
        req_headers:request_headers
    }
    // console.log(proxy_params)
    const {response_body} = await ProxyApi(proxy_params)
    const pattern = /<script>window\.INIT_STATE =(.*?)<\/script>/;
    let data = JSON.parse(response_body.match(pattern)[1])
    data = findJsonKey(data, 'photo')
    // console.log(data)

    const aweme_id = data.photoId
    const author = data.userName
    const title = data.caption
    const file_name = word_analysis(author) + "_" + word_analysis(title) + "_" + aweme_id + "_"
    const download_data = {}

    data.ext_params?.atlas?.list?.forEach((value, index)=>{
        const image_name =  file_name + index + ".png"
        download_data[image_name] = "https://p5.a.yximgs.com" + value
        // console.log(image_link)
    })
    const video_name = file_name + ".mp4"
    download_data[video_name] = data.manifest?.adaptationSet[0].representation[0].url
    // console.log(download_data)

    const resource_params:ResourceParams = {
        id:source.id,
        platform:"kuaishou",
        source:source.download_link,
        req_headers:request_headers,
        download_link: download_data
    }
    // console.log(resource_params)
    await ResourceDownloadApi(resource_params)
    await DownloadFinishApi({"id":source.id})

}
// https://www.kuaishou.com/f/X6Vox7MKxBzPqiC