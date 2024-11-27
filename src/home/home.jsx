
import "./home.css"
import {Tabs} from 'antd';
import PlatFormConfig from "../component/platform_config.jsx";
import DownloadVideoComponent from "../component/download_video.jsx";
import MusicSearchComponent from "../component/music_search.jsx";
import DownloadRecord from "../component/download_record.jsx";
import SupportPlatformTable from "../component/support_platform.jsx";
import CronJobs from "../component/cron_jobs.jsx";



const TabStyle  = {width:"85vw", backgroundColor:"#FFE5D9", height:"95vh",
    marginLeft:"2%", borderRadius:25, padding:25, opacity:'1'}


function Home() {

    document.addEventListener('contextmenu', event => event.preventDefault());
    // document.addEventListener('copy', event => event.preventDefault());

    return (
        <div className="container">

            <div style={{ display:"flex", padding: 15, height: "100%", width:"100%"}}>
                <Tabs
                    tabBarStyle={{width:"12%",  height:"95%", backgroundColor:"#F0A6CA",borderRadius:25, padding:15, opacity:'1'}}
                    tabPosition={"left"}
                    items={[
                        {
                            label: '资源下载',
                            key: 0,
                            style:TabStyle,
                            children: <DownloadVideoComponent/>
                        },
                        {
                            label: '定时下载',
                            key: 1,
                            style:TabStyle,
                            children: <CronJobs/>
                        },
                        {
                            label: '音乐搜索',
                            key: 2,
                            style:TabStyle,
                            children: <MusicSearchComponent/>
                        },
                        {
                            label: '支持平台',
                            key: 3,
                            style:TabStyle,
                            children: <SupportPlatformTable/>
                        },
                        {
                            label: '下载配置',
                            key: 4,
                            style:TabStyle,
                            children: <PlatFormConfig/>
                        },
                        {
                            label: '下载记录',
                            key: 5,
                            style:TabStyle,
                            children: <DownloadRecord/>
                        },
                    ]}
                />

            </div>




        </div>
    );
}

export default Home;
