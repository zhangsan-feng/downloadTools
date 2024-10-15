import {HTTPGet} from '../../../api/request.js'
import {CallDownLoadVideo, CallDwonLoadApi, CallUpdateTask} from '../../../api/call.js'

export async function weibo_details1(url, headers){
    let task_name = url

    // id=OhgYVzIor&locale=zh-CN
    let id = url.split("/")
    let params = {
        "id":id[id.length - 1],
        "locale":"zh-CN"
    }
    url = "https://weibo.com/ajax/statuses/show"

    let response = await HTTPGet(url, params, headers)
    console.log(response)
    let data = response.data

    let nickname = data["user"]["screen_name"].replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g,"")
    let aweme_id = data["id"]
    let aweme_title = data["text"]?.split("<")[0].replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g,"")

    let download_data = {}

    if (data["page_info"]){
        // console.log(data["page_info"]["media_info"]["playback_list"])
        let video_file_name = nickname + "_" + aweme_title + "_" + aweme_id  + ".mp4"
        download_data[video_file_name]  =  data["page_info"]?.["media_info"]?.["playback_list"][0]["play_info"]["url"]
    }

    if (data["pic_infos"]){
        // console.log(data["pic_infos"])
        let image_list = Object.keys(data["pic_infos"])
        image_list.forEach((value, index)=>{
            let image_file_name = nickname + "_" + aweme_title + "_" + aweme_id + "_" + value + ".png"
            let video_file_name = nickname + "_" + aweme_title + "_" + aweme_id + "_" + value + ".mp4"
            download_data[image_file_name] = data["pic_infos"][value]["largest"]["url"] ? data["pic_infos"][value]["largest"]["url"] : data["pic_infos"][value]["mw2000"]["url"]
            download_data[image_file_name] = download_data[image_file_name] ? download_data[image_file_name] : data["pic_infos"][value]["original"]["url"]
            // console.log(data["pic_infos"][value]["video"])
            if (data["pic_infos"]?.[value]?.["video"]){
                download_data[video_file_name] = data["pic_infos"][value]["video"]
            }
        })
    }

    // console.log(video_info)
    // console.log(image_info)

    let call_params = {
        "task_name":task_name,
        "headers":headers,
        "platform":"weibo",
        "data":download_data
    }
    await CallDownLoadVideo(JSON.stringify(call_params))
    await CallUpdateTask(task_name)
}


// weibo_video("https://weibo.com/7594884879/Oj8FGFVwL","")
// weibo_video("https://weibo.com/7277950214/5042374004179568","")
//