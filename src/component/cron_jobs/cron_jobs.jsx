import {Button, Input, message} from "antd";
import {useEffect, useState} from "react";
import {DownLoadAdapter} from "../download_component/download_adapter.jsx";



const CronJobs = () => {

    const [timeLeft, setTimeLeft] = useState(0);
    const [run, setRun] = useState(false);



    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        if (timeLeft === 0) {

        }
        if (run === false){

            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [timeLeft, run]);


    const StartDownload = ()=>{
        setRun(true);
        setTimeLeft(30 * 60)
    }

    const StopDownload = ()=>{
        setRun(false);
        setTimeLeft(0)
    }

    const SubmitDownloadLink = ()=>{}

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
                <Input key='1' id="music_search_keyword" autoComplete="off"/>

            </div>

            <div style={{marginTop: 20, marginLeft: "20%",}}>
                <Button style={{width: 150, marginLeft: "9%"}} type='primary'
                >添加链接</Button>

                <input style={{
                    opacity: 0, display: "none"
                }} type="file" id="fileInput" accept=".txt" onChange={handleFileChange}/>
                <Button style={{marginLeft: 20, width: 150,}} type='primary'
                        onClick={() => {
                            document.getElementById('fileInput').click()
                        }}>
                    从文件下载
                </Button>
                {
                    run === true ?
                    <Button style={{marginLeft: 20, width: 150,}} type='primary' onClick={StopDownload}>全部停止</Button> :
                    <Button style={{marginLeft: 20, width: 150,}} type='primary' onClick={StartDownload}>开始下载</Button>
                }
                {timeLeft > 0 ? `${timeLeft}秒 后开始下次执行` : ''}
            </div>

        </div>)
}

export default CronJobs