import { Input} from 'antd';
import "./comm.css"
import {MusicSearchAdapter} from './platform_params.tsx'
import {useState} from 'react'

const {Search} = Input


const MusicSearchComponent = () => {
    const [searchData, setSearchData] = useState([])

    const MusicSearch = (data) => {
        console.log(data)
        MusicSearchAdapter(data).then(res=>{})
    }
    return (
        <div style={{}}>

            <div style={{display: "flex", top: 50,}}>
                <Search key='1' enterButton="搜索" onSearch={MusicSearch}/>
            </div>

            <div style={{marginTop: 20, backgroundColor:"black", maxHeight:'450px', overflow:'auto'}}>

            </div>

        </div>
    )
}

export default MusicSearchComponent