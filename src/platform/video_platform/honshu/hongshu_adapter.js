import {HongShuDetailsDownload} from './hongshu_details_download.js'
import {HongShuPost} from './hongshu_post.js'
import {ScriptHandler} from "../../comm.js";
import './x-s'

export async function HongSHuAdapter(source, config){

    localStorage.setItem("sdt_source_storage_key",'{"desVersion":"2","validate":true,"commonPatch":["/fe_api/burdock/v2/note/post","/api/sns/web/v1/comment/post","/api/sns/web/v1/note/like","/api/sns/web/v1/note/collect","/api/sns/web/v1/user/follow","/api/sns/web/v1/feed","/api/sns/web/v1/login/activate","/api/sns/web/v1/note/metrics_report","/api/redcaptcha","/api/store/jpd/main","/phoenix/api/strategy/getAppStrategy"],"signUrl":"https://fe-video-qc.xhscdn.com/fe-platform/feebc0adf4ea0006b9c3b69e7336cee982e7d886.js","signVersion":"1","xhsTokenUrl":"https://fe-video-qc.xhscdn.com/fe-platform/e23058410f77dfa42b44af8273b03c4fda3203a8/sf_0.03.js","url":"https://fe-video-qc.xhscdn.com/fe-platform/c7afcb275f2c211c34d2709e8fbe763057731b6b.js","reportUrl":"/api/sec/v1/shield/webprofile"}')
    // const scriptHandler = ScriptHandler();
    // await scriptHandler.loadScript("src\\platform\\video_platform\\honshu\\x-s.js")

    config['hongshu'].cookie.split(";").forEach((data)=>{
        document.cookie = data
    })

    if (source.download_link.includes("https://www.xiaohongshu.com/explore")){
        await HongShuDetailsDownload(source, config)
    }
    if (source.download_link.includes("https://www.xiaohongshu.com/user/profile/")){
        await HongShuPost(source, config)
    }

    // scriptHandler.removeScript()
}