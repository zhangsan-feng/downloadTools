var encrypt_lookup = [
    "Z",
    "m",
    "s",
    "e",
    "r",
    "b",
    "B",
    "o",
    "H",
    "Q",
    "t",
    "N",
    "P",
    "+",
    "w",
    "O",
    "c",
    "z",
    "a",
    "/",
    "L",
    "p",
    "n",
    "g",
    "G",
    "8",
    "y",
    "J",
    "q",
    "4",
    "2",
    "K",
    "W",
    "Y",
    "j",
    "0",
    "D",
    "S",
    "f",
    "d",
    "i",
    "k",
    "x",
    "3",
    "V",
    "T",
    "1",
    "6",
    "I",
    "l",
    "U",
    "A",
    "F",
    "M",
    "9",
    "7",
    "h",
    "E",
    "C",
    "v",
    "u",
    "R",
    "X",
    "5"
];

function encrypt_tripletToBase64(t) {
    var e = 11
        , r = 15
        , n = 199
        , o = 34
        , i = 4
        , a = 102
        , u = 276
        , s = 205
        , c = 218
        , l = 11
        , f = 115
        , p = 34
        , h = 161
        , d = 123
        , v = 335
        , g = {};
    function m(t, e) {
        return a0_0x10f4ac(e, t - v)
    }
    g[m(205, 328)] = function (t, e) {
        return t + e
    }
        ,
        g[m(e, 53)] = function (t, e) {
            return t >> e
        }
        ,
        g[m(r, n)] = function (t, e) {
            return t & e
        }
        ,
        g[m(o, i)] = function (t, e) {
            return t >> e
        }
        ,
        g[m(-a, -u)] = function (t, e) {
            return t & e
        }
    ;
    var y = g;
    return y[m(s, c)](encrypt_lookup[63 & y[m(l, -75)](t, 18)], encrypt_lookup[y[m(r, f)](y[m(p, h)](t, 12), 63)]) + encrypt_lookup[t >> 6 & 63] + encrypt_lookup[y[m(-a, -d)](t, 63)]
}

function encrypt_encodeChunk(t, e, r) {
    var n, o = 165, i = 246, a = 205, u = 353, s = 162, c = 17, l = 351, f = 191, p = 139, h = 79, d = 86, v = 233, g = 270, m = 166, y = {
        hwomB: function (t, e) {
            return t < e
        },
        iHUeL: function (t, e) {
            return t & e
        },
        ELxEv: function (t, e) {
            return t << e
        },
        lBuRH: function (t, e) {
            return t << e
        },
        SkIJl: function (t, e) {
            return t & e
        },
        JYxWY: function (t, e) {
            return t + e
        },
        CxjtF: function (t, e) {
            return t(e)
        }
    }, w = [];
    function b(t, e) {
        return a0_0x10f4ac(t, e - m)
    }
    for (var _ = e; y[b(-63, -o)](_, r); _ += 3)
        n = y[b(-i, -a)](y[b(-166, -124)](t[_], 16), 16711680) + y[b(-u, -205)](y[b(s, -c)](t[_ + 1], 8), 65280) + y[b(-l, -208)](t[y[b(-350, -f)](_, 2)], 255),
            w[b(p, 73)](y[b(h, d)](encrypt_tripletToBase64, n));
    return w[b(-v, -g)]("")
}

