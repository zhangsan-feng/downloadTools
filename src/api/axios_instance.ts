import axios from "axios";
import {stringify} from 'qs'

export const HttpServerAddress = "http://127.0.0.1:54435"

const instance = axios.create({
    baseURL: HttpServerAddress,
    timeout: 5000,
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
            }
            return Promise.reject(error.response);
        }
    }
)

export async function HttpGet(url, params){
    return new Promise((resolve, reject) => {

        instance.get(url ,{params:stringify(params)})
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error.data)
            })
    })
}

const JsonHeaders = {
    'Content-Type': 'application/json;encoding=utf-8',
}

export async function HttpPost(url, params){
    return new Promise((resolve, reject) => {
        instance.post(url,params, {headers:JsonHeaders})
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error.data)
            })
    })
}
const FromHeaders = {
    'Content-Type': 'application/json;encoding=utf-8',
}

export async function HttpPostForm(){}
export async function HttpPut(){}
export async function HttpDelete(){}
export async function DownloadFile(){}
export async function UploadFile(){}


