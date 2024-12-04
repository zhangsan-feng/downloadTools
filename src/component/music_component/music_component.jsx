import {Button, Input, message, Table} from 'antd';
import {MusicSearchAdapter, MusicDownLoadAdapter, MusicPlayerAdapter} from './music_adapter.js'
import {useEffect, useRef, useState} from 'react'
import './music_component.css'
import {PauseCircleOutlined, PlayCircleOutlined} from "@ant-design/icons";
const {Search} = Input



const MusicComponent = () => {

    const [searchData, setSearchData] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentPlayInfo, setCurrentPlayInfo] = useState('')
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState('')
    const audioRef = useRef(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const MusicSearch = () => {
        // console.log(data)
        const data =   document.getElementById("music_search_keyword").value
        setLoading(true)
        MusicSearchAdapter(data).then(res=>{
            // console.log(res)
            setSearchData(res)
            setLoading(false)
        })

    }
    const MusicHostList = () => {}
    const MusicRecommend = () => {}

    useEffect(() => {
        if (audioRef.current && audioUrl) {
            audioRef.current.src = audioUrl;
            audioRef.current.play()
            setIsPlaying(true);
            // const handleLoadedMetadata = () => {
            //     setDuration(audio.duration);
            // };

            const handleEnded = () => {
                setIsPlaying(false);
                console.log('Audio has ended');
                for(let index = 0; index < searchData.length ; index++) {
                    if (searchData[index].id === currentPlayInfo.id){
                        if (index + 1 !== searchData.length){
                            // console.log(searchData[index], searchData[index + 1])
                            setCurrentPlayInfo(searchData[index + 1])
                            MusicPlayerAdapter(searchData[index + 1]).then(res=>{
                                setAudioUrl((res))
                                handlePlayPause();
                            }).catch(err=>{message.error({content:"播放失败 "})})
                            return
                        }
                    }
                }
            };

            // audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audioRef.current.addEventListener('ended', handleEnded);

            return () => {
                // audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audioRef.current.removeEventListener('ended', handleEnded);
            };

        }
    }, [audioUrl]);

    const columns = [
        {title: 'id', dataIndex: 'id'},
        {title: 'platform', dataIndex: 'platform'},
        {title: 'music_id', dataIndex: 'music_id'},
        {title: 'author', dataIndex: 'author',ellipsis: true},
        {title: "music_name", dataIndex: "music_name", ellipsis: true},
        {title: "file_name", dataIndex: "file_name", ellipsis: true, width: 240},
        {
            width:100,
            title: '',
            dataIndex: '',
            render: (_, src) => {
                return <a onClick={()=>{
                    MusicDownLoadAdapter(src)
                        .then(res=>{message.success({content:"下载完成 " + src.music_name})})
                        .catch(err=>{message.error({content:"下载失败"})})
                    // console.log(src.music_id)
                }}>下载</a>
            },
        },
        {
            width:100,
            title: '',
            dataIndex: '',
            render: (_, src) => {
                return <a onClick={()=>{
                    window.open(src.download_link)
                }}>打开</a>
            },
        },
        {
            width:100,
            title: '',
            dataIndex: '',
            render: (_, src) => {
                return <a onClick={()=>{
                    setCurrentPlayInfo(src)
                    MusicPlayerAdapter(src).then(res=>{
                        setAudioUrl((res))
                        handlePlayPause();
                    }).catch(err=>{message.error({content:"播放失败 "})})

                }}>播放</a>
            },
        },
    ];

    const spanStyle = {justifyContent: 'center', alignContent: 'center', marginLeft: 10}
    return (<div>


        <div style={{display: 'flex', top: 50, width: 800, marginLeft: "15%"}}>
            <span style={{justifyContent: 'center', alignContent: 'center'}}>url:</span>
            <Input key='1' id="music_search_keyword" autoComplete="off"/>

        </div>

        <div style={{marginTop: 20, marginLeft: "20%",}}>
            <Button loading={loading} style={{width: 150, marginLeft: "12%"}} type='primary'
                    onClick={MusicSearch}>音乐搜索</Button>
            <Button loading={loading} style={{width: 150, marginLeft: "2%"}} type='primary'
                    onClick={MusicHostList}>音乐热榜</Button>
            <Button loading={loading} style={{width: 150, marginLeft: "2%"}} type='primary'
                    onClick={MusicRecommend}>音乐推荐</Button>
        </div>

        <div style={{marginTop: 20,}}>
            {searchData.length !== 0 ? (<div>
                <Table
                    columns={columns}
                    dataSource={searchData}
                    scroll={{y: "60vh"}}
                    rowKey="id"
                    pagination={{pageSize:100}}
                    rowClassName={(data)=>{
                        if (data.id === currentPlayInfo.id){
                            return "play-column-style"
                        }
                        // console.log(data)
                    }}
                />
                <audio ref={audioRef} onCanPlay={() => console.log('Audio can play')}/>

            </div>) : (<div></div>)}
        </div>
        {currentPlayInfo ?
            <div className="play-container">
                <span style={spanStyle}>当前播放</span>
                <span style={spanStyle}>{currentPlayInfo.id}</span>
                <span style={spanStyle}>{currentPlayInfo.platform}</span>
                <span style={spanStyle}>{currentPlayInfo.author}</span>
                <span style={spanStyle}>{currentPlayInfo.music_name}</span>

               <div style={{fontSize:30, marginLeft:12}}>
                   {isPlaying ? <PauseCircleOutlined onClick={handlePlayPause}/> : <PlayCircleOutlined onClick={handlePlayPause}/>}
               </div>
            </div> :
            (<div></div>)}

    </div>)
}

export default MusicComponent