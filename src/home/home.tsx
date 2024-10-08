
import "./home.css"
import {Button,Row, Col, Tabs} from 'antd';
import logo from "../../src-tauri/icons/title_icon.png";
import {getCurrentWebviewWindow} from "@tauri-apps/api/webviewWindow";
import {CloseOutlined, CompressOutlined, MinusOutlined} from "@ant-design/icons";
import {HttPGet} from '../api/tauri_http.ts'

const appWindow = getCurrentWebviewWindow()


// await appWindow.setSize(new LogicalSize(1920, 1080));

const items = [
    {
        label: '资源下载',
        key: 1,
        style: {width: "100%"},
        children: <div/>
    },
    {
        label: '支持平台',
        key: 2,
        style: {width: "100%"},
        children: <div/>
    },
    {
        label: '下载配置',
        key: 3,
        style: {width: "100%"},
        children: <div style={{backgroundColor:"black", width:"100%"}}>1111</div>
    },
    {
        label: '下载记录',
        key: 4,
        style: {width: "100%"},
        children: <div style={{backgroundColor:"black", width:"100%"}}>1111</div>
    },
]

function Home() {
    HttPGet("https://wwww.baidu.com",{},{}).then(res=>{
        console.log(res)
    })

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
                        <Button
                            style={{ height:40 , marginTop:18, marginLeft:5, borderRadius:5,}}
                            onClick={()=>{
                                appWindow.isMaximized().then(res=>{
                                    if (res){
                                        appWindow.unmaximize().then();
                                    } else {
                                        appWindow.toggleMaximize().then();
                                    }
                                })
                            }}
                        ><CompressOutlined /></Button>
                        <Button
                            style={{ height:40 ,marginTop:18, marginLeft:5, borderRadius:5, }}
                            onClick={()=>{appWindow.close().then()}}
                        ><CloseOutlined /></Button>
                    </Col>
                </Row>
            </div>

            <div style={{ display:"flex", padding: 25, height: "100%", width:"100%",  backgroundColor: "#ffe7db"}}>
                <Tabs
                    tabBarStyle={{width:150,  height:"80%", }}
                    tabPosition={"left"}
                    items={items.map(item => ({
                        ...item,
                        className: 'custom-tab-class',
                        children: <div>{item.label}</div>
                    }))}
                />

            </div>




        </div>
    );
}

export default Home;
