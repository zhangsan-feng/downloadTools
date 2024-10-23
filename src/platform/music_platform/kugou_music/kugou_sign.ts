
import CryptoJS from 'crypto-js';

export function GetCookieMid(cookie){
    const cookiesArray = cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        const cookiePair = cookiesArray[i].split('=');
        if (cookiePair[0].trim() === 'kg_mid') {
            return cookiePair[1]
        }
    }
}
export function GetCookieDFid(cookie){
    const cookiesArray = cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        const cookiePair = cookiesArray[i].split('=');
        if (cookiePair[0].trim() === 'kg_dfid') {
            return cookiePair[1]
        }
    }
}

export function GenDetailsSignature(cookie, clienttime, music_id){
    const params = [
        "NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt",
        "appid=1014",
        "clienttime=" + clienttime,
        "clientver=20000",
        "dfid=" + GetCookieDFid(cookie),
        "encode_album_audio_id=" + music_id,
        "mid=" + GetCookieMid(cookie),
        "platid=4",
        "srcappid=2919",
        "token=",
        "userid=0",
        "uuid=" + GetCookieMid(cookie),
        "NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt"
    ]
    const signature =  CryptoJS.MD5(params.join("")).toString(CryptoJS.enc.Hex);
    // console.log(signature)

    return signature
}


export function GenSearchSignature(cookie, clienttime, keyword){

    const params = [
        "NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt",
        "appid=1014",
        "bitrate=0",
        "callback=callback123",
        "clienttime=" + clienttime,
        "clientver=1000",
        "dfid=" + GetCookieDFid(cookie),
        "filter=10",
        "inputtype=0",
        "iscorrection=1",
        "isfuzzy=0",
        "keyword=" + keyword,
        "mid=" + GetCookieMid(cookie),
        "page=1",
        "pagesize=30",
        "platform=WebFilter",
        "privilege_filter=0",
        "srcappid=2919",
        "token=",
        "userid=0",
        "uuid=" + GetCookieMid(cookie),
        "NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt"
    ]

    const signature =  CryptoJS.MD5(params.join("")).toString(CryptoJS.enc.Hex);
    // console.log(signature)

    return signature
}