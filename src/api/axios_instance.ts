import axios from "axios";
import {stringify} from 'qs'


export const HttpServerAddress = "https://wwww.baidu.com"

const instance = axios.create({
    timeout:5000
})


instance.interceptors.request.use(
    config => {
        // config.headers.Authorization =  localStorage.getItem("token")
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if(error.response.status){
            switch(error.response.status) {

                case 401:
                    console.log(error.response)
                case 403:
                    console.log(error.response)
                case 404:
                    console.log(error.response)
                default:
                    console.log(error.response)
                    break
            }
            return Promise.reject(error.response);
        }
    }
)

export async function HttpGet(url, url_params){
    return new Promise((resolve, reject) => {

        instance.get(url + stringify(url_params),{})
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error.data)
            })
    })
}

export async function HttpPost(url, params){
    return new Promise((resolve, reject) => {
        instance.post(url,{data:params})
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error.data)
            })
    })
}
export async function HttpPostForm(url, params){
    return new Promise((resolve, reject) => {
        instance.postForm(url,{data:params})
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error.data)
            })
    })
}

export async function HttpPut(){}
export async function HttpDelete(){}
export async function DownloadFile(){}
export async function UploadFile(){}


