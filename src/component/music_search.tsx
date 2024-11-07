import {Button, Input, message, Table} from 'antd';
import "./comm.css"
import {MusicSearchAdapter, MusicDownLoadAdapter, MusicPlayerAdapter} from './platform_params.tsx'
import {useEffect, useRef, useState} from 'react'

const {Search} = Input


const MusicSearchComponent = () => {

    const [searchData, setSearchData] = useState([])
    const [currentPlayInfo, setCurrentPlayInfo] = useState('')
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState('')
    const audioRef = useRef(null);

    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const Submit = (data) => {
        // console.log(data)
        MusicSearchAdapter(data).then(res=>{
            // console.log(res)
            setSearchData(res)
        })

    }
    useEffect(() => {
        if (audioRef.current && audioUrl) {
            audioRef.current.src = audioUrl;
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error('Error playing new audio source:', error);
                });
            }
        }
    }, [audioUrl, isPlaying]);

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
                    MusicDownLoadAdapter(src).then(res=>{})
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
                        handlePlayPause()
                    })
                    //
                }}>播放</a>
            },
        },
    ];

    const spanStyle = {justifyContent: 'center', alignContent: 'center', marginLeft: 10}
    return (
        <div style={{}}>

            <div style={{display: "flex", top: 50,}}>
                <span style={{justifyContent: 'center', alignContent: 'center'}}>音乐搜索:</span>
                <Search style={{width: 500}} key='1' enterButton="搜索" onSearch={Submit}/>
                <span style={spanStyle}>当前播放</span>
                <span style={spanStyle}>{currentPlayInfo.id}</span>
                <span style={spanStyle}>{currentPlayInfo.platform}</span>
                <span style={spanStyle}>{currentPlayInfo.author}</span>
                <span style={spanStyle}>{currentPlayInfo.music_name}</span>
                <Button style={{marginLeft:10}} onClick={handlePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </Button>
            </div>

            <div style={{marginTop: 20,}}>
                {searchData.length !== 0 ? (
                    <div>
                        <Table
                            columns={columns}
                            pagination={{pageSize: 100}}
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