function a0_0x3693(t, e) {
    var r = [
        "xUKNL",
        "jUrZI",
        "rviFu",
        "join",
        "get",
        "LjDtD",
        "ZJHyP",
        "wOmGY",
        "enumera",
        "aONWR",
        "string",
        "kQpMi",
        "mZPJZ",
        "Ysiay",
        "czxKn",
        "|5|6|4|",
        "prototy",
        "jklmnop",
        "MuYbw",
        "diDwk",
        "TRFtx",
        "drDHI",
        "WLARA",
        "xyz0123",
        "asBytes",
        "|6|0|1|",
        "JOtEi",
        "Oialn",
        "OQrEi",
        "uPnXq",
        "VWXYZab",
        "cIbFa",
        "qYuta",
        "QDOZZ",
        "MahgM",
        "iRXZq",
        "22098XlFGYn",
        "mmLKn",
        "jMcIE",
        "stringi",
        "[object",
        "nYqUQ",
        "jSgjk",
        "ucyEo",
        "iewJI",
        "vgTwl",
        "DnNGR",
        "oBytes",
        "Xtwzk",
        "aqlTy",
        "JWnPK",
        "1|0|2|4",
        "qrstuvw",
        "_gg",
        "QLthP",
        "FJIWy",
        "yRnhISG",
        "pjUsr",
        "KAwuh",
        "Thhoa",
        "jarkJ",
        "WjRNN",
        "asStrin",
        "x3VT16I",
        "357835LaQWjW",
        "SkIJl",
        "size",
        "iyorr",
        "iHUeL",
        "tTanW",
        "tNusJ",
        "NiSrP",
        "eAt",
        "TCArD",
        "a2r1ZQo",
        "iamspam",
        "bOnfu",
        "UNSKg",
        "HIJKLMN",
        "ZfMKC",
        "bJhXU",
        "zwAAc",
        "JYxWY",
        "lUAFM97",
        "mwaRe",
        "EzYWD",
        "replace",
        "uOtUJ",
        "__esMod",
        "ViQWI",
        "aCMFL",
        "EAKSd",
        "ule",
        "pqnFP",
        "qYDsL",
        "270726pnaYfG",
        "glBZG",
        "OwjMq",
        "YGrjc",
        "ZhAcd",
        "JDqFL",
        "456789+",
        "kEjQs",
        "lWhbD",
        "OaLTI",
        "dXlgm",
        "cVte9UJ",
        "ctor",
        "hwomB",
        "wDtJz",
        "constru",
        "ABHuC",
        "zDETq",
        "SYNeA",
        "BGbij",
        "ionFq",
        "QzaNS",
        "7|3|5|4",
        "YlZGp",
        "Bjniw",
        "ZITuN",
        "KPTzH",
        "HrBeq",
        "xobsT",
        "kXJkC",
        "QSrEZ",
        "ENXtO",
        "FYbRJ",
        "wOcza/L",
        "_hh",
        "dVXMb",
        "ppkua",
        "WgamZ",
        "HuwCW",
        "362424fnLCuh",
        "charCod",
        "HhPqg",
        "ODunI",
        "eJzqq",
        "charAt",
        "JGAgI",
        "ZmserbB",
        "TURcG",
        "WyrqF",
        "iYJzH",
        "VIwfH",
        "tzzOB",
        "YgiCH",
        "byyMQ",
        "ELxEv",
        "0DSfdik",
        "HRihr",
        "_ii",
        "aDsrp",
        "ble",
        "jTGtW",
        "configu",
        "cXiYW",
        "56kSpAsC",
        "158KIldlA",
        "oHQtNP+",
        "BHavO",
        "PCIlh",
        "QatIf",
        "IKyqh",
        "Words",
        "Qwnrg",
        "44lQAgNu",
        "cdefghi",
        "nTwxD",
        "RHteb",
        "coqPr",
        "rJwmI",
        "aBoeK",
        "default",
        "exports",
        "rceYY",
        "isArray",
        "mdKKO",
        "kzxWE",
        "DeBtm",
        "tjjUn",
        "vJEcD",
        "LpfE8xz",
        "bin",
        "HKazo",
        "rable",
        "call",
        "wordsTo",
        "zBiyt",
        "GrsGL",
        "fqulF",
        "jevwl",
        "mxfLj",
        "xlUnt",
        "q42KWYj",
        "endian",
        "eEqDc",
        "oyGAZ",
        "bytesTo",
        "OzjuJ",
        "IfwWq",
        "ize",
        "6648810piiNEz",
        "lTHdy",
        "vDLZJ",
        "stringT",
        "A4NjFqY",
        "GkjTz",
        "eooJA",
        "substr",
        "veNiI",
        "LYfDp",
        "ljKsP",
        "jJYWG",
        "bcYAf",
        "srikB",
        "utf8",
        "qTbeY",
        "yqRzd",
        "|3|5",
        "bjbAy",
        " Array]",
        "rMbXP",
        "u5wPHsO",
        "test",
        "gMIMC",
        "Deyqv",
        " argume",
        "ABCDEFG",
        "undefin",
        "split",
        "QTlsj",
        "_isBuff",
        "OPQRSTU",
        "Illegal",
        "loSen",
        "navigat",
        "ObwNo",
        "qPbcq",
        "7182692QogvXX",
        "tvqSn",
        "DGptJ",
        "HhTfW",
        "avIYx",
        "defineP",
        "PFQbW",
        "CjFyM",
        "toStrin",
        "yMWXS",
        "yMyOy",
        "0XTdDgM",
        "eXkru",
        "_blocks",
        "indexOf",
        "mbBQr",
        "lBuRH",
        "HzGjH",
        "HNErV",
        "mEokX",
        "userAge",
        "UpmtD",
        "sgomx",
        "KDfKS",
        "OTbSq",
        "lxMGW",
        "0|3|2|1",
        "dfWyB",
        "lWzAd",
        "eyXTL",
        "5624qreyZK",
        "pow",
        "IJstz",
        "LMlMB",
        "INlwI",
        "lRulU",
        "TCgZh",
        "_digest",
        "UBhIl",
        "fLtZZ",
        "FYSKq",
        "2|8|0",
        "IoCeZ",
        " Object",
        "UuTvI",
        "lNKLD",
        "String",
        "Bytes",
        "rBVvW",
        "KblCWi+",
        "pRaIH",
        "roperty",
        "vTINI",
        "atLE",
        "functio",
        "Udqoy",
        "nt ",
        "htSWx",
        "hEwRK",
        "encodin",
        "sCSVK",
        "VuAZF",
        "xeIIy",
        "RBjMb",
        "taTrq",
        "vDLFJ",
        "bPkya",
        "HzimH",
        "nCffO",
        "BWbtU",
        "2|8",
        "slice",
        "lxMGQ",
        "tTiwe",
        "JDhJB",
        "rCode",
        "gNDzY",
        "wJkyu",
        "cCZFe",
        "RNGSl",
        "floor",
        "clYIu",
        "vLiwz",
        "BiNSE",
        "MtYWB",
        "fromCha",
        "StNOc",
        "|7|5|3|",
        "9|1|4|6",
        "length",
        "UNYAE",
        "pngG8yJ",
        "hasOwnP",
        "pYeWu",
        "wTjkk",
        "Bvk6/7=",
        "KTmgk",
        "bIGxm",
        "readFlo",
        "LFZch",
        "_ff",
        "1|3|4|2",
        "binary",
        "LLdJZ",
        "ZofOU",
        "6399uFPxTQ",
        "push",
        "YntPT",
        "kSGXO",
        "random",
        "HfpCU",
        "hECvuRX",
        "getTime",
        "iwSyV",
        "alert",
        "LKMcb",
        "DJVdg",
        "Hex",
        "URzKO",
        "CxjtF",
        "ZVOCs",
        "isBuffe",
        "vGpbT",
        "rotl",
        "udFrB",
        "CnbsH",
        "crLST"
    ]
    return r[t -= 131]
}

