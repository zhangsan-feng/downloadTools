import {HTTPGet} from '../../../api/request.js'
import {word_analysis, GetTime} from '../../comm.js'
import {CallDownLoadLive, CallDwonLoadApi} from "../../../api/call.js";
export async function KuaishouLive(url ,cookie){

    let task_name = url
    let headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en-US;q=0.7,en;q=0.6',
        'Connection': 'keep-alive',
        'Cookie': cookie,
        'Origin': 'https://v.m.chenzhongtech.com',
        'Referer': 'https://live.kuaishou.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
    }

    headers['Referer'] = 'https://live.kuaishou.com/'
    url = "https://live.kuaishou.com/live_api/liveroom/livedetail?principalId=" + url.replace("https://live.kuaishou.com/u/","")
    let response = await HTTPGet(url, null, headers)
    console.log(response)

    let nickname = word_analysis(response.data.data.author.name)
    let file_name = nickname + "_" + GetTime() + ".flv"
    let play_info = response.data.data.liveStream.playUrls[0].adaptationSet.representation
    let live_stream_url = play_info[play_info.length - 1].url
    // console.log(file_name)
    // console.log(live_stream_url)


    let call_data = {
        "task_name":task_name,
        "headers":headers,
        "platform":"kuaishou",
        "flv_url": live_stream_url,
        "flv_file_name":file_name,
    }
    await CallDownLoadLive(JSON.stringify(call_data))
}