import {Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {StopDownloadTaskApi, DownloadRecordQueryApi} from '../api/axios_http.ts'


const DownloadRecord = ()=>{

    const columns = [
        {title: 'id', dataIndex: 'id',},
        {title: 'platform', dataIndex: 'platform',},
        {title: 'source', dataIndex: 'source',  ellipsis: true},
        {

            title: 'status',
            dataIndex: 'status',
            render: (data, src) => {
                // console.log(data)
                if (data === "finish"){
                    return  <Tag color="#87d068">下载完成</Tag>
                }
                if (data === "failed"){
                    return  <Tag color="#f50">下载失败</Tag>
                }
                if (data === "running"){
                    return <Tag color="#108ee9">运行中</Tag>
                }
                if (data === "stop"){
                    return <Tag color="#2db7f5">停止</Tag>
                }

            }
        },
        {
            title: '操作',
            dataIndex: '操作',
            render: (_, src) => {
                // console.log(src)
                if (src.status === "running") {
                    return <a onClick={()=>{
                        StopDownloadTaskApi({"id":src.id}).then(res=>{}).catch(err=>{})
                    }}>停止</a>
                }
                // if (src.task_status === "failed") {
                //     return <a>重试</a>
                // }
                // if (src.task_status === "fished") {
                //     return <a>删除</a>
                // }
            },
        },
    ];

    const [TableData, setTableData] = useState([])
    useEffect(()=>{
        DownloadRecordQueryApi({}).then(res=>{
            console.log(res)
            setTableData(res.data)
        })
    }, [])

    setTimeout(()=>{
        DownloadRecordQueryApi({}).then(res=>{
            console.log(res)
            setTableData(res.data)
        })
    }, 2000)

    return(
        <div>
            {TableData.length !== 0 ? (
                <Table columns={columns} dataSource={TableData}  scroll={{ y: "68vh" }} rowKey="id"
                       expandable={{
                           expandedRowRender: (record) => {
                                const items = []
                               for (const itemsKey in record.children_element) {
                                   items.push(<div key={itemsKey}>{record.children_element[itemsKey].file_name}</div>)
                               }
                               return <div>{items}</div>
                           },
                       }}
                />
            ) : (<div></div>)}

        </div>
    )

}


export default DownloadRecord