function a0_0x10f4ac(t, e) {
    return a0_0x3693(e - -570, t)
}

function encrypt_b64Encode(t) {
    var e = 664
        , r = 634
        , n = 448
        , o = 599
        , i = 315
        , a = 416
        , u = 512
        , s = 361
        , c = 406
        , l = 487
        , f = 496
        , p = 333
        , h = 630
        , d = 639
        , v = 548
        , g = 582
        , m = 447
        , y = 468
        , w = 375
        , b = 331
        , _ = 149
        , E = 382
        , x = 265
        , k = 625
        , T = 570
        , S = 551
        , A = 582
        , L = 581
        , I = 638
        , R = 618
        , O = 606
        , C = 429
        , N = 651
        , P = 667
        , B = 817
        , M = 333
        , j = 567
        , F = 747
        , D = 561
        , q = 570
        , U = 676
        , G = 840
        , H = 240
        , V = {
        udFrB: function (t, e) {
            return t % e
        },
        cCZFe: function (t, e) {
            return t === e
        },
        jevwl: function (t, e) {
            return t - e
        },
        aqlTy: function (t, e) {
            return t + e
        },
        rceYY: function (t, e) {
            return t >> e
        },
        OwjMq: function (t, e) {
            return t & e
        },
        kSGXO: function (t, e) {
            return t << e
        },
        veNiI: function (t, e) {
            return t === e
        },
        QLthP: function (t, e) {
            return t + e
        },
        wDtJz: function (t, e) {
            return t + e
        },
        nYqUQ: function (t, e) {
            return t & e
        },
        TCArD: function (t, e) {
            return t << e
        },
        RHteb: function (t, e) {
            return t - e
        },
        mZPJZ: function (t, e) {
            return t < e
        },
        zDETq: function (t, e, r, n) {
            return t(e, r, n)
        },
        YlZGp: function (t, e) {
            return t > e
        }
    };
    function W(t, e) {
        return a0_0x10f4ac(e, t - -H)
    }
    for (var X = (W(-413, -442) + W(-e, -r) + "7")[W(-n, -o)]("|"), z = 0; ;) {
        switch (X[z++]) {
            case "0":
                var Y;
                continue;
            case "1":
                var K = [];
                continue;
            case "2":
                var J = V[W(-i, -a)]($, 3);
                continue;
            case "3":
                var $ = t[W(-350, -u)];
                continue;
            case "4":
                V[W(-s, -c)](J, 1) ? (Y = t[V[W(-l, -f)]($, 1)],
                    K[W(-p, -346)](V[W(-h, -d)](encrypt_lookup[V[W(-503, -v)](Y, 2)] + encrypt_lookup[V[W(-g, -741)](V[W(-331, -m)](Y, 4), 63)], "=="))) : V[W(-y, -w)](J, 2) && (Y = V[W(-b, -_)](t[$ - 2], 8) + t[V[W(-l, -E)]($, 1)],
                    K[W(-333, -x)](V[W(-k, -505)](V[W(-T, -S)](encrypt_lookup[Y >> 10], encrypt_lookup[V[W(-A, -L)](Y >> 4, 63)]) + encrypt_lookup[V[W(-I, -R)](V[W(-O, -C)](Y, 2), 63)], "=")));
                continue;
            case "5":
                var Q = 16383;
                continue;
            case "6":
                for (var Z = 0, tt = V[W(-509, -N)]($, J); V[W(-P, -B)](Z, tt); Z += Q)
                    K[W(-M, -153)](V[W(-j, -F)](encrypt_encodeChunk, t, Z, V[W(-D, -413)](Z + Q, tt) ? tt : V[W(-q, -501)](Z, Q)));
                continue;
            case "7":
                return K[W(-U, -G)]("")
        }
        break
    }
}

