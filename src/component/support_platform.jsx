import './comm.css'
import {Input} from 'antd'


const {TextArea} = Input
const htmlText = `
    音乐搜索: qq音乐 酷我音乐 酷狗音乐 咪咕音乐
    资源下载:
        抖音
            视频 https://www.douyin.com/video/7439510966666104103
            视频 6.69 09/16 cAG:/ c@N.ws 丝滑扣1不丝滑扣0# 丝滑小连招 # 短裙控 # 御姐  https://v.douyin.com/iD1EUHvg/ 复制此链接，打开Dou音搜索，直接观看视频！
            图片 4.64 07/03 j@c.nd UYz:/ # 国漫女神# ai绘画# 小医仙 # 上热门🔥  https://v.douyin.com/iDJR2B9G/ 复制此链接，打开Dou音搜索，直接观看视频！
            图片 https://www.douyin.com/note/7426014315141958963
            liv 
            主页 https://www.douyin.com/user/MS4wLjABAAAAYDWon90yZ1_iH789l6fQayeUT6oZpBNlTu0Pou3yrGY?from_tab_name=main&vid=7439510966666104103
            主页 长按复制此条消息，打开抖音搜索，查看TA的更多作品。 https://v.douyin.com/iDJRAb9q/
            主页 https://www.douyin.com/user/MS4wLjABAAAAK1V3u06cqNgDRDyF_LesGPrBJP6hCENlSz8k3b7Zjk4CupfEdLxn8IPqy7NZXcB-?from_tab_name=main&vid=7439180504819043619
            主页 长按复制此条消息，打开抖音搜索，查看TA的更多作品。 https://v.douyin.com/iDJRmdST/
            直播 https://live.douyin.com/506926705149
            直播 8- #在抖音，记录美好生活#【抱走柒柒】正在直播，来和我一起支持Ta吧。复制下方链接，打开【抖音】，直接观看直播！ https://v.douyin.com/iDJf5XV7/ 4@8.com :7pm
        快手
            视频 https://www.kuaishou.com/f/XaR7C9XX4WOq18J
            图片 https://v.kuaishou.com/QQDzfm
            主页 https://www.kuaishou.com/profile/3x4bq4rsxhhus3k
            主页 https://v.kuaishou.com/TpOQ7P
            主页 https://v.kuaishou.com/SLWIOp
            直播 https://live.kuaishou.com/u/3x6jhnh2wnr3n32
        红书
            视频 https://www.xiaohongshu.com/explore/672755ad000000003c016882?xsec_token=ABUdZzNUXuNuHeF0eVZ2wRrGHEuyB9b3DaK2JQ0bf590Y=&xsec_source=pc_feed
            图片 https://www.xiaohongshu.com/explore/67276bda000000001b013d8a?xsec_token=ABUdZzNUXuNuHeF0eVZ2wRrL1TX1be7FouXYT8wjifFho=&xsec_source=pc_feed
            liv https://www.xiaohongshu.com/explore/6687e378000000001e011b55?xsec_token=ABot1hTbxS_wxSv8_csSmD74rYb8U_JQYXTDiTLgDKDzk=&xsec_source=pc_search&source=web_explore_feed
            主页 https://www.xiaohongshu.com/user/profile/6144b2b5000000000201921f?xsec_token=&xsec_source=pc_note
        b站
            视频 https://www.bilibili.com/video/BV17S1bYwEw7?spm_id_from=333.1007.tianma.1-1-1.click
            主页
            直播 https://live.bilibili.com/30749099?session_id=398c6762ac0707853c80fff58567358f_A5C698D3-6C52-4FDD-9A58-F07BE6008E17&launch_id=1000000&live_from=71001
        微博
            live   https://weibo.com/2406261002/OFVnaCOxh
            视频    https://weibo.com/2642858984/OEKua9Fhv
            图片    https://weibo.com/2830125342/P0eTUCYSt
            主页相册 https://weibo.com/u/5205636486?tabtype=album
            主页视频 https://weibo.com/u/5205636486?tabtype=newVideo
            主页微博 https://weibo.com/u/5205636486?tabtype=feed
            主页微博 https://weibo.com/u/5205636486
            主页精选 https://weibo.com/u/5205636486?tabtype=home

`

const SupportPlatformTable = ()=>{
    return (
        <div className="support-platform-container" >
            <TextArea value={htmlText}
                      style={{height:"100%", resize:'none', overflow:'auto', whiteSpace:"pre", width: "100%"}}
            />
        </div>
    )
}
export default SupportPlatformTable
