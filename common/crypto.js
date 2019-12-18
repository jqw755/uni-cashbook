import CryptoJS from '@/lib/crypto-js.min.js'

const key = 'cashbook'; //十六位十六进制数作为密钥

/**
 * 加密
 */
const encrypt = (word) => {
	return CryptoJS.AES.encrypt(JSON.stringify(word), key).toString();
};

/**
 * 解密
 */
const decrypt = (word) => {
	const bytes = CryptoJS.AES.decrypt(word, key);
	return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export {
	encrypt,
	decrypt
};
