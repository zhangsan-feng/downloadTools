import {useEffect, useState} from "react";
import { Input , message} from 'antd';
import {PlatFormConfigQueryAPi, PlatFormConfigUpdateAPi} from '../api/axios_http.ts'

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

    // "douyu",
    // "huya",
    // "aiqiyi",
    // "tencent_video",
    // "xigua_video"
]

const PlatFormConfig = ()=>{
    const [cookieData, setCookieData] = useState({})

    useEffect(()=>{
        PlatFormConfigQueryAPi({}).then(res=>{
            // console.log(res)
            const config = {}
            for (const index in res.data) {
                config[res.data[index].platform] = {
                    "cookie":res.data[index].cookie,
                    "id" :res.data[index].id
                }
            }
            // console.log(config)
            setCookieData(config)
        })
    },[])

    const Element = []
    PlatformCookie.forEach((value, index)=>{
        // console.log(value, index)
        // console.log(cookieData[index][value])
        Element.push(
            <div style={{marginTop: 20, display: "flex", width:"75vw", marginLeft:20, }} key={index}>
                <span style={{
                    width: 100,
                    textAlign: "right",
                    marginRight: 10,
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>{value}</span>
                <Search key={cookieData[value]?.["id"] ? cookieData[value]["id"] : ""} enterButton="提交"
                        defaultValue = {cookieData[value]?.["cookie"] ? cookieData[value]["cookie"] : ""}
                        onSearch={(cookie) => {
                                const platform = value
                            PlatFormConfigUpdateAPi({"cookie":cookie, "platform":platform}).then(res=>{
                                message.success({content:res.data})
                            })
                }}/>

            </div>
        )
    })
    return (
        <div style={{overflow:'auto', height:"85vh"}}>
            <h2 >cookie 配置</h2>
            {Element}
        </div>
    )
}


export default PlatFormConfig