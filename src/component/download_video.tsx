
import {Input} from 'antd';
import "./comm.css"


const {Search}  = Input


const DownloadVideoComponent = () =>{

    const Submit = ()=>{

    }

    return (
        <div style={{}}>

            <div style={{display: "flex", top:50, width:500}}>
                <span style={{width: 50, justifyContent: 'center', alignContent: 'center'}}>url:</span>
                <Search key='1' enterButton="搜索" onSearch={Submit}/>
            </div>

            <div style={{marginTop: 20, marginLeft: "23%",}}>
                {/*<Button style={{marginLeft: 10, width: 200}} type='primary' onClick={Submit}>下载 视频/图片/直播/音乐</Button>*/}
                {/*<Button style={{marginLeft: 10, width: 200}} type='primary' onClick={DownLoadComment}>下载评论</Button>*/}
                {/*<Button style={{marginLeft: 10, width: 200}} type='primary' onClick={MusicSearch} >音乐搜索</Button>*/}
            </div>

        </div>
    )
}

export default DownloadVideoComponent