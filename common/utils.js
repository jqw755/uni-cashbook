const utils = {
	// 验证手機號
	checkMobile: m =>
		return /(^1[3|4|5|7|8][0-9]{9}$)/.test(m);

	// 验证邮箱
	checkEmail(email) {
		return /^([a-zA-Z0-9-_]*[-_.]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2})?$/.test(
			email);
	},

};
export default utils;
