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
]

const PlatFormConfig = ()=>{
    const [cookieData, setCookieData] = useState({})

    useEffect(()=>{
        PlatFormConfigQueryAPi({}).then(res=>{
            // console.log(res)
            setCookieData(res.data)
        })
    },[])

    let Element = []
    PlatformCookie.forEach((value, index)=>{
        // console.log(value, index)
        // console.log(cookieData[index])
        Element.push(
            <div style={{marginTop: 20, display: "flex", width:"70vw", marginLeft:20, }} key={index}>
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
                                const platform = value
                            PlatFormConfigUpdateAPi({"cookie":cookie, "platform":platform}).then(res=>{
                                message.success({content:res.data})
                            })
                }}/>

            </div>
        )
    })
    return (
        <div style={{overflow:'auto', maxHeight:"70vh"}}>
            <h2 >cookie 配置</h2>
            {Element}
        </div>
    )
}


export default PlatFormConfig