function a0_0x3187() {
    var t = ["cVte9UJ", "fFreZ", "9|4|6", "u5wPHsO", "NmHzd", "kjdLG", "XZikN", "2|1|7|3", "utf8", "cIwPz", "DrfgZ", "IaWgo", "sZzcH", "dcesB", "yNZzp", "MIHNh", "KntDq", "YUdbH", "HjXjg", "UTygL", "functio", "NvRJd", "HUiKp", "floor", "userAge", "rable", "replace", "oBytes", "bTOMC", "JUuCu", "atLE", "lsQYt", "pulGy", "MMAru", "LgQdr", "YgbVb", "_gg", "iEEBW", "pNsAd", "8|4|1|0", "Ppvgo", "QMpRp", "KHatL", "BSngt", "AuDMq", "grACJ", "Hex", "get", "YyQZw", "pow", "HIJKLMN", "MZSnn", "wordsTo", "1|6|7|3", "ble", "qNXBi", "_digest", "meFVj", "wEbCs", "QPIos", "HKFjq", "cELjt", "heqXT", "ulHEn", "UmXbx", "rjrdh", "ynfSF", "kCXuO", "QjHZw", "QviDt", "hVxPK", "constru", "enumera", "undefin", "ZdyWy", "default", "readFlo", "LpfE8xz", "PAsCG", "exports", "NPyDV", "IYrds", "FRnrT", "jCBAl", "Bytvx", "BQrIe", "split", "FwkpZ", "hasOwnP", "cBHiw", "XDIAa", "HTbhI", "lGBKM", "_ff", "1796963nERtqW", "fromCha", "MJxTB", "ize", "getTime", " Array]", "IxzzZ", "zUzmv", "eLHws", "Ghehr", "yaFQZ", "HIRsl", "VWXYZab", "bDSep", "VAQTF", "bKSBl", "gVvsH", "WlElm", "oFvSH", "HTNZK", "loEIb", "gDGnO", "boXPz", "RlInH", "doQhz", "kpHbO", "asStrin", "wdttJ", "QgkOW", "cbsFr", "SfOCW", "Bvk6/7=", "a2r1ZQo", "2072050gLyyAh", "EzIzY", "ECBsM", "BCIaf", "String", "6qVuabY", "duywO", "cRntI", "QpJMR", "slice", "wSYvU", "3868110RlvTFm", "iaIAE", " Object", "yXpZF", "0XTdDgM", "456789+", "q42KWYj", "CIeEu", "lUAFM97", "Wzhee", "76624CKEkcW", "FBqsJ", "lmdbI", "gVtNR", "dqmJu", "rCode", "_isBuff", "Nipwo", "AOCeE", "vXMiS", "[object", "vKwMy", "ctor", "Dlizn", "dAIpv", "7|3|0|1", "SXKlb", "GQxVu", "gyTHy", "AzjyA", "zFrCt", "DWqEx", "A4NjFqY", "nwmKP", "LfvWx", "WmVJN", "vxrEG", "hXaJI", "nt ", "TCLnl", "yRnhISG", "ABCDEFG", "TGAGn", "ILcWw", "random", "tGGTM", "eAt", "cBrjj", "prototy", "QmuQH", "WnnLf", "iamspam", "AMAdw", "rqgvK", "configu", "gvKNw", "defineP", "NmKKJ", "call", "isArray", "bbxVr", "kiqkn", "zPKRw", "_ii", "vcCHi", "oHQtNP+", "Bytes", "HGUiB", "6|5", "lmxCi", "YIxFV", "SdYbs", "jGdcc", "okRos", "PtcLL", "wOcza/L", "endian", "asBytes", "0DSfdik", "__esMod", "bin", "push", "qrPZF", "stringT", "XWIbf", "jdvUo", "ahtws", "hlgJW", "JVnkC", "join", "yGtYh", "cBjiw", "ZmserbB", "eBsps", "HbwRK", "JXKKW", "substr", "VkXqD", "QDmkv", "charAt", "_hh", "vRkpJ", "wDgzM", "dsIfX", "bytesTo", "OPQRSTU", "MlRPP", "gRYTT", "bIjFV", "LLhWK", "ESmMQ", "cVYsM", "|3|7|2|", "TpFuI", "ule", "hECvuRX", "sWFod", "x3VT16I", "cdefghi", "eeWFS", "stringi", "GGzog", "tDeGi", "gwShL", "ObUHE", "qrstuvw", "pngG8yJ", "BtgmT", "LIpFV", "QqSLr", "Ffwww", "binary", "length", "KblCWi+", "MKRpi", "ZQUGs", "TBdzR", "FIsGK", "908319ejFkqJ", "encodin", "BmJFQ", "NYRaR", "rotl", "ncaKP", "IMMJB", "XLeby", "HLEyb", "Rwkjh", "lNOEN", "test", "lbjyw", "LJKoG", "alert", "FXAFz", "OvGWY", "EUYgs", "dqbvu", "hgnDd", "OeEDd", "xyz0123", "indexOf", "wUtzy", "isBuffe", "jklmnop", "hARCR", "toStrin", "wUzWo", "hFfvV", " argume", "lFwPP", "waSbO", "bpvUX", "hrOxR", "navigat", "Illegal", "NrnGi", "|5|8|2|", "JiQhi", "FdmLc", "SuTZp", "WyySn", "|5|6|0|", "Words", "21723472HaKGXQ", "KwjDC", "roperty", "NhZvk", "926135aLexnA", "string", "uECHW", "lhOOD", "nGrfp", "IyUTU", "_blocks", "charCod", "gJuwN", "FkXnC", "pMzMm", "HvoSr", "size", "|2|4|5|"];
    return (a0_0x3187 = function() {
            return t
        }
    )()
}

