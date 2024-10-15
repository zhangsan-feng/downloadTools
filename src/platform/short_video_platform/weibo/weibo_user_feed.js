import {HTTPGet} from '../../../api/request.js'
import {CallDownLoadVideo, CallDwonLoadApi, CallUpdateTask} from "../../../api/call.js";


export async function weibo_user_feed(url, headers){
    let task_name = url

    let uid = url.split("?")[0].replace("https://weibo.com/u/", "")
    let page = 1
    while (page > 0 ) {

        // console.log(uid[uid.length - 1])
        let params = {
            "uid": uid[uid.length - 1],
            "page": page.toString(),
            "feature": "0",
        }
        url = "https://weibo.com/ajax/statuses/mymblog"
        let response = await HTTPGet(url, params, headers)

        let data_list = response.data.data ? response.data.data.list : ""
        if (data_list.length === 0) {
            // console.log("none response")
            await CallUpdateTask(task_name);
            break
        }


        let download_data = {}

        data_list.forEach((data, index) => {
            // let user_id = data["user"]["id"]
            let nickname = data["user"]["screen_name"].replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "")
            let aweme_id = data["id"]
            let aweme_title = data["text"]?.split("<")[0].replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "")

            if (data["page_info"]) {
                // console.log(data["page_info"]["media_info"]["playback_list"])
                let video_file_name = nickname + "_" + aweme_title + "_" + aweme_id + ".mp4"
                download_data[video_file_name] = data["page_info"]?.["media_info"]?.["playback_list"][0]["play_info"]["url"]
            }

            if (data["pic_infos"]) {
                // console.log(data["pic_infos"])
                let image_list = Object.keys(data["pic_infos"])
                image_list.forEach((value, index) => {
                    let image_file_name = nickname + "_" + aweme_title + "_" + aweme_id + "_" + value + ".png"
                    download_data[image_file_name] = data["pic_infos"][value]["largest"]["url"] ? data["pic_infos"][value]["largest"]["url"] : data["pic_infos"][value]["mw2000"]["url"]
                    download_data[image_file_name] = download_data[value] ? download_data[value] : data["pic_infos"][value]["original"]["url"]
                })
            }

        })

        // console.log(image_info)
        // console.log(video_info)

        let call_params = {
            "task_name":task_name,
            "headers":headers,
            "platform":"weibo",
            "data":download_data
        }
       let res =  await CallDownLoadVideo(JSON.stringify(call_params))
        if (JSON.parse(res).data === "stop") {
            break
        }
        page += 1

    }
}

// weibo_home("https://www.weibo.com/u/7594884879","")
// weibo_home("https://weibo.com/u/7277950214","")