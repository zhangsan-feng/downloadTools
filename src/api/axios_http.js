import {HttpGet , HttpPost} from './axios_instance.js'

const HttpRouterMatchV1 = "/v1/web_api"
const HttpRouterUrl = `${HttpRouterMatchV1}`


// export type ProxyApiParams = {
//     req_url:any;
//     req_type:any;
//     req_headers:any;
//     req_params:any;
//
// }
export const ProxyApi = (params)=> HttpPost(`${HttpRouterUrl}/proxy`, params);

// ResourceDownloadApiParams  = {
//     id:any,
//     req_headers:any;
//     nickname:any
//     platform:any,
//     source:any,
//     download_link:any,
// }
export const ResourceDownloadApi = (params)=> HttpPost(`${HttpRouterUrl}/download_resource`, params);
export const StreamDownloadApi = (params)=> HttpPost(`${HttpRouterUrl}/download_stream`, params);

export const PlatFormConfigQueryAPi = (params) => HttpGet(`${HttpRouterUrl}/platform_config_query`, params)
export const PlatFormConfigUpdateAPi = (params) => HttpPost(`${HttpRouterUrl}/platform_config_update`, params)



// export type FfmpegParams = {
//     id:any,
//     platform:any,
//     audio_file_name:any,
//     video_file_name:any,
//     merge_file_name:any,
// }
export const FfmpegCompositeVideoApi = (params) => HttpPost(`${HttpRouterUrl}/ffmpeg_composite_video`, params)
export const StopDownloadTaskApi = (params) => HttpPost(`${HttpRouterUrl}/stop_download_task`, params)
export const DownloadFinishApi  = (params) => HttpPost(`${HttpRouterUrl}/download_finish`, params)

export const DownloadRecordQueryApi  = (params) => HttpGet(`${HttpRouterUrl}/download_record_query`, params)
