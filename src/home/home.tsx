
import "./home.css"
import {Button,Row, Col, Tabs} from 'antd';
import logo from "../../src-tauri/icons/title_icon.png";
import {getCurrentWebviewWindow} from "@tauri-apps/api/webviewWindow";
import {CloseOutlined, CompressOutlined, MinusOutlined} from "@ant-design/icons";
import SupportPlatformTable from "../component/support_platform.tsx";
import PlatFormConfig from "../component/platform_config.tsx";
import DownloadVideoComponent from "../component/download_video.tsx";
import MusicSearchComponent from "../component/music_search.tsx";
import DownloadRecord from "../component/download_record.tsx";
import {ProxyApi} from '../api/axios_http.ts'

const appWindow = getCurrentWebviewWindow()

const TablsChilrenStyle  = {width:"84vw", backgroundColor:"#ce87cc", height:"82vh",
    marginLeft:"2%", borderRadius:25, padding:25}


function Home() {


    document.addEventListener('contextmenu', event => event.preventDefault());
    // document.addEventListener('copy', event => event.preventDefault());
    setTimeout(()=>{},3000)
    return (
        <div className="container">
            <div className="container-header" data-tauri-drag-region>
                <Row gutter={16} data-tauri-drag-region>
                    <Col className="gutter-row" span={4}>
                        <div className="logo-box">
                            <img src={logo} alt="" style={{width:55, height:55}}/>
                            <h3 style={{marginLeft: 10, width:120 }}><p></p></h3>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={16} data-tauri-drag-region>
                    </Col>

                    <Col className="gutter-row" span={4}>
                        <div style={{width:200}}></div>
                        <Button
                            style={{ height:40 , marginTop:18, marginLeft:"20%", borderRadius:5,}}
                            onClick={()=>{appWindow.minimize().then()}}
                        ><MinusOutlined /></Button>
                        {/*<Button*/}
                        {/*    style={{ height:40 , marginTop:18, marginLeft:5, borderRadius:5,}}*/}
                        {/*    onClick={()=>{*/}
                        {/*        appWindow.isMaximized().then(res=>{*/}
                        {/*            if (res){*/}
                        {/*                appWindow.unmaximize().then();*/}
                        {/*            } else {*/}
                        {/*                appWindow.toggleMaximize().then();*/}
                        {/*            }*/}
                        {/*        })*/}
                        {/*    }}*/}
                        {/*><CompressOutlined /></Button>*/}
                        <Button
                            style={{ height:40 ,marginTop:18, marginLeft:5, borderRadius:5, }}
                            onClick={()=>{appWindow.close().then()}}
                        ><CloseOutlined /></Button>
                    </Col>
                </Row>
            </div>

            <div style={{ display:"flex", padding: 25, height: "100%", width:"100%",  backgroundColor: "#ffe7db"}}>
                <Tabs
                    tabBarStyle={{width:180,  height:"80%", backgroundColor:"#CE95CC",borderRadius:25, padding:15}}
                    tabPosition={"left"}
                    items={[
                        {
                            label: '资源下载',
                            key: 1,
                            style:TablsChilrenStyle,
                            children: <DownloadVideoComponent/>
                        },
                        {
                            label: '音乐搜索',
                            key: 2,
                            style:TablsChilrenStyle,
                            children: <MusicSearchComponent/>
                        },
                        // {
                        //     label: '支持平台',
                        //     key: 3,
                        //     style:TablsChilrenStyle,
                        //     children: <SupportPlatformTable/>
                        // },
                        {
                            label: '下载配置',
                            key: 4,
                            style:TablsChilrenStyle,
                            children: <PlatFormConfig/>
                        },
                        {
                            label: '下载记录',
                            key: 5,
                            style:TablsChilrenStyle,
                            children: <DownloadRecord/>
                        },
                    ]}
                />

            </div>




        </div>
    );
}

export default Home;
