import {HongShuDetailsDownload} from './hongshu_details_download.js'
import {HongShuPost} from './hongshu_post.js'
import {ScriptHandler} from "../../comm.js";

export async function HongSHuAdapter(source, config){

    localStorage.setItem("sdt_source_storage_key",'{"signUrl":"https://fe-video-qc.xhscdn.com/fe-platform/cb0dcfde4b4748b6c333e0383316910bfd13cfbb.js","signVersion":"1","url":"https://fe-video-qc.xhscdn.com/fe-platform/c7afcb275f2c211c34d2709e8fbe763057731b6b.js","reportUrl":"/api/sec/v1/shield/webprofile","desVersion":"2","validate":true,"commonPatch":["/fe_api/burdock/v2/note/post","/api/sns/web/v1/comment/post","/api/sns/web/v1/note/like","/api/sns/web/v1/note/collect","/api/sns/web/v1/user/follow","/api/sns/web/v1/feed","/api/sns/web/v1/login/activate","/api/sns/web/v1/note/metrics_report","/api/redcaptcha","/api/store/jpd/main","/phoenix/api/strategy/getAppStrategy"]}')
    const scriptHandler = ScriptHandler();
    await scriptHandler.loadScript("src/platform/video_platform/honshu/x-s.js")

    config['hongshu'].cookie.split(";").forEach((data)=>{
        document.cookie = data
    })

    if (source.download_link.includes("https://www.xiaohongshu.com/explore")){
        await HongShuDetailsDownload(source, config)
    }
    if (source.download_link.includes("https://www.xiaohongshu.com/user/profile/")){
        await HongShuPost(source, config)
    }

    scriptHandler.removeScript()
}