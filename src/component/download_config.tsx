import {useEffect, useState} from "react";
import {invoke} from '@tauri-apps/api'
import { Input , message} from 'antd';

const { Search } = Input;

const PlatformCookie = [
    "bilibili",
    "weibo",
    "douyin",
    "hongshu",
    "kuaishou",

    "qq_music",
    "wy_music",
    "kg_music",
    "kw_music",
    "wy_music",
    "gm_music",
    "douyu",
    "huya",
]

const DownloadConfig = ()=>{
    const [cookieData, setCookieData] = useState({})

    useEffect(()=>{
        invoke("download_config_query",{}).then(res=>{
            // setCookieData({})
            setCookieData(JSON.parse(res).data)
            // console.log(JSON.parse(res))
        })
    },[])

    let Element = []
    PlatformCookie.forEach((value, index)=>{
        // console.log(value, index)
        console.log(cookieData[index])
        Element.push(
            <div style={{marginTop: 20, display: "flex"}} key={index}>
                <span style={{
                    width: 50,
                    textAlign: "right",
                    marginRight: 10,
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>{value}</span>
                <Search key={cookieData[index]?.["id"] ? cookieData[index]["id"] : ""} enterButton="提交"
                        defaultValue = {cookieData[index]?.["cookie"] ? cookieData[index]["cookie"] : ""}

                        onSearch={(cookie) => {
                                let platform = value
                                // console.log(cookie)
                                // console.log(platform)
                            invoke("download_config_update",{"platform":platform, "cookie":cookie }).then(res=>{
                                res = JSON.parse(res)
                                // console.log(res)
                                if (res.code === 200){
                                    message.success({content:res.data}).then()
                                }else {
                                    message.error({content:res.data}).then()
                                }
                            })
                }}/>

            </div>
        )
    })
    return (
        <div style={{overflow:'auto', maxHeight:550}}>
            <h2 >cookie 配置</h2>
            {Element}
        </div>
    )
}


export default DownloadConfig