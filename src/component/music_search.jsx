import {Button, Input, message, Table} from 'antd';
import "./comm.css"
import {MusicSearchAdapter, MusicDownLoadAdapter, MusicPlayerAdapter} from './platform_params.jsx'
import {useEffect, useRef, useState} from 'react'
import * as sea from "node:sea";

const {Search} = Input

const MusicSearchComponent = () => {

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

    const Submit = (data) => {
        // console.log(data)
        setLoading(true)
        MusicSearchAdapter(data).then(res=>{
            // console.log(res)
            setSearchData(res)
            setLoading(false)
        })

    }

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
        {title: 'id', dataIndex: 'id', width:150,},
        {title: 'platform', dataIndex: 'platform',},
        {title: 'music_id', dataIndex: 'music_id',},
        {title: 'author', dataIndex: 'author',},
        {title: "music_name", dataIndex: "music_name",},
        {title: "file_name", dataIndex: "file_name",},
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
    return (
        <div style={{}}>

            <div style={{display: "flex", top: 50,}}>
                <div style={{display: 'flex', top: 50 }}>
                    <Search style={{width: 300}} key='1' placeholder="音乐搜索" loading={loading} enterButton="搜索" onSearch={Submit}/>
                </div>

                {currentPlayInfo ?
                    <div >
                        <span style={spanStyle}>当前播放</span>
                        <span style={spanStyle}>{currentPlayInfo.id}</span>
                        <span style={spanStyle}>{currentPlayInfo.platform}</span>
                        <span style={spanStyle}>{currentPlayInfo.author}</span>
                        <span style={spanStyle}>{currentPlayInfo.music_name}</span>

                        <Button style={{marginLeft: 10}} onClick={handlePlayPause}>{isPlaying ? '停止' : '播放'}</Button>
                    </div> : (<div></div>)}
            </div>

            <div style={{marginTop: 20,}}>
                {searchData.length !== 0 ? (<div>
                        <Table
                            columns={columns}
                            dataSource={searchData}
                            scroll={{y: "68vh"}}
                            rowKey="id"
                        />
                        <audio ref={audioRef} onCanPlay={() => console.log('Audio can play')}/>

                    </div>
                ) : (
                    <div></div>
                )}
            </div>

        </div>
    )
}

export default MusicSearchComponent