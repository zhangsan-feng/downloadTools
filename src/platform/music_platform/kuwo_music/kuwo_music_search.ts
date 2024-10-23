import {ProxyApi, ProxyParams} from '../../../api/axios_http.ts'
import {word_analysis} from '../../comm.ts'

export async function KuWoMusicSearch(search_world, cookie) {
    const request_url = "https://www.kuwo.cn/search/searchMusicBykeyWord"
    const request_headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'Referer': 'https://www.kuwo.cn/search/list?key=%E9%9D%92%E8%8A%B1%E7%93%B7',
        'Cookie': '_ga=GA1.2.1312299211.1726711416; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1726711416,1728628418; HMACCOUNT=767E63CB2A05D70F; _gid=GA1.2.1963391643.1728628418; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1728635088; _ga_ETPBRPM9ML=GS1.2.1728635052.4.1.1728635087.25.0.0; Hm_Iuvt_cdb524f42f23cer9b268564v7y735ewrq2324=aYbRM3e37zsx3PZyeYjBtWNnjNET4sTh',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    }

    const request_params = {
        'vipver': '1',
        'client': 'kt',
        'ft': 'music',
        'cluster': '0',
        'strategy': '2012',
        'encoding': 'utf8',
        'rformat': 'json',
        'mobi': '1',
        'issubtitle': '1',
        'show_copyright_off': '1',
        'pn': '0',
        'rn': '20',
        'all': search_world,
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

    const call_back = []

    for (const index in response_body.abslist) {
        const music_id   = response_body.abslist[index]['DC_TARGETID']
        const author     = response_body.abslist[index]['ARTIST']
        const music_name = response_body.abslist[index]['NAME']
        const download_link = "https://www.kuwo.cn/play_detail/" + music_id
        call_back.push({
            "id":Date.now() + Math.floor(Math.random() * 100000),
            "platform":"酷我音乐",
            "music_id":music_id,
            "author":author,
            "music_name":music_name,
            "file_name":word_analysis(author) + "_" + music_name + "_" + ".mp3",
            "download_link":download_link
        })
        // console.log(response_body.abslist[index])
    }
    // console.log(call_back)
    return call_back
}