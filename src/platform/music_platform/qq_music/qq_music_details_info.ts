import {stringify} from 'Qs'
import {ProxyApi, ProxyParams} from "../../../api/axios_http.ts";


async function QQMusicDetailsInfoForHtml() {
}


async function QQMusicDetailsInfoForApi(source, config) {
    let request_url = "https://u6.y.qq.com/cgi-bin/musics.fcg"

    const request_headers = {
        'accept': 'application/json',
        'accept-language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en-US;q=0.7,en;q=0.6',
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'ptcz=34cb3ecb6d2f51f14587dd805037dec00eb82cf3335883fc5a7775fe3bb044dc; pgv_pvid=3353637715; fqm_pvqid=fc5e6e25-fdf1-416d-b825-826b1b94c192; ts_uid=1440278204; _qpsvr_localtk=0.8856104602433224; RK=8G9BKapmNQ; fqm_sessionid=0568665c-f0b5-423a-b2a9-ae15fb4cce90; pgv_info=ssid=s6014686494; login_type=1; psrf_qqunionid=63B56D3F9BB7682DDB8430FF7CF6B8C1; euin=oKnP7wos7eCk7v**; wxunionid=; uin=1046364655; qm_keyst=Q_H_L_63k3Nz0qjyHMtVutEZ6rL-LfhZYdZpXeFmMtEkHEfeT5BHAGokhKUFeyUuV_lAyIBIcmyaItwAHExdNMPdfJ66w; psrf_qqopenid=9304FD9E7280324E4FCBD111DA0EEC22; wxopenid=; tmeLoginType=2; psrf_musickey_createtime=1729839647; psrf_qqaccess_token=3D953243AC89E073E33F50F635C42F50; qqmusic_key=Q_H_L_63k3Nz0qjyHMtVutEZ6rL-LfhZYdZpXeFmMtEkHEfeT5BHAGokhKUFeyUuV_lAyIBIcmyaItwAHExdNMPdfJ66w; psrf_access_token_expiresAt=1737615647; music_ignore_pskey=202306271436Hn@vBj; psrf_qqrefresh_token=7E15FED37BAF713B9324DF9ED46A9E64; wxrefresh_token=; ts_last=y.qq.com/n/ryqq/player',
        'origin': 'https://y.qq.com',
        'priority': 'u=1, i',
        'referer': 'https://y.qq.com/',
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    }
    const clienttime = Date.now();
    const url_params = {
        '_': clienttime,
        'sign': 'zzc6e961afgjdsdd0pvxmmcgtt2fzzt74ehg1b58f1ef',
    }

    const request_params = {
        "comm": {
            "cv": 4747474,
            "ct": 24,
            "format": "json",
            "inCharset": "utf-8",
            "outCharset": "utf-8",
            "notice": 0,
            "platform": "yqq.json",
            "needNewCode": 1,
            "uin": 1046364655,
            "g_tk_new_20200303": 421216218,
            "g_tk": 421216218
        },
        "req_1": {
            "module": "music.musichallSong.PlayLyricInfo",
            "method": "GetPlayLyricInfo",
            "param": {"songMID": "000E7Dq93qVuiA", "songID": 509827164}
        },
        "req_2": {
            "method": "GetCommentCount",
            "module": "music.globalComment.GlobalCommentRead",
            "param": {"request_list": [{"biz_type": 1, "biz_id": "509827164", "biz_sub_type": 0}]}
        },
        "req_3": {
            "module": "music.musichallAlbum.AlbumInfoServer",
            "method": "GetAlbumDetail",
            "param": {"albumMid": "0047eXB02SCbIZ"}
        },
        "req_4": {
            "module": "music.vip.PayAlertSvr",
            "method": "GetPayAlertH5",
            "param": {"clientType": "h5", "scenes": ["yqq_p", "yqq_p_u"]}
        },
        "req_5": {
            "module": "music.vkey.GetVkey",
            "method": "GetUrl",
            "param": {
                "guid": "508411151",
                "songmid": ["000E7Dq93qVuiA"],
                "songtype": [0],
                "uin": "1046364655",
                "loginflag": 1,
                "platform": "20",
                "filename": ["RS02062SZQ7O3fpORT.mp3"]
            }
        }
    }
    request_url = request_url + "?" + stringify(url_params)
    const proxy_params: ProxyParams = {
        req_url: request_url,
        req_type: "POST",
        req_params: JSON.stringify(request_params),
        req_headers: request_headers
    }
    console.log(proxy_params)
    const response = await ProxyApi(proxy_params)
    // const response_header = response.headers
    const response_body = JSON.parse(response.body)
    console.log(response_body)

}


export async function QQMusicDetailsInfo(source, config) {
    return await QQMusicDetailsInfoForApi(source, config)
}