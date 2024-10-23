import {Input, Table, Tag} from 'antd';
import "./comm.css"
import {MusicSearchAdapter, MusicDownLoadAdapter} from './platform_params.tsx'
import {useState} from 'react'

const {Search} = Input


const MusicSearchComponent = () => {
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width:150,
        },
        {
            title: 'platform',
            dataIndex: 'platform',
        },
        {
            title: 'music_id',
            dataIndex: 'music_id',
        },
        {
            title: 'author',
            dataIndex: 'author',
        },
        {
            title: "music_name",
            dataIndex: "music_name",
        },
        {
            title: "file_name",
            dataIndex: "file_name",
        },
        {
            width:100,
            title: '下载',
            dataIndex: '下载',
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
    ];

    const [searchData, setSearchData] = useState([])

    const Submit = (data) => {
        console.log(data)
        MusicSearchAdapter(data).then(res=>{
            // console.log(res)
            setSearchData(res)
        })
    }
    return (
        <div style={{}}>

            <div style={{display: "flex", top: 50,}}>
                <span style={{width: 50, justifyContent: 'center', alignContent: 'center'}}>url:</span>
                <Search key='1' enterButton="搜索" onSearch={Submit}/>
            </div>

            <div style={{marginTop: 20,}}>
                {searchData.length !== 0 ? (
                    <Table
                        columns={columns}
                        pagination={{pageSize:100}}
                        dataSource={searchData}
                        scroll={{ y: 360 }}
                        rowKey="id"
                        expandable={{
                            // expandedRowClassName: () => "abc",
                        }}
                    />
                ) : (
                    <div></div>
                )}
            </div>

        </div>
    )
}

export default MusicSearchComponent