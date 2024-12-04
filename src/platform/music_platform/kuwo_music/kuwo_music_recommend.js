import {ProxyApi} from "../../../api/axios_http.js";


export async function KuwoMusicRecommend(source, config){

    const request_headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Cookie': '_ga=GA1.2.1312299211.1726711416; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1731295541,1732071444,1733282905; HMACCOUNT=767E63CB2A05D70F; _gid=GA1.2.2078514993.1733282906; _gat=1; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1733283004; _ga_ETPBRPM9ML=GS1.2.1733282905.14.1.1733283004.45.0.0; Hm_Iuvt_cdb524f42f23cer9b268564v7y735ewrq2324=CFjkGkS82W5ztbiczbx6tjKMP8wEPdCf',
        'Pragma': 'no-cache',
        'Referer': 'https://www.kuwo.cn/playlist_detail/1082685104',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Secret': '6016e1c9564c3b13ec7295eb3fd8d84e72ad89e14390d74a59b80cdcd6e226ea041189c6',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
}

    const request_params = {
        'pid': '1082685104',
        'pn': '2',
        'rn': '20',
        'httpsStatus': '1',
        'reqId': '232242d0-b1f0-11ef-ae90-a1d826fca634',
        'plat': 'web_www',
        'from': '',
    }
    const request_url = 'https://www.kuwo.cn/api/www/playlist/playListInfo'
    const proxy_params = {
        req_url:request_url,
        req_type:"GET",
        req_params:request_params,
        req_headers:request_headers
    }
    // console.log(proxy_params)
    let {response_body} = await ProxyApi(proxy_params)
    // console.log(response_body)
    response_body = JSON.parse(response_body)
    console.log(response_body)



}