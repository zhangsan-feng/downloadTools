export function traceid() {
    for (var t = "", e = 0; e < 16; e++)
        t += "abcdef0123456789".charAt(Math.floor(16 * Math.random()));

    return t
}
// console.log(traceid())