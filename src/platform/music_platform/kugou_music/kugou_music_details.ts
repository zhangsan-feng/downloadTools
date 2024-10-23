import {GetCookieMid, GetCookieDFid, GenDetailsSignature} from './kugou_sign.ts'
import {ProxyApi, ProxyParams, ResourceDownloadApi, ResourceParams} from "../../../api/axios_http.ts";
import {message} from "antd";


export async function KuGouMusicDetails(source, config){
    const request_url = "https://wwwapi.kugou.com/play/songinfo"
    const cookie = 'kg_mid=827b466e5454a32b9fb01a735962f79d; kg_dfid=2UHCVX0t0H8E0okksB0jZlFu; kg_dfid_collect=d41d8cd98f00b204e9800998ecf8427e; Hm_lvt_aedee6983d4cfc62f509129360d6bb3d=1729649806; HMACCOUNT=48AB10115F4CD233; kg_mid_temp=827b466e5454a32b9fb01a735962f79d; Hm_lpvt_aedee6983d4cfc62f509129360d6bb3d=1729650622'
    const request_headers = {
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en-US;q=0.7,en;q=0.6',
        'origin': 'https://www.kugou.com',
        'priority': 'u=1, i',
        'referer': 'https://www.kugou.com/',
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    }

    const clienttime = Date.now();
    const request_params = {
        'srcappid': '2919',
        'clientver': '20000',
        'clienttime': clienttime,
        'mid': GetCookieMid(cookie),
        'uuid': GetCookieMid(cookie),
        'dfid': GetCookieDFid(cookie),
        'appid': '1014',
        'platid': '4',
        'encode_album_audio_id': source.music_id,
        'token': '',
        'userid': '0',
        'signature': GenDetailsSignature(cookie, clienttime, source.music_id)
    }

    const proxy_params:ProxyParams = {
        req_url:request_url,
        req_type:"GET",
        req_params:request_params,
        req_headers:request_headers
    }
    const response = await ProxyApi(proxy_params)
    // const response_header = response.headers
    const response_body = JSON.parse(response.body)
    // console.log(response_body)

    const mp3_link = response_body['data']['play_url']

    const resource_params:ResourceParams = {
        id:source.id,
        platform:"kuwo",
        req_headers:request_headers,
        download_link: { [source.file_name]: mp3_link }
    }
    // console.log(resource_params)
    ResourceDownloadApi(resource_params).then(res=>{})
    message.success({content:"下载完成"})
}