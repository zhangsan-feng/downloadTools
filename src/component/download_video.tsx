
import {Input, Button, message} from 'antd';
import "./comm.css"
import {DownLoadAdapter} from './platform_params.tsx'
import {useState} from "react";
import {sleep} from "../platform/comm.js";



const DownloadVideoComponent = () =>{
    const [ButtonLoading, setButtonLoading] = useState(false)
    const Submit = async ()=>{
        // setButtonLoading(true)
        message.success({content:"已经加入下载队列 即将开始下载"})
        await sleep()
        const download_link = document.getElementById("download_link").value
        DownLoadAdapter(download_link).
        then(res=>{setButtonLoading(false)}).
        catch(err=>{
            console.log(err)
            // setButtonLoading(false)
            message.error({content:"下载失败"}
            )})
    }

    return (
        <div style={{}}>

            <div style={{display:'flex',top:50, width:800, marginLeft:"15%"}}>
                <span style={{ justifyContent: 'center', alignContent: 'center'}}>url:</span>
                <Input key='1' id="download_link" autoComplete="off"/>


            </div>

            <div style={{marginTop: 20, marginLeft: "20%",}}>
                <Button loading={ButtonLoading} style={{ width: 200, marginLeft:"22%"}}
                        type='primary' onClick={Submit}>下载</Button>
                {/*<Button style={{marginLeft: 10, width: 200}} type='primary' onClick={DownLoadComment}>下载评论</Button>*/}
                {/*<Button style={{marginLeft: 10, width: 200}} type='primary' onClick={MusicSearch} >音乐搜索</Button>*/}
            </div>

        </div>
    )
}

export default DownloadVideoComponent