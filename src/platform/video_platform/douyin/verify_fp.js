
export async function GetVerifyFp() {
    let baseStr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let t = baseStr.length;
    let milliseconds = Math.floor(Date.now());
    let base36 = "";
    while (milliseconds > 0) {
        let remainder = milliseconds % 36;
        if (remainder < 10) {
            base36 = remainder.toString() + base36;
        } else {
            base36 = String.fromCharCode('a'.charCodeAt(0) + remainder - 10) + base36;
        }
        milliseconds = Math.floor(milliseconds / 36);
    }
    let r = base36;
    let o = new Array(36).fill('');
    o[8] = o[13] = o[18] = o[23] = "_";
    o[14] = "4";

    for (let i = 0; i < 36; i++) {
        if (!o[i]) {
            let n = 0 || Math.floor(Math.random() * t);
            if (i === 19) {
                n = n & 3 | 8;
            }
            o[i] = baseStr[n];
        }
    }

    return "verify_" + r + "_" + o.join('');
}
// console.log(GetVerifyFp())

