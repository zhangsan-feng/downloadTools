import {Button, Input, message} from "antd";
import {DownLoadAdapter} from "./platform_params.jsx";
import {useState} from "react";

const {Search} = Input
const CronJobs = () => {

    const [fileContent, setFileContent] = useState('');
    const Submit = ()=>{

    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                setFileContent(e.target.result);
            };
            reader.readAsText(file);
        }
        if (fileContent.length !== 0){
            DownLoadAdapter(fileContent).
            then(res=>{}).
            catch(err=>{
                console.log(err)
                // setButtonLoading(false)
                message.error({content:"下载失败"}
                )})
        }

    };

    return (
        <div>
            <div>
                <div style={{display: 'flex', top: 50}}>
                    <Search style={{width: 500}} key='1' enterButton="添加" onSearch={Submit}/>
                    <input style={{opacity: 0, display: "none"
                    }} type="file" id="fileInput" accept=".txt" onChange={handleFileChange}/>
                    <Button style={{marginLeft:20, width: 150,}} type='primary'
                            onClick={()=>{document.getElementById('fileInput').click()}}>
                        从文件中添加
                    </Button>
                </div>
            </div>
            <div></div>
        </div>)
}

export default CronJobs