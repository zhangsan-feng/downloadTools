import {generateRandomUpperString} from "../../comm.js";
import {DownloadFinishApi, ProxyApi, ResourceDownloadApi,} from "../../../api/axios_http.js";


function a(t) {
    t = String(t);
    var e, i = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
    "undefined" == typeof e && (e = 0);
    var a = 0
        , o = 0;
    e ^= -1;
    for (var n = 0, s = t.length; n < s; n++)
        o = 255 & (e ^ t.charCodeAt(n)),
            a = "0x" + i.substr(9 * o, 8),
            e = e >>> 8 ^ a;
    return -1 ^ e
}

function image_link(t) {
    var e, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "large", o = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
    if ("undefined" == typeof i && (i = "large"),
    "undefined" == typeof o && (o = !1),
    "w" == t[9] || "y" == t[9] && t.length >= 32) {
        var n = 1 + (3 & a(t))
            , s = "g" == t[21] ? "gif" : "jpg";
        e = o ? "w" == t[9] ? "https://ww" + n + ".sinaimg.cn/" + i + "/" + t + "." + s : "https://wx" + n + ".sinaimg.cn/" + i + "/" + t + "." + s : "w" == t[9] ? "http://ww" + n + ".sinaimg.cn/" + i + "/" + t + "." + s : "http://wx" + n + ".sinaimg.cn/" + i + "/" + t + "." + s
    } else {
        var r = 1 + (15 & parseInt(t.substr(-2, 2), 16));
        e = o ? "https://ss" + r + ".sinaimg.cn/" + i + "/" + t + "&690" : "http://ss" + r + ".sinaimg.cn/" + i + "/" + t + "&690"
    }
    return e
}


export async function WeiBoUserImage(source, config){

    const request_url = "https://weibo.com/ajax/profile/getImageWall"
    let uid = source.download_link.split("?")[0].replace("https://weibo.com/u/", "")
    const request_headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'client-version': 'v2.46.33',
        'cookie': config['weibo'].cookie,
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': source.download_link,
        'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'server-version': 'v2024.11.13.2',
        'user-agent': navigator.userAgent,
        'x-requested-with': 'XMLHttpRequest',
        'x-xsrf-token': generateRandomUpperString(24),
    }

    let sinceid = 0
    for (;;){
        let request_params ={
            "sinceid": sinceid,  // page
            "uid": uid,
            "has_album":true,
        }
        // console.log(params)

        const proxy_params = {
            req_url:request_url,
            req_type:"GET",
            req_params:request_params,
            req_headers:request_headers
        }
        // console.log(proxy_params)
        let {response_body} = await ProxyApi(proxy_params)
        response_body  = JSON.parse(response_body)
        // console.log(response_body)

        const data_list = response_body.data.list
        sinceid = response_body.data.since_id
        if (data_list.length === 0 || sinceid == 0) {
            break
        }

        let download_data = {}
        data_list.forEach((value)=>{
            download_data[value.pid + ".png"] = image_link(value.pid)
            // console.log(image_link(value.pid))
        })
        // console.log(image_list)


        const resource_params = {
            id:source.id,
            platform:"weibo",
            source:source.download_link,
            req_headers:request_headers,
            download_link:download_data
        }
        // console.log(resource_params)
        const {data} = await ResourceDownloadApi(resource_params)
        if (data === "stop"){
            break
        }
    }

    await DownloadFinishApi({"id":source.id})

}