function a0_0x2bbd(t, e) {
    var r = a0_0x3187();
    return (a0_0x2bbd = function(t, e) {
            return r[t -= 316]
        }
    )(t, e)
}

function a0_0x48670c(t, e) {
    return a0_0x2bbd(t - -381, e)
}


function encrypt_encodeUtf8(t) {
    var e = 185
        , r = 410
        , n = 480
        , o = 222
        , i = 194
        , a = 165
        , u = 147
        , s = 290
        , c = 460
        , l = 472
        , f = 497
        , p = 462
        , h = 286
        , d = 209
        , v = 223
        , g = 590
        , m = {
        bIGxm: function (t, e) {
            return t(e)
        },
        MahgM: function (t, e) {
            return t < e
        },
        czxKn: function (t, e) {
            return t === e
        },
        clYIu: function (t, e) {
            return t + e
        }
    }
        , y = m[b(477, 488)](encodeURIComponent, t)
        , w = [];
    function b(t, e) {
        return a0_0x10f4ac(t, e - g)
    }
    for (var _ = 0; m[b(333, e)](_, y[b(r, n)]); _++) {
        var E = y[b(o, 290)](_);
        if (m[b(i, a)](E, "%")) {
            var x = y[b(u, s)](m[b(574, 472)](_, 1)) + y[b(c, 290)](m[b(605, l)](_, 2))
                , k = parseInt(x, 16);
            w[b(592, f)](k),
                _ += 2
        } else
            w[b(p, f)](E[b(217, h) + b(d, v)](0))
    }
    return w
}

