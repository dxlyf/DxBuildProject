const KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const fromCharCode = String.fromCharCode;

function encodeUTF8(input) {
    let output = "";

    for (let i = 0; i < input.length; i++) {
        const c = input.charCodeAt(i);

        if (c < 0x80) {
            // One byte
            output += fromCharCode(c);
        } else if (c < 0x800) {
            // Two bytes
            output += fromCharCode(0xC0 | (c >>> 6));
            output += fromCharCode(0x80 | (c & 0x3f));
        } else if (c < 0x10000) {
            // Three bytes
            output += fromCharCode(0xE0 | (c >>> 12));
            output += fromCharCode(0x80 | (c >>> 6 & 0x3f));
            output += fromCharCode(0x80 | (c & 0x3f));
        }
    }

    return output;
}

export default function encodeBase64(input) {
    let output = "";
    let i = 0;

    const utfInput = encodeUTF8(input);

    while (i < utfInput.length) {
        let chr1 = utfInput.charCodeAt(i++);
        let chr2 = utfInput.charCodeAt(i++);
        let chr3 = utfInput.charCodeAt(i++);

        let enc1 = chr1 >> 2;
        let enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        let enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
            KEY_STR.charAt(enc1) + KEY_STR.charAt(enc2) +
            KEY_STR.charAt(enc3) + KEY_STR.charAt(enc4);
    }

    return output;
}