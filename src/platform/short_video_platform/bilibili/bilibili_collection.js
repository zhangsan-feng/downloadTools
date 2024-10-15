
import {HTTPGet} from '../../../api/request.js'


async function bilibili_collection(url, cookie){
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

    let media_id = url.split("?")[1].split("&")[0].split("=")[1]

    let params = {
        "media_id": media_id,
        "pn": "1",
        "ps" : "20",
        "keyword":"",
        "order": "mtime",
        "type" :0,
        "tid" : 0,
        "platform":"web",
    }
    // console.log(params)
    url = "https://api.bilibili.com/x/v3/fav/resource/list"
    let response = await HTTPGet(url, params, headers)
    let data = await response.data.data
    data["medias"].forEach((value, index)=>{
        console.log(value["id"])
        console.log(value["title"])
        console.log(value["bvid"])
    })

}

bilibili_collection("https://space.bilibili.com/32306820/favlist?fid=3127242420&q=111")



// https://space.bilibili.com/32306820/favlist?fid
