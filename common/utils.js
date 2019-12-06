const utils = {
	
	// 验证密码 必须包含数字、字母、字符三种
	checkPwd(pwd){
		return (/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&?$*])[a-z\d#@!~%^&?$*]{6,20}/i).test(pwd)
	},
	
	// 验证手機號
	checkMobile(m) {
		return /(^1[3|4|5|7|8][0-9]{9}$)/.test(m)
	},

	// 验证邮箱
	checkEmail(email) {
		return /^([a-zA-Z0-9-_]*[-_.]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2})?$/.test(email)
	},

	// 判断数组中是否有重复项
	isArrayRepeat(arr) {
		var hash = {};
		for (var i in arr) {
			if (hash[arr[i]]) {
				return true;
			}
			hash[arr[i]] = true;
		}
		return false;
	},

	// 时间格式化
	formatDate(time = Date.now(), fmt = 'yyyy-MM-dd hh:mm:ss') {
		let date = new Date(time);
		let o = {
			'M+': date.getMonth() + 1, //月份
			'd+': date.getDate(), //日
			'h+': date.getHours(), //小时
			'm+': date.getMinutes(), //分
			's+': date.getSeconds(), //秒
			'q+': Math.floor((date.getMonth() + 3) / 3), //季度
			'S': date.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		for (let k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
			}
		}
		return fmt;
	},

	//获取中文星期
	getDay: (time = Date.now(), prefix = '周') => {
		const datNo = new Date(time).getDay(),
			str = '日一二三四五六';
		return prefix + str[datNo];
	},

	// 输入合法数字，输出周几
	outWeekDay(n, prefix = '周') {
		if (n === 0) {
			return;
		}
		let weekly = "";
		switch (n) {
			case 1:
				weekly = "一";
				break;
			case 2:
				weekly = "二";
				break;
			case 3:
				weekly = "三";
				break;
			case 4:
				weekly = "四";
				break;
			case 5:
				weekly = "五";
				break;
			case 6:
				weekly = "六";
				break;
			case 7:
				weekly = "日";
				break;
		}
		return prefix + weekly;
	},

};

export default utils;
