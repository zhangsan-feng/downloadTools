import {Input, Button, Table, Modal, message, Tag, InputNumber, Checkbox} from 'antd';
import PlatFormParams from "./platform_params.tsx";
import {useState} from "react";
import "./comm.css"
import {invoke} from "@tauri-apps/api";

const {TextArea}  = Input


const columns = [
    {
        title: 'task_name',
        dataIndex: 'task_name',
    },
    {
        width:150,
        title: 'task_status',
        dataIndex: 'task_status',
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
                    invoke("task_stop",{'taskName':src.task_name}).then()
                    console.log(src.task_name)
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

const DownloadVideo = ()=>{
    const [TableData, setTableData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    setTimeout(()=>{
        invoke("task_query_all",{}).then(res=>{
            let res_data = JSON.parse(res).data
            // console.log(res_data)
            if (res_data !== "[]"){
                setTableData(res_data)
            }
        })
    },3000)



    const Submit = () => {
        let url = document.getElementById("url").value
        PlatFormParams(url).then(res=>{})
        message.success({content:"开始下载"}).then()
    }
    const CheckboxChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const InputNumberChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };


    return (
        <div >
            <div>

                <Button type="primary" onClick={showModal}>
                    下载
                </Button>
                <Modal maskClosable={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]} width={1400}>
                    <div style={{display: "flex", marginTop:30, }}>
                        <span style={{width: 50, justifyContent: 'center', alignContent: 'center'}}>url:</span>
                        <TextArea id="url" style={{resize:"none",height:200}}/>
                    </div>
                    <div style={{marginTop: 10, marginLeft: 50}}>
                        <p>开发中</p>
                        <Checkbox onChange={CheckboxChange}>仅下载视频</Checkbox>
                        <Checkbox onChange={CheckboxChange}>仅下载图片</Checkbox>
                    </div>
                    <div style={{marginTop: 20, marginLeft: "30%",}}>
                        <Button style={{marginLeft: 10, width: 200}} type='primary' onClick={Submit}>下载视频/直播</Button>
                        <Button style={{marginLeft: 10, width: 200}} type='primary' >下载评论</Button>
                    </div>
                </Modal>


                <div style={{marginTop:10}}>
                    <Table columns={columns} dataSource={TableData}  scroll={{y:400}} rowKey="id"
                           expandable={{expandedRowClassName:(record, index, indent)=>{
                                return "abc"
                               }}}
                    />
                </div>

            </div>
        </div>
    )
}

export default DownloadVideo