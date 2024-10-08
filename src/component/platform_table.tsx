
import {Flex, Tabs, Button} from 'antd';
const { open } = window.__TAURI__.shell;
import {match_url} from '../../platform/comm.js'



function getRandomBrightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    var rgb;
    var brightness;

    do {
        color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        // 将十六进制颜色转换为RGB
        rgb = parseInt(color.substr(1, 2), 16) + ',' +
            parseInt(color.substr(3, 2), 16) + ',' +
            parseInt(color.substr(5, 2), 16);
        // 计算亮度
        brightness = 0.2126 * parseInt(rgb.split(',')[0]) +
            0.7152 * parseInt(rgb.split(',')[1]) +
            0.0722 * parseInt(rgb.split(',')[2]);
    } while (brightness < 128); // 亮度阈值设为128，可以根据需要调整

    return color;
}

const DataList = [

    {
        "name":"douyin",
        "icon":"",
        "url":[
            "https://v.douyin.com/i6u7ofFc/ 单视频",
            "https://www.douyin.com/video/7386667265493568820 单视频",
            "4.38 复制打开抖音，看看【眷思量的作品】# 眷思量团战打戏好燃 高能预警！藏典阁突遇不明生... https://v.douyin.com/i6HNokC5/ 10/30 a@N.wF GIv:/ 单视频",

            "https://v.douyin.com/i6HN5sPB/ 图片",
            "https://www.douyin.com/note/7387258956789402917  图片",
            "0.53 复制打开抖音，看看【宋宋子的图文作品】黑子出来对线。# 永劫无间 # 斗罗大陆  https://v.douyin.com/i6HN5sPB/ W@m.qE qEh:/ 07/10 图片",

            "https://live.douyin.com/334470506294  直播",
            "https://v.douyin.com/i6x5X2pW/  直播",
            "4- #在抖音，记录美好生活#【兔娘】正在直播，来和我一起支持Ta吧。复制下方链接，打开【抖音】，直接观看直播！ https://v.douyin.com/i6ptdC9x/ 2@5.com :8pm 直播 ",

            "5- 长按复制此条消息，打开抖音搜索，查看TA的更多作品。 https://v.douyin.com/i6v3KrLg/ 1@8.com :0pm 用户主页所有视频 ",
            "https://v.douyin.com/i6v3KrLg/ 用户主页所有视频 ",
            "https://www.douyin.com/user/MS4wLjABAAAARb1roorhz30wNfzRJaY4vXDaxr06-WuR8pgSBaF87bY 用户主页所有视频",

            // "https://www.douyin.com/user/self?showTab=like 自己点赞的视频",
            // "https://www.douyin.com/user/self?showTab=favorite_collection 自己收藏的视频",
        ]
    },
    {
        "name":"hongshu",
        "icon":"",
        "url":[
            "https://www.xiaohongshu.com/user/profile/56a4c0455e87e70b5889f0a1 主页视频",
            "https://www.xiaohongshu.com/explore/64b90d38000000000c0342fc?xsec_token=ABNGv_cUrQ1rSyg5TSusdM1oryT91Q-UPGMhAYUwar6ps=&xsec_source=pc_feed 图片",
            "https://www.xiaohongshu.com/explore/6677a15a000000001e0109c2?xsec_token=ABYTMqWXjPaUbPyNDeSr7MI6HFrYVf3RspGv15UcwzqzU=&xsec_source=pc_feed 视频",
            "69 【遇到了狗头萝莉老婆 - 木兆木兆 | 小红书 - 你的生活指南】 😆 PCRjN4ooA8bzH0U 😆 http://xhslink.com/XY5NHP 图片",
            "61 【“夫人的香水味是我对自由的想象” - 鈴铃铃 | 小红书 - 你的生活指南】 😆 WIkoDhstlqn1kBi 😆 http://xhslink.com/RNGNHP 视频"
        ]
    },
    {
        "name":"kuaishou",
        "icon":"",
        "url":[
            "https://www.kuaishou.com/f/XaR7C9XX4WOq18J 视频",
            "https://v.kuaishou.com/SQapM9 视频",
            "https://v.kuaishou.com/QQDzfm 图片",
            "https://live.kuaishou.com/u/ZM-Honey 直播",

            "https://www.kuaishou.com/profile/3x4bq4rsxhhus3k 主页视频",
            "https://v.kuaishou.com/SLWIOp 主页视频",
            "https://v.kuaishou.com/TpOQ7P 主页图片",
        ]
    },
    {
        "name":"bilibili",
        "icon":"",
        "url":[
            "https://www.bilibili.com/video/BV1Wb421v7kv 单视频 ",
            "https://live.bilibili.com/22820500 直播",
        ]
    },
    {
        "name":"weibo",
        "icon":"",
        "url":[
            "https://weibo.com/7594884879/Oj8FGFVwL 单视频 ",
            "https://weibo.com/7277950214/5042374004179568 单视频",
            "https://www.weibo.com/u/7594884879 主页微博",
            "https://weibo.com/u/5900676688?tabtype=home 主页精选",
            "https://weibo.com/u/5900676688?tabtype=feed 主页微博 ",
            "https://weibo.com/u/5900676688?tabtype=newVideo 主页视频",
            "https://weibo.com/u/7726404453?tabtype=album 主页图片"
        ]
    },
    // {
    //     "name":"xiuga",
    //     "icon":"",
    //     "url":[]
    // },
    // {
    //     "name":"toutiao",
    //     "icon":"",
    //     "url":[]
    // },
    // {
    //     "name":"huya",
    //     "icon":"",
    //     "url":[]
    // },
    // {
    //     "name":"douyu",
    //     "icon":"",
    //     "url":[]
    // },

]

const PlatformTable = ()=>{
    let items = []
    DataList.forEach((value, index)=>{
        let children = []
        let children_element = []
        value.url.forEach((value, index)=>{

            children_element.push(
                <Button style={{backgroundColor:getRandomBrightColor(), width:"100%"}} onClick={()=>{open(match_url(value))}} key={index}>{value}</Button>
            )

        })
        children.push(
            <div key={index} style={{overflowY:'auto', overflow:'auto', maxHeight:250}}>
                <Flex gap="4px 0" wrap >
                    {children_element}
                </Flex>
            </div>
        )
        // console.log(value.name)
        items.push({
            label: value.name,
            key:index,
            children:children
        })
    })

    return (
        <Tabs
            defaultActiveKey="1"
            items={items}
        />
    )
}
export default PlatformTable
