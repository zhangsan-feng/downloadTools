
import {Input, Button, message, Checkbox, Tabs} from 'antd';
import "./comm.css"
import {MusicSearchAdapter, CommentAdapter, DownLoadAdapter} from './platform_params.tsx'

const {TextArea}  = Input


const DownloadVideoComponent = () =>{
    return (
        <div style={{}}>

            <div style={{display: "flex", top:50, }}>
                <span style={{width: 50, justifyContent: 'center', alignContent: 'center'}}>url:</span>
                <TextArea id="url"
                          style={{resize:"none",height:"10vh", maxWidth:"90%", overflow:'auto', borderRadius:10}}/>
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