let esm_typeof = {}
esm_typeof.A = function (t) {
    return typeof t
}

let encrypt_mcr = function (t) {
    var e = 67
        , r = 15
        , n = 164
        , o = 126
        , i = 137
        , a = 39
        , u = 176
        , s = 72
        , c = 56
        , l = 21
        , f = 35
        , p = 34
        , h = 35
        , d = 18
        , v = 25
        , g = 185
        , m = 1149
        , y = 744
        , w = 1295
        , b = 1248
        , _ = 1310
        , E = 1096
        , x = 1166
        , k = 1095
        , T = 1196
        , S = 1180
        , A = 1039
        , L = 976
        , R = 1347
        , I = 1117
        , O = 1168
        , C = 1233
        , N = 1157
        , P = 1006
        , B = 1122
        , M = 1277
        , j = 1288
        , F = 1271
        , D = 986
        , q = 162
        , U = {};
    function H(t, e) {
        return a0_0x10f4ac(e, t - q)
    }
    U[H(-73, -66)] = function (t, e) {
        return t === e
    }
        ,
        U[H(e, 186)] = function (t, e) {
            return t < e
        }
        ,
        U[H(-r, -n)] = function (t, e) {
            return t ^ e
        }
        ,
        U[H(r, -o)] = function (t, e) {
            return t & e
        }
        ,
        U[H(-i, -a)] = function (t, e) {
            return t < e
        }
        ,
        U[H(-175, -u)] = function (t, e) {
            return t ^ e
        }
        ,
        U[H(-59, s)] = function (t, e) {
            return t ^ e
        }
        ,
        U[H(-c, -l)] = function (t, e) {
            return t >>> e
        }
        ,
        U[H(f, p)] = function (t, e) {
            return t >>> e
        }
    ;
    for (var G, V, W = U, z = 3988292384, X = 256, Y = []; X--; Y[X] = W[H(h, -66)](G, 0))
        for (V = 8,
                 G = X; V--;)
            G = W[H(r, d)](G, 1) ? W[H(35, v)](G, 1) ^ z : W[H(h, g)](G, 1);
    return function (t) {
        function e(t, e) {
            return H(e - 1181, t)
        }
        if (W[e(m, 1108)]((0,
            esm_typeof.A)(t), e(y, 914))) {
            for (var r = 0, n = -1; W[e(w, b)](r, t[e(_, 1233)]); ++r)
                n = W[e(E, x)](Y[W[e(k, T)](n, 255) ^ t[e(S, A) + e(1022, L)](r)], n >>> 8);
            return W[e(R, 1166)](n, -1) ^ z
        }
        for (r = 0,
                 n = -1; W[e(I, 1044)](r, t[e(O, C)]); ++r)
            n = W[e(N, P)](Y[W[e(1229, B)](W[e(M, T)](n, 255), t[r])], W[e(j, 1125)](n, 8));
        return W[e(F, B)](W[e(D, 1122)](n, -1), z)
    }
}();

