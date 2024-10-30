// import {HTTPGetForText} from '../../../api/request.js'
// import {DouYinDetails} from './douyin_details.ts'
// import {DouYinPost} from './douyin_post.ts'
// // import {DouYinFavorite} from './douyin_favorite.js'
// // import {DouYinCollection} from './douyin_collection.ts'
// import {DouYinLive} from './douyin_live.ts'
//
//
// export async function DouyinHandlerLink(url, cookie){
//     // console.log(url, cookie)
//     let headers = {
//         'accept': 'application/json, text/plain, */*',
//         'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
//         'priority': 'u=1, i',
//         'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
//         'sec-ch-ua-mobile': '?0',
//         'sec-ch-ua-platform': '"Windows"',
//         'sec-fetch-dest': 'empty',
//         'sec-fetch-mode': 'cors',
//         'sec-fetch-site': 'same-origin',
//         'user-agent': navigator.userAgent,
//     }
//
//     if (url.includes("v.douyin.com")){
//         let response = await HTTPGetForText(url, null, headers)
//         // console.log(response.url)
//         url = response.url
//     }
//
//     if (url.includes("douyin.com/video/")){
//         let aweme_id = url.replace("https://www.douyin.com/video/","").split("?")[0]
//         await DouYinDetails(url, aweme_id, cookie)
//     }
//     else if (url.includes("douyin.com/note/")){
//         let aweme_id = url.replace("https://www.douyin.com/note/","").split("?")[0]
//         await DouYinDetails(url, aweme_id, cookie)
//     }
//
//     else if (url.includes("iesdouyin.com/share/user/")){
//         let sec_uid = url.replace("https://www.iesdouyin.com/share/user/","").split("?")[0]
//         await DouYinPost(url, sec_uid, cookie)
//     }
//
//     else if (url.includes("douyin.com/user/")){
//         let sec_uid = url.replace("https://www.douyin.com/user/","").split("?")[0]
//
//         await DouYinPost(url, sec_uid, cookie)
//     }
//
//     else if (url.includes("live.douyin.com")){
//         let room_id = url.split("?")[0].replace("https://live.douyin.com/", "")
//         // console.log(room_id)
//         await DouYinLive(url, room_id, "", "web",cookie)
//     }
//
//     else if (url.includes("webcast.amemv.com")){
//         let url_split = url.split("?")
//         let room_id = url_split[0].replace("https://webcast.amemv.com/douyin/webcast/reflow/","")
//         let sec_user_id = ""
//         url_split[1].split("&").forEach((value, index)=>{
//             if (value.includes("sec_user_id")){
//                 sec_user_id = value.split("=")[1]
//             }
//         })
//         await DouYinLive(url, room_id, sec_user_id, "app","")
//
//     }else{
//         throw ""
//     }
//
//
// }