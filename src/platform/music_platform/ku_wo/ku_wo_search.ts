import {ProxyApi, ProxyParams} from '../../../api/axios_http.ts'


export async function KuWoSearch(search_world, cookie) {
    const request_url = "https://www.kuwo.cn/search/searchMusicBykeyWord"
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Cookie': '_ga=GA1.2.1312299211.1726711416; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1726711416,1728628418; HMACCOUNT=767E63CB2A05D70F; _gid=GA1.2.1963391643.1728628418; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1728635088; _ga_ETPBRPM9ML=GS1.2.1728635052.4.1.1728635087.25.0.0; Hm_Iuvt_cdb524f42f23cer9b268564v7y735ewrq2324=aYbRM3e37zsx3PZyeYjBtWNnjNET4sTh',
        'Pragma': 'no-cache',
        'Referer': 'https://www.kuwo.cn/search/list?key=%E9%9D%92%E8%8A%B1%E7%93%B7',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }

    const params = {
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
        'all': '青花瓷',
    }
    const proxy_params:ProxyParams = {
        req_url:request_url,
        req_type:"GET",
        req_params:params,
        req_headers:headers
    }
    ProxyApi(proxy_params).then(res=>{
        console.log(JSON.parse(res.body))
    })

}