function sign_common(h) {
    return encrypt_b64Encode(encrypt_encodeUtf8(JSON.stringify(h)))
}
export function get_sign(xs, a1) {

    let x_t = xs['X-t']
    let x_s = xs['X-s']
    let b1 = 'I38rHdgsjopgIvesdVwgIC+oIELmBZ5e3VwXLgFTIxS3bqwErFeexd0ekncAzMFYnqthIhJeSnMDKutRI3KsYorWHPtGrbV0P9WfIi/eWc6eYqtyQApPI37ekmR1QL+5Ii6sdnoeSfqYHqwl2qt5B0DoIvMzOZQqZVw7IxOeTqwr4qtiIkrOIi/skccxICLdI3Oe0utl2ADZsLveDSKsSPw5IEvsiutJOqw8BVwfPpdeTDWOIx4VIiu6ZPwbPut5IvlaLbgs3qtxIxes1VwHIkumIkIyejgsY/WTge7sjutKrZgedWI9gfKeYWZGI36eWPwyIEJefut0ocVAPBLLI3Aeiqt3cZ7sVom4IESyIhEqQd4AICY24F4gIiifpVwAICZVJo3sWWJs1qwiIvdef97e0ekKIi/e1piS8qwUIE7s1fds6WAeiVwqed5sdut3IxILbd6sdqtDbgKs0PwgIv8aI3z5rqwGBVtwzfTsKD7sdBdskut+Iioed/As1SiiIkKs0F6s3nVuIkge1Pt0IkVkwPwwNVtMI3/e1qtdIkKs1VwVIEesdutA+qwKsuw7IvrRIxDgJfIj2IJexVtVIhiKIi6eDVw/bz4zLadsYjmfIkWo4VtPmVw5IvAe3qtk+LJeTl5sTSEyIEJekdgs3PtsnPwqI35sSPt0Ih/sV04TIk0ejjNsfqw7Iv3sVut04B8qIkWyIvKsxFOekzNsdAKsYPtKIiMFI3MurVtKIvzjIh6s6lFut//sWqtaI3IYbuwl'

    let h = {
        "s0": 3,
        "s1": "",
        "x0": "1",
        "x1": "3.6.8",
        "x2": "Mac OS",
        "x3": "xhs-pc-web",
        "x4": "4.20.1",
        "x5": a1,
        "x6": x_t,
        "x7": x_s,
        "x8": b1,
        "x9": encrypt_mcr(x_t + x_s + b1),
        "x10": 1,
    }
    return sign_common(h)
}

