import {HTTPPost} from '../../../api/request.js'

let headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': navigator.userAgent,
}

// AxiosHTTPPost(url,params, headers).then(res=>{
//     console.log(res.headers['set-cookie'])
// })

export async function GetTTWid(){
    let url = "https://ttwid.bytedance.com/ttwid/union/register/"
    let params = {
        "region":"cn",
        "aid":1768,
        "needFid":false,
        "service":"www.ixigua.com",
        "migrate_info":{"ticket":"","source":"node"},
        "cbUrlProtocol":"https",
        "union":true
    }

    let response = await HTTPPost(url,params, headers)
    console.log(response.data)
    let ttw_wid = response.headers['set-cookie'][0].split(";")[0].split("=")[1]
    // console.log(ttw_wid)
    return ttw_wid
}
// console.log(await GetTTWid())
