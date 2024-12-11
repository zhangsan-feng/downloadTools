import {GetHtmlContent} from '../../../api/axios_http'
import {load} from 'cheerio'
import {word_analysis} from "../../comm";


async function gen(headers, request_url){
    const response_body = await GetHtmlContent(request_url, headers)

    const html = load(response_body)
    const songLists = html('.pc_temp_songlist ul li');

    const call_back = []
    songLists.each((index, element) => {
        console.log()
        const download_link = html(element).find('a').attr('href')
        const song = element.attribs.title.split("-")
        const author = song[0]
        const music_name = song[1]

        call_back.push({
            "id":Date.now() + Math.floor(Math.random() * 100000),
            "platform":"酷狗音乐",
            "music_id":download_link.replace("https://www.kugou.com/mixsong/", "").replace(".html", ""),
            "author":author,
            "music_name":music_name,
            "file_name":word_analysis(author) + "_" + word_analysis(music_name) + "_" + ".mp3",
            "download_link":download_link
        })
    });

    return call_back
}


export async function KuGouMusicRecommend(config){

    const request_headers = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'cookie': config['kg_music']['cookie'],
        'pragma': 'no-cache',
        'priority': 'u=0, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': navigator.userAgent,
    }
    const urls = [
        "https://www.kugou.com/yy/rank/home/1-6666.html?from=rank",  // 酷狗飙升榜
        "https://www.kugou.com/yy/rank/home/1-8888.html?from=rank",  // 酷狗TOP500
        "https://www.kugou.com/yy/rank/home/1-59703.html?from=rank", // 蜂鸟流行音乐榜
        "https://www.kugou.com/yy/rank/home/1-52144.html?from=rank", // 抖音热歌
        "https://www.kugou.com/yy/rank/home/1-52767.html?from=rank", // 快手热歌
        "https://www.kugou.com/yy/rank/home/1-24971.html?from=rank", // DJ热歌
        // "https://www.kugou.com/yy/rank/home/1-31308.html?from=rank", // 内地榜
        // "https://www.kugou.com/yy/rank/home/1-31313.html?from=rank", // 香港地区榜
        // "https://www.kugou.com/yy/rank/home/1-54848.html?from=rank", // 台湾地区榜
        // "https://www.kugou.com/yy/rank/home/1-31310.html?from=rank", // 欧美榜
        // "https://www.kugou.com/yy/rank/home/1-31311.html?from=rank", // 韩国榜
        // "https://www.kugou.com/yy/rank/home/1-31312.html?from=rank", // 日本榜单
        // "https://www.kugou.com/yy/rank/home/1-33162.html?from=rank", // ACG 新歌榜
        // "https://www.kugou.com/yy/rank/home/1-33160.html?from=rank", // 电音热歌榜
        // "https://www.kugou.com/yy/rank/home/1-46910.html?from=rank", // 综艺新歌榜
        // "https://www.kugou.com/yy/rank/home/1-44412.html?from=rank", // 说唱先锋榜
        // "https://www.kugou.com/yy/rank/home/1-33163.html?from=rank", // 影视金曲榜
        // "https://www.kugou.com/yy/rank/home/1-33165.html?from=rank", // 粤语金曲榜
        // "https://www.kugou.com/yy/rank/home/1-33166.html?from=rank", // 欧美金曲榜
        "https://www.kugou.com/yy/rank/home/1-30972.html?from=rank", // 酷狗音乐人原创榜
        "https://www.kugou.com/yy/rank/home/1-37361.html?from=rank", // 酷狗识曲榜
        // "https://www.kugou.com/yy/rank/home/1-49225.html?from=rank", // 80热歌榜
        // "https://www.kugou.com/yy/rank/home/1-49223.html?from=rank", // 90热歌榜
        // "https://www.kugou.com/yy/rank/home/1-49224.html?from=rank", // 00热歌榜
        // "https://www.kugou.com/yy/rank/home/1-4681.html?from=rank",  // 美国BillBord榜
        // "https://www.kugou.com/yy/rank/home/1-4680.html?from=rank",  // 英国单曲榜
        // "https://www.kugou.com/yy/rank/home/1-4673.html?from=rank",  // 日本公信榜
        // "https://www.kugou.com/yy/rank/home/1-38623.html?from=rank", // 韩国Melon榜
        // "https://www.kugou.com/yy/rank/home/1-42807.html?from=rank", // Joox本地榜
        // "https://www.kugou.com/yy/rank/home/1-42808.html?from=rank", // KKbox风云榜
        // "https://www.kugou.com/yy/rank/home/1-46868.html?from=rank", // 日本 SPACE SHOW 榜
        // "https://www.kugou.com/yy/rank/home/1-25028.html?from=rank", // Beatport电子舞曲榜
        // "https://www.kugou.com/yy/rank/home/1-36107.html?from=rank", // 小语种热歌榜
    ]
    const call_back = []
    for (let index = 0; index < urls.length; index++){

        try {
            call_back.push(...await gen(request_headers, urls[index]))
        }catch (e) {
            console.log(e)
        }
    }
    return call_back

}



