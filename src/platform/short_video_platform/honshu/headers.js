
let headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9,zh-TW;q=0.8,en-US;q=0.7,en;q=0.6",
    "content-type": "application/json;charset=UTF-8",
    "origin": "https://www.xiaohongshu.com",
    "priority": "u=1, i",
    "referer": "https://www.xiaohongshu.com/",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    'User-Agent': navigator.userAgent,
}

export {headers}


export function GetCookieA1(h){
    let a1 = ""
    let cookies = h.split(';')
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].indexOf('a1=') !== -1) {
            a1 = cookies[i].split('=')[1]
        }
    }
    return "a1=" + a1 + "; "
}