import {GetHtmlContent} from '../../../api/axios_http'
import {load} from 'cheerio'
import {word_analysis} from "../../comm";


export async function MiGuMusicRecommend(){
    const request_url = "https://music.migu.cn/v3"
    const request_headers = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        'priority': 'u=0, i',
        'referer': 'https://music.migu.cn/',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
}

    const response_body = await GetHtmlContent(request_url, request_headers)
    // console.log(response_body)
    const html = load(response_body)
    const selector1 = html('.wrapper-scroll .item-column .thumb .item-info .song-name a')
    const selector2 = html('#songs .back-wrapper .container .wrapper-contain .wrapper-items .item-column .thumb .item-info .song-name a')

    const call_back = []
    selector1.each((index, element) => {
        // console.log(element)
        const download_link = html(element).attr('href')
        const music_name = word_analysis(html(element).text())
        call_back.push({
            "id":Date.now() + Math.floor(Math.random() * 100000),
            "platform":"咪咕音乐",
            "music_id":download_link.split("?")[0].replace("/v3/music/song/", ""),
            "author":"",
            "contentId": "",
            "rateFormats": [
                {
                    "resourceType": "3",
                    "formatType": "LQ",
                    "format": "000019",
                    "size": "2281723",
                    "fileType": "mp3",
                    "price": "200"
                },
                {
                    "resourceType": "2",
                    "formatType": "PQ",
                    "format": "020007",
                    "size": "4563072",
                    "fileType": "mp3",
                    "price": "200"
                },
                {
                    "resourceType": "2",
                    "formatType": "HQ",
                    "format": "020010",
                    "size": "11407363",
                    "fileType": "mp3",
                    "price": "200"
                },
                {
                    "resourceType": "E",
                    "formatType": "SQ",
                    "format": "011002",
                    "size": "30790783",
                    "price": "200",
                    "androidFileType": "flac",
                    "iosFileType": "m4a",
                    "iosSize": "31227183",
                    "androidSize": "30790783",
                    "iosFormat": "011003",
                    "androidFormat": "011002",
                    "iosAccuracyLevel": "16bit",
                    "androidAccuracyLevel": "16bit"
                }
            ],
            "music_name":music_name,
            "file_name":word_analysis(music_name) + "_" + ".mp3",
            "download_link":"https://music.migu.cn/" + download_link,
            "recommend":true
        })
    });
    selector2.each((index, element) => {
        // console.log(element)
        const download_link = html(element).attr('href')
        const music_name = word_analysis(html(element).text())
        call_back.push({
            "id":Date.now() + Math.floor(Math.random() * 100000),
            "platform":"咪咕音乐",
            "music_id":download_link.split("?")[0].replace("/v3/music/song/", ""),
            "author":"",
            "contentId": "",
            "rateFormats": [
                {
                    "resourceType": "3",
                    "formatType": "LQ",
                    "format": "000019",
                    "size": "2281723",
                    "fileType": "mp3",
                    "price": "200"
                },
                {
                    "resourceType": "2",
                    "formatType": "PQ",
                    "format": "020007",
                    "size": "4563072",
                    "fileType": "mp3",
                    "price": "200"
                },
                {
                    "resourceType": "2",
                    "formatType": "HQ",
                    "format": "020010",
                    "size": "11407363",
                    "fileType": "mp3",
                    "price": "200"
                },
                {
                    "resourceType": "E",
                    "formatType": "SQ",
                    "format": "011002",
                    "size": "30790783",
                    "price": "200",
                    "androidFileType": "flac",
                    "iosFileType": "m4a",
                    "iosSize": "31227183",
                    "androidSize": "30790783",
                    "iosFormat": "011003",
                    "androidFormat": "011002",
                    "iosAccuracyLevel": "16bit",
                    "androidAccuracyLevel": "16bit"
                }
            ],
            "music_name":music_name,
            "file_name":word_analysis(music_name) + "_" + ".mp3",
            "download_link":"https://music.migu.cn/" + download_link,
            "recommend":true
        })
    });
    return call_back
}