

export function word_analysis(text){
    text = text.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "")
    if (text.length > 15){
        return text.slice(0, 15);
    }
    return text
}

export function match_url(text){
    if (!text){
        throw ""
    }
    const regex = /https?:\/\/[^\s]+/;
    return text.match(regex)[0];
}

export function GetTime(){
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    let result = ""
    result = yyyy + '_' + mm + '_' + dd + "_" +
        String(today.getHours()) +
        "_" + String(today.getMinutes()) +
        "_" + String(today.getSeconds()) +
        "_" + String(today.getMilliseconds())
    return result
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sleep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, generateRandomNumber(3000, 6000));
    });
}


export function ScriptHandler() {
    let scriptElement;

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            scriptElement = document.createElement('script');
            scriptElement.src = src;
            scriptElement.onload = () => {
                console.log('Script loaded successfully');
                resolve();
            };
            scriptElement.onerror = () => {
                console.error('Script failed');
                reject(new Error(`Script load error for ${src}`));
            };
            document.body.appendChild(scriptElement);
        });
    }

    function removeScript() {
        if (scriptElement && document.body.contains(scriptElement)) {
            document.body.removeChild(scriptElement);
        } else {
            console.error('remove script error');
        }
    }

    return {
        loadScript,
        removeScript
    };
}


export function GetCookieKey(cookie, key){
    const cookiesArray = cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        const cookiePair = cookiesArray[i].split('=');
        if (cookiePair[0].trim() === key) {
            return cookiePair[1]
        }
    }
}

export function GetUrlParams(url, key){
    let call_back = ""
    let url_split = url.split("?")
    url_split[1].split("&").forEach((value, index) => {
        if (value.includes(key)) {
            call_back =  value.split("=")[1]
        }
    })
    return call_back
}

export function RandomNumber(maxLength) {

    let result = '';
    for (let i = 0; i < maxLength; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}

export function generateRandomString(length) {
    var result = '';
    var characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function generateRandomUpperString(length) {
    var result = '';
    var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function findJsonKey(json, keyToFind) {
    function recursiveSearch(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key === keyToFind) {
                    return obj[key];
                }
                if (typeof obj[key] === 'object') {
                    const result = recursiveSearch(obj[key]);
                    if (result !== undefined) {
                        return result;
                    }
                }
            }
        }
        return undefined;
    }

    return recursiveSearch(json);
}



const PlatFormTypes = {
    DouYin : "douyin"
}

/*

    const proxy_params = {
        req_url:request_url,
        req_type:"GET",
        req_params:request_params,
        req_headers:request_headers
    }
    // console.log(proxy_params)
        let {response_headers, response_body} = await ProxyApi(proxy_params)
        response_body = JSON.parse(response_body)
        console.log(response_headers)
        console.log(response_body)




    const resource_params = {
        id:source.id,
        platform:"kuwo_music",
         source:source.download_link,
        req_headers:request_headers,
        download_link: { [source.file_name]: mp3_link }
    }
    // console.log(resource_params)
    await ResourceDownloadApi(resource_params)
    await DownloadFinishApi({"id":source.id})


*/