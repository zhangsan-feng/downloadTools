import {HttpGet , HttpPost} from './axios_instance.ts'

const HttpRouterMatchV1 = "/v1/web_api"
const HttpRouterUrl = `${HttpRouterMatchV1}`


export type ProxyParams = {
    req_url:string,
    req_type:string,
    req_headers:any,
    req_params:any,

}

export const ProxyApi = (params:ProxyParams)=> HttpPost(`${HttpRouterUrl}/proxy`, params);
