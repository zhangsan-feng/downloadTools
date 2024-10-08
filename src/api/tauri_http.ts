import {} from '@tauri-apps/api'
import {fetch }  from "@tauri-apps/plugin-http"
import {stringify} from 'qs'


export async function HttPGet(url, params, headers){
    try {
        return await fetch(url + stringify(params), {headers:headers,})
    }catch (err){
        console.log(err)
    }
}

export async function HttpGetText(){}
export async function HttpGetNoRedirect(){}
export async function HttpPostForm(){}
export async function HttpPostJson(){}
