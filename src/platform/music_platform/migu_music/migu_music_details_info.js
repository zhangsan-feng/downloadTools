import {stringify} from 'qs'


export async function MiGuMusicDetailsInfo(source, config){
    const request_headers = {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        'Accept-Encoding': 'gzip,deflate,sdch',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Connection': 'keep-alive',
        'Accept-Charset': 'UTF-8,*;q=0.5',
        'Accept-Language': 'en-US,en;q=0.8',
        'referer': 'http://music.migu.cn/'
    }
    const request_url = "http://app.pd.nf.migu.cn/MIGUM2.0/v1.0/content/sub/listenSong.do?"
    const toneFlag = source.rateFormats
    const request_params = {
        "toneFlag": toneFlag[toneFlag.length - 1].resourceType,
        "netType": "00",
        "userId": "15548614588710179085069",
        "ua": "Android_migu",
        "version": 5.1,
        "copyrightId": 0,
        "contentId": source.contentId,
        "resourceType": source.resourceType,
        "channel": 0
    }
    const response_body =  request_url + stringify(request_params)

    return {"response_body":response_body, "request_headers":request_headers}

}


// http://app.pd.nf.migu.cn/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=E&netType=00&userId=15548614588710179085069&ua=Android_migu&version=5.1&copyrightId=0&contentId=600929000002163892&channel=0
// http://app.pd.nf.migu.cn/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=E&netType=00&userId=15548614588710179085069&ua=Android_migu&version=5.1&copyrightId=0&contentId=600929000002060886&channel=0