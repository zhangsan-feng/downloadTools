import {useEffect, useState} from "react";
import { Input , message} from 'antd';

const { Search } = Input;

const PlatformCookie = [
    "bilibili",
    "weibo",
    "douyin",
    "hongshu",
    "kuaishou",

    // "qq_music",
    // "wy_music",
    // "kg_music",
    // "kw_music",
    // "wy_music",
    // "gm_music",
    // "douyu",
    // "huya",
]

const DownloadConfig = ()=>{
    const [cookieData, setCookieData] = useState({})

    useEffect(()=>{

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
                                const platform = value


                }}/>

            </div>
        )
    })
    return (
        <div style={{overflow:'auto', maxHeight:"75vh"}}>
            <h2 >cookie 配置</h2>
            {Element}
        </div>
    )
}


export default DownloadConfig