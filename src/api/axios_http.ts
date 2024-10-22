import {HttpGet , HttpPost} from './axios_instance.ts'
import exp = require("node:constants");

const HttpRouterMatchV1 = "/v1/web_api"
const HttpRouterUrl = `${HttpRouterMatchV1}`


export type ProxyParams = {
    req_url:string;
    req_type:string;
    req_headers:any;
    req_params:any;

}

export const ProxyApi = (params:ProxyParams)=> HttpPost(`${HttpRouterUrl}/proxy`, params);


export type ResourceParams = {
    id:bigint,
    req_headers:any;
    platform:String,
    download_link:any,
}

export const ResourceDownloadApi = (params:ResourceParams)=> HttpPost(`${HttpRouterUrl}/download_resource`, params);
