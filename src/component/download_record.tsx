import {Table, Tag} from "antd";
import {useState} from "react";


const DownloadRecord = ()=>{

    const columns = [
        {
            title: '',
            dataIndex: '',
        },
        {
            width:150,
            title: '',
            dataIndex: '',
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
            width:150,
            title: '操作',
            dataIndex: '操作',
            render: (_, src) => {
                // console.log(src)
                if (src.task_status === "running") {
                    return <a onClick={()=>{

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
        // {
        //     width:200,
        //     title: '',
        //     dataIndex: '',
        //     render: (data) => <DownloadRecord data={data.children}/>,
        // },
    ];

    const [TableData, setTableData] = useState([])


    return(
        <div>
            <Table columns={columns} dataSource={TableData}  scroll={{y:400}} rowKey="id"
                   expandable={{expandedRowClassName:()=>{
                           return "abc"
                       }}}
            />
        </div>
    )

}


export default DownloadRecord