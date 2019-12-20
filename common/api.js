import config from '@/common/config.js'
import common from '@/common/common.js'

/** 
 @param url: 接口地址
 @param data: 请求参数(可选)
 @param header: 请求头(可选)
 @param notLoading: 是否显示loading动画(可选)
 @param notToken: 是否需要token(可选)
 */
const api = ({
	url = '/',
	method = 'POST',
	data = {},
	header = {},
	notLoading = false,
	notToken = false
}) => {

	// 如果此接口需要token
	if (!notToken) {
		header = {
			...header,
			'Authorization': common.getStorage().token || ''
		}
	}

	// 避免传参null/undefined
	for (let k in data) {
		if (data.hasOwnProperty(k)) {
			let val = data[k]
			if (val === null || val === undefined) {
				data[k] = ""
			}
		}
	}

	// 是否需要loading
	if (!notLoading) {
		uni.showLoading({
			title: '加载中...',
			mask: true
		})
	}

	return new Promise((resolve, reject) => {
		let reqConfig = {
			url: config.getConfig().baseUrl + url,
			method,
			data,
			dataType: 'json',
			header,
			success(res) {
				try {
					const {
						code,
						data,
						msg
					} = res.data;

					// 登录失效
					if (code === 20 || code === 21) {
						let url = '';
						if (store.state.familyId) {
							url = '/pages/login/login'
						} else {
							url = '/pages/family/login'
						}
						uni.showModal({
							content: '登录失效,请重新登录',
							success() {
								uni.navigateTo({
									url
								})
							}
						})
						reject({
							code,
							msg
						});
						return
					}

					// 请求成功
					if (code === 0 && data) {
						resolve(data)
					} else {
						reject({
							code,
							msg
						})
					}
					
				} catch (e) {
					reject({
						code: -1,
						msg: '请求出错，请稍后再试'
					})
				}

			},
			fail(e) {
				console.log(e)
				const msg = "服务出错，请稍后再试"; // 错误提示
				reject({
					code: -999,
					msg: e.errMsg || msg
				});
			},
			complete() {
				if (!notLoading) {
					uni.hideLoading();
				}

			}
		};
		uni.request(reqConfig)
	})


}
export default api;
