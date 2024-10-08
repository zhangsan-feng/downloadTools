import {HttpGet,HttpServerAddress } from './axios_instance.ts'
const HttpRouterMatchV1 = ""
const HttpRouterUrl = `${HttpServerAddress}${HttpRouterMatchV1}`


export const PingBaidu = (params)=> HttpGet(`${HttpRouterUrl}`, params);