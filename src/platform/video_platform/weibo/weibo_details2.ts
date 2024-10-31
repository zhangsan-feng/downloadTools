import {HTTPPostForm} from '../../../api/request.js'
import {CallDownLoadVideo, CallDwonLoadApi, CallUpdateTask} from '../../../api/call.js'






export async function weibo_details2(url, headers){
    let task_name = url

    let video_id = url.split("?")[0].replace("https://weibo.com","")
    let oid = video_id.replace("/tv/show/", "")
    let data = {
        'data':'{"Component_Play_Playinfo":{"oid":"1034:5054603256070180"}}'
    }

    let response = await HTTPPostForm("https://weibo.com/tv/api/component?page=" + video_id, data, headers)
    console.log(response)


    let download_data = {}

    let call_params = {
        "task_name":task_name,
        "headers":headers,
        "platform":"weibo",
        "data":download_data
    }
    await CallDownLoadVideo(JSON.stringify(call_params))
    await CallUpdateTask(task_name)
}