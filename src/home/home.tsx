
import "./home.css"
import {Tabs} from 'antd';
import PlatFormConfig from "../component/platform_config.tsx";
import DownloadVideoComponent from "../component/download_video.tsx";
import MusicSearchComponent from "../component/music_search.tsx";
import DownloadRecord from "../component/download_record.tsx";


//

const TablsStyle  = {width:"84vw", backgroundColor:"#FFE5D9", height:"95vh",
    marginLeft:"2%", borderRadius:25, padding:25, opacity:'1'}


function Home() {


    document.addEventListener('contextmenu', event => event.preventDefault());
    // document.addEventListener('copy', event => event.preventDefault());
    setTimeout(()=>{},3000)
    return (
        <div className="container">

            <div style={{ display:"flex", padding: 15, height: "100%", width:"100%"}}>
                <Tabs
                    tabBarStyle={{width:"13%",  height:"95%", backgroundColor:"#F0A6CA",borderRadius:25, padding:15, opacity:'1'}}
                    tabPosition={"left"}
                    items={[
                        {
                            label: '资源下载',
                            key: 1,
                            style:TablsStyle,
                            children: <DownloadVideoComponent/>
                        },
                        {
                            label: '音乐搜索',
                            key: 2,
                            style:TablsStyle,
                            children: <MusicSearchComponent/>
                        },

                        {
                            label: '下载配置',
                            key: 4,
                            style:TablsStyle,
                            children: <PlatFormConfig/>
                        },
                        {
                            label: '下载记录',
                            key: 5,
                            style:TablsStyle,
                            children: <DownloadRecord/>
                        },
                    ]}
                />

            </div>




        </div>
    );
}

export default Home;