// let data= {
//     "source_note_id": "6688a587000000001e0117f6",
//     "image_formats": ["jpg", "webp", "avif"],
//     "extra": {"need_body_topic": "1"},
//     "xsec_source": "pc_feed",
//     "xsec_token": "ABZVxpFVCdxPOCmnaVUSvCCzr3Tcsneo0XhR3EgxP3XqE="
// }
//
// let xscomm = get_sign("/api/sns/web/v1/feed", data, "190a60cd464in75xm13xv9ef7rpf6u726ui515u0z50000187219")
// console.log(xscomm)

// let v = {
//     "s0": 5,
//     "s1": "",
//     "x0": "1",
//     "x1": "3.7.7",
//     "x2": "Windows",
//     "x3": "xhs-pc-web",
//     "x4": "4.25.1",
//     "x5": "190a60cd464in75xm13xv9ef7rpf6u726ui515u0z50000187219",
//     "x6": 1721109048081,
//     "x7": "XYW_eyJzaWduU3ZuIjoiNTIiLCJzaWduVHlwZSI6IngxIiwiYXBwSWQiOiJ4aHMtcGMtd2ViIiwic2lnblZlcnNpb24iOiIxIiwicGF5bG9hZCI6ImQwMmEwYWIwOWRhMjE3YWIwODFhZWYzNDhmOTdlZmNkMjY3Y2ZjMjZlNjgwZTE3NTk0ODY3Y2Q5NTE1YjUxZjhhM2E3ZTYzNmNjNzk3NWMxOWE1NDcwMjI1NjAwMDQ4M2QwNTc1MDMwNTY2NTA0MjE4ODgxNDNkOWFkNGRkYmQ5ODg4MTQzZDlhZDRkZGJkOWI1NmNjM2EzN2M2YTdhYWRlOTM2NTBhZGMzMzlkZTY0MGQwNzFlMjA5ZjczODE2MTkzM2MwYjVjZTdhNWFjOWZiZDc2ODlmMTdhNzhkNWViMWIxZmIzMjRkNzBhOGZkMTNkNGYxZTE3ODBjMjEyNTRjODM1NjNiNjcxYThlYzQxZWViZWRlNGRhYzI4MTE1OGFjOWZmMDc5NWMwNjcyZTBhNzZkNzU0ODZmMzA4N2Q5M2EwOGI0OWMxNTkxNWEzZjE5NmNmYmVmY2JiZDNkOTM4NzNkOGIyNWQwZjI1MzI4NDg3MzlmZjhiNDc4ZDA4NiJ9",
//     "x8": "I38rHdgsjopgIvesdVwgIC+oIELmBZ5e3VwXLgFTIxS3bqwErFeexd0ekncAzMFYnqthIhJeSfMDKutRI3KsYorWHPtGrbV0P9WfIi/eWc6eYqtyQApPI37ekmR1QL+5Ii6sdnoeSfqYHqwl2qt5B0DoIvMzOZQqZVw7IxOeTqwr4qtiIkrOIi/skccxICLdI3Oe0utl2ADZsLveDSKsSPw5IEvsiutJOqw8BVwfPpdeTDWOIx4VIiu6ZPwbPut5IvlaLbgs3qtxIxes1VwHIkumIkIyejgsY/WTge7sjutKrZgedWI9gfKeYcLNI3ge0VtZIk3edqtAmzPjNgDHIxOekPtR/WOex0lyIhYsIE8+qsqjICRKHmGnIiciePt5ICZC4BNsDces6uwTIvvedBJeYeMJIi3e6SLUyuwuIiKeTf0sxz/e1Vt4ZdvsdutWIxiem9AsdqtEssKsWVw8IxI2I383sqwZgVtQa7zLwLOsD0OexutmIk6eYa/sxLuMIiNeWL0skgh5IiJsTqwvIhk9KqwezPwKIxvs1Vw6IEeekVwdIk6sjut3wutnsqw9ICclI3Ir27lk2WKe1utCIEDtIkJeYut4blztn/0exLMuIhD=",
//     "x9": 1498815552,
//     "x10": 7
// }
// encrypt_mcr(v['s6'] + v['s7'] + v['s8'])
// let res = encrypt_b64Encode(encrypt_encodeUtf8(JSON.stringify(v)))
// console.log(res.length)