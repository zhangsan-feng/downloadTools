
import  {GetParams} from './dm.js'
import  {get_wrid} from './w_rid.js'
import {HTTPGet} from "../../../api/request.js";


export async function BiliBiliPost(url, cookie){

    let headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'cookie': cookie,
        'origin': 'https://www.bilibili.com/',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://www.bilibili.com/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': navigator.userAgent,
    }
    let mid = url.split("?")[0].replace("https://space.bilibili.com/","")

    let pr = GetParams()
    // console.log(pr)
    let params = {
        "mid": mid,
        "ps": 30,
        "tid": 0,
        "pn": 2,
        "keyword": "",
        "order": "pubdate",
        "platform": "web",
        "web_location": 1550101,
        "order_avoided": "true",
        // "dm_img_list":pr.dm_img_list,
        // "dm_img_str":pr.dm_img_str,
        // "dm_cover_img_str":pr.dm_cover_img_str,
        // "dm_img_inter":pr.dm_img_inter,
    }

    params = await get_wrid(params, headers)
    console.log(params)
    url = "https://api.bilibili.com/x/space/wbi/arc/search"
    let response = await HTTPGet(url, params, headers)
    console.log(response)
    let data = await response.data.data
    console.log(data)

}
// user_space("")
// https://space.bilibili.com/96795170

// https://space.bilibili.com/2131609593/