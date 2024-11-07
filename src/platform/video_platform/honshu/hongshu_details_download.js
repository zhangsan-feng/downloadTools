import {GetCookieKey, word_analysis, generateRandomString} from "../../comm.js";
import Qs from "qs";
import {get_sign} from "./X-S-Common.js";
import {traceid} from "./X-B3-Traceid.js";
import {DownloadFinishApi, ProxyApi, ResourceDownloadApi} from "../../../api/axios_http.ts";



export async function HongShuDetailsDownload(source, config){
    const url = source.download_link
    let request_headers =     {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/json;charset=UTF-8',
        'cookie': 'abRequestId=cc96f01a-40f2-5dae-9bf2-3f29128e5667; xsecappid=xhs-pc-web; a1=1914545f3aftyaarw4pk5bd429m3achlkcmq400r950000154136; webId=43e30cd309f5e2b83016e7da5756de74; gid=yjy424K8WDKYyj80K8Sf4727K43IW2C6yqCh38ujdiWFU228iK7WJy888yYWJyj8jYKKKjd8; timestamp2=1724035806816e86d302df422609c5addd15513f8ebfa9568ad4110323b98b7; timestamp2.sig=LSmmh9EyiGksHX3Ou0kbq3pRm3pyosSzrtYHOdjjySI; web_session=040069b1caab4f56d9c30d26df344b23ce08c0; webBuild=4.42.0; unread={%22ub%22:%22670a6cfd000000001b02c424%22%2C%22ue%22:%226703f83e000000002a036351%22%2C%22uc%22:29}; acw_tc=5e1bd8225c188bd1428fb7e7649c62fc3e53fa128d6e7b9c680cf781d3f8626b; websectiga=6169c1e84f393779a5f7de7303038f3b47a78e47be716e7bec57ccce17d45f99; sec_poison_id=a6128c9f-13d8-4c23-8b4f-e72c50f1c18f',
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
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        'x-b3-traceid': '0c8b15c7f43bae12',
        'x-s': 'XYW_eyJzaWduU3ZuIjoiNTUiLCJzaWduVHlwZSI6IngyIiwiYXBwSWQiOiJ4aHMtcGMtd2ViIiwic2lnblZlcnNpb24iOiIxIiwicGF5bG9hZCI6Ijk2ZjZiNjI5ZWQ5ZjdmM2RlYTYxNTVjYjJkMzlmZDE4MWQ1OTkzZWQyMTU5ZDJkNWVlZjY4ZmM2YTFiNzIwOGQ5MjA0NWFkMjk0ZjI5NDlkNTg0MTM5ODhiZWM1NjdlM2FiNjBlZWE1ZGJjNjVhNTgwNjhkZjk1ZDNmMjkzODYxZGM3MGNkMzI4NTE3ZGQ0OGJmNjU3Nzc4ODQ2NTQ4YzQ1NTc5OTZmMmRlMmFlZjhhOWFjOTZiZThkNGEwYWFiY2Y4M2MwZjA5MzQwNGY1NTUwNGQ2YTBmNDY4OTI0MjA3OWRkZDkyYWUxN2U3MTIyMjY1MGJlZTIzMDRmYTU2ZmJmNTMyMWQ5NGU5ZGM0YjM3MDdhNGM5ZTM3ZGM1NTY4OTczMWY5ODMwODdjYmIzY2I3NmU1NzA0NWI5MjRkNjAwNTRlZDg1YTgxYTVjZGFlNDRjOWU5Y2U1OWMxNjQ1YjFmYjc0NjY4NTA2ZDk5NzFmZDZiZTU4NWY5NWZiZDY0N2EzODk5OTEzOWI0OTU0MTBmY2E5NjJlMjhjYjUwZWM4In0=',
        'x-s-common': '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',
        'x-t': '1730950617811',
        'x-xray-traceid': 'c982592d3c56ee3cef7df5c58ca3dcfb'
}


    request_headers['cookie'].split(";").forEach((data)=>{
        document.cookie = data
    })

    let source_note_id = url.split("?")[0].split("/")
    source_note_id = source_note_id[source_note_id.length - 1]
    const request_url = 'https://edith.xiaohongshu.com/api/sns/web/v1/feed'
    let request_params= {
        'source_note_id': source_note_id,
        'image_formats': [
            'jpg',
            'webp',
            'avif',
        ],
        'extra': {
            'need_body_topic': '1',
        },
        'xsec_source': 'pc_feed',
        'xsec_token': Qs.parse(url.split("?")[1])["xsec_token"],
    }

    let a1 = GetCookieKey(request_headers['cookie'],"a1")
    let xs = window._webmsxyw("/api/sns/web/v1/feed", request_params)

    let x_s_common = get_sign(xs,  a1)
    request_headers["x-b3-traceid"] = generateRandomString(16)
    request_headers["x-xray-traceid"] = traceid()
    request_headers["x-s"] = xs["X-s"]
    request_headers["x-s-common"] = x_s_common
    request_headers["x-t"] = xs["X-t"].toString()

    request_params = JSON.stringify(request_params).trim()

    const proxy_params = {
        req_url:request_url,
        req_type:"POST",
        req_params:request_params,
        req_headers:request_headers
    }
    // console.log(proxy_params)
    let {response_body} = await ProxyApi(proxy_params)
    response_body = JSON.parse(response_body)
    // console.log(response_body)


    let data = response_body.data
    let aweme_id    = data.items[0].id
    let title       = word_analysis(data.items[0].note_card.title)
    let image_list  = data.items[0].note_card.image_list
    let video_list  = data.items[0].note_card.video ? data.items[0].note_card.video : ""
    let nickname    = word_analysis(data.items[0].note_card.user.nickname)

    let download_data = {}

    // console.log(outMsg)
    image_list.forEach((value, index)=>{
        let file_name = nickname + "_" + title + "_" + aweme_id + "_" + index.toString() + ".png"
        download_data[file_name] = value.url_default
        if (value.stream){
            let file_name = nickname + "_" + title + "_" + aweme_id + "_" + index.toString() + ".mp4"
            download_data[file_name] =  value.stream?.h264?.[0].master_url
        }
    })

    if (video_list.length !== 0){
        let file_name = nickname + "_" + title + "_" + aweme_id + ".mp4"
        download_data[file_name] = video_list.media.stream.h264[0].master_url
    }

    const resource_params = {
        id:source.id,
        platform:"hongshu",
        source:source.download_link,
        req_headers:request_headers,
        download_link: download_data
    }
    console.log(resource_params)
    await ResourceDownloadApi(resource_params)
    await DownloadFinishApi({"id":source.id})
}