import {HongShuDetailsDownload} from './hongshu_details_download.js'
import {ScriptHandler} from "../../comm.js";

export async function HongSHuAdapter(source, config){

    localStorage.setItem("sdt_source_storage_key",'{"url":"https://fe-video-qc.xhscdn.com/fe-platform/a1c872577b980b890b0850cef89371b35125649a.js","reportUrl":"/api/sec/v1/shield/webprofile","desVersion":"2","validate":true,"commonPatch":["/fe_api/burdock/v2/note/post","/api/sns/web/v1/comment/post","/api/sns/web/v1/note/like","/api/sns/web/v1/note/collect","/api/sns/web/v1/user/follow","/api/sns/web/v1/feed","/api/sns/web/v1/login/activate","/api/sns/web/v1/note/metrics_report","/api/redcaptcha","/api/store/jpd/main","/phoenix/api/strategy/getAppStrategy"],"signUrl":"https://fe-video-qc.xhscdn.com/fe-platform/bccb34c4f2976c51b565494c0a760c42d962b25b.js","signVersion":"1"}')
    const scriptHandler = ScriptHandler();
    await scriptHandler.loadScript("src/platform/video_platform/honshu/x-s.js")

    if (source.download_link.includes("https://www.xiaohongshu.com/explore")){
        await HongShuDetailsDownload(source, config)
    }

    scriptHandler.removeScript()
}