
import {Input, Button, message} from 'antd';
import {DownLoadAdapter} from './download_adapter.jsx'
import {useState} from "react";








const DownloadVideoComponent = () =>{

    const [ButtonLoading, setButtonLoading] = useState(false)


    const Submit = async ()=>{
        // setButtonLoading(true)

        // await sleep()
        const download_link = document.getElementById("download_link").value
        if (download_link.length === 0){
            return
        }
        message.success({content:"已经加入下载队列 即将开始下载"})
        DownLoadAdapter(download_link).
        then(res=>{}).
        catch(err=>{
            console.log(err)
            // setButtonLoading(false)
            message.error({content:"下载失败"}
            )})
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (e.target.result.length !== 0){
                    DownLoadAdapter(e.target.result).then(res=>{}).catch(err=>{
                        console.log(err)
                        // setButtonLoading(false)
                        message.error({content:"下载失败"}
                        )})
                }
                console.log(e.target.result)

            };
            reader.readAsText(file);
        }
    };


    return (
        <div>

            <div style={{display: 'flex', top: 50, width: 800, marginLeft: "15%"}}>
                <span style={{justifyContent: 'center', alignContent: 'center'}}>url:</span>
                <Input key='1' id="download_link" autoComplete="off"/>
            </div>

            <div style={{marginTop: 20, marginLeft: "20%",}}>
                <Button loading={ButtonLoading} style={{width: 150, marginLeft: "16%"}}
                        type='primary' onClick={Submit}>从链接下载</Button>
                <input style={{opacity: 0, display: "none"}} type="file" id="fileInput" accept=".txt" onChange={handleFileChange}/>
                <Button style={{marginLeft:20, width: 150,}} type='primary'
                        onClick={()=>{document.getElementById('fileInput').click()}}>
                    从文件下载
                </Button>
                {/*<Button style={{marginLeft: 10, width: 200}} type='primary' onClick={DownLoadComment}>下载评论</Button>*/}

            </div>

        </div>
    )
}

export default DownloadVideoComponent