import {HTTPGet} from '../../../api/request.js'
import {GetCookieA1} from "./headers.ts";
import {get_sign} from "./X-S-Common.js";
import {traceid} from "./X-B3-Traceid.js";
import Qs from "qs";
import {Details} from "./details.ts";
import {CallUpdateTask} from "../../../api/call.js";
import {sleep} from '../../comm.ts'

export async function HongShuPost(url ,cookie){
    let task_name = url
    let user_id = url.split("/")
    user_id = user_id[user_id.length - 1]

    let params = {
        "num":30,
        "cursor":"",
        "user_id":user_id,
        "image_formats":"jpg,webp,avif",
    }
    let headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'cookie': cookie,
        'origin': 'https://www.xiaohongshu.com',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://www.xiaohongshu.com/',
        'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': navigator.userAgent,
    }

    for (;;){
        url = "https://edith.xiaohongshu.com/api/sns/web/v1/user_posted?" + Qs.stringify(params)
        let sign_params = "/api/sns/web/v1/user_posted?" + Qs.stringify(params)
        let a1 = GetCookieA1(headers['cookie'])
        let xs = window._webmsxyw(sign_params, undefined)
        let xscomm = get_sign(xs,  a1)
        headers["x-b3-traceid"] = traceid()
        headers["x-s"] = xs["X-s"]
        headers["x-s-common"] = xscomm
        headers["x-t"] = xs["X-t"].toString()
        // console.log(url, headers)

        let response = await HTTPGet(url, null, headers)
        console.log(response.data, params)
        let cursor = response.data.data.cursor
        params["cursor"] = cursor

        let array = response.data.data.notes
        for (const index in array) {
            // console.log(array[index].xsec_token, array[index].note_id);
            let details_url = `https://www.xiaohongshu.com/explore/${array[index].note_id}?xsec_token=${array[index].xsec_token}&xsec_source=pc_feed&source=xhs_sec_server`
            let res = await Details(details_url, headers, task_name)
            await sleep()
            if (JSON.parse(res).data === "stop"){
                break
            }
        }

        if (response.data.data.has_more === false || cursor.length === 0){
            await CallUpdateTask(task_name)
            break
        }
    }



}