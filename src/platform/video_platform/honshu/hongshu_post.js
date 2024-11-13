import {get_sign} from "./X-S-Common.js";
import Qs from "qs";
import {generateRandomString, GetCookieKey, sleep} from '../../comm.js'
import {DownloadFinishApi, ProxyApi} from "../../../api/axios_http";
import {HongShuDetailsDownload} from './hongshu_details_download.js'

export async function HongShuPost(source ,config){
    const url = source.download_link.split("?")[0]
    const url_params = Qs.parse(source.download_link.split("?")[1])
    let user_id = url.split("/")
    user_id = user_id[user_id.length - 1]

    let request_params = {
        "num":30,
        "cursor":"",
        "user_id":user_id,
        "image_formats":"jpg,webp,avif",
        "xsec_token":url_params['xsec_token'],
        "xsec_source":url_params['xsec_source']
    }
    let request_headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'cookie': config['hongshu'].cookie,
        'origin': 'https://www.xiaohongshu.com',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://www.xiaohongshu.com/',
        'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': navigator.userAgent,
        'x-b3-traceid': '',
        'x-s': '=',
        'x-s-common': '',
        'x-t': '',
        'x-xray-traceid': '',
}

    for (;;){
        let request_url = "https://edith.xiaohongshu.com/api/sns/web/v1/user_posted?" + Qs.stringify(request_params)
        let sign_params = "/api/sns/web/v1/user_posted?" + Qs.stringify(request_params)
        let a1 = GetCookieKey(request_headers['cookie'],"a1")
        let xs = window._webmsxyw(sign_params, undefined)
        let xscomm = get_sign(xs,  a1)
        request_headers["x-b3-traceid"] = generateRandomString(16)
        request_headers["x-xray-traceid"] = generateRandomString(32)
        request_headers["x-s"] = xs["X-s"]
        request_headers["x-s-common"] = xscomm
        request_headers["x-t"] = xs["X-t"].toString()
        // console.log(url, headers)

        const proxy_params = {
            req_url:request_url,
            req_type:"GET",
            req_params:{},
            req_headers:request_headers
        }
        // console.log(proxy_params)
        let {response_body} = await ProxyApi(proxy_params)
        response_body = JSON.parse(response_body)
        // console.log(response_body)

        let cursor = response_body.data.cursor
        request_params["cursor"] = cursor
        let array = response_body.data.notes
        for (const index in array) {
            // console.log(array[index].xsec_token, array[index].note_id);
            const tmp = {
                download_link:`https://www.xiaohongshu.com/explore/${array[index].note_id}?xsec_token=${array[index].xsec_token}&xsec_source=pc_feed&source=xhs_sec_server`
            }
            let {data} = await HongShuDetailsDownload(tmp, config)
            if (data === "stop"){
                return
            }
            await sleep()
        }

        if (response_body.data.has_more === false || cursor.length === 0){
            break
        }
    }

    await DownloadFinishApi({"id":source.id})

}