

export function word_analysis(text){
    text = text.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "")
    if (text.length > 35){
        return text.slice(0, 35);
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
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let result = ""
    result = yyyy + '_' + mm + '_' + dd + "_" + String(today.getHours()) + "_" + String(today.getMinutes()) + "_" + String(today.getSeconds())
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




let headers = {

    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'Origin': '',
    'Referer': '',
    'Cookie': '',
    'User-Agent': navigator.userAgent,
}

const PlatFormTypes = {
    DouYin = "douyin"
}

