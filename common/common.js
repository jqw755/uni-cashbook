import {
	encrypt,
	decrypt
} from './crypto.js'

const common = {
	// 统一toast提示
	toast(title = '', duration = 3000, mask = false, icon = 'none') {
		uni.showToast({
			title: title.toString(),
			duration,
			mask,
			icon
		});
	},

	/*
	 *带有确认和取消的弹出modal框
	 *@obj:{}
	 */
	showModal(data) {
		let obj = {};
		if (typeof data === 'string') {
			obj.content = data;
		}else{
			obj = data;
		}
		uni.showModal({
			title: obj.title || '提示',
			content: obj.content || '',
			showCancel: obj.showCancel || false,
			cancelText: obj.cancelText || '取消',
			confirmText: obj.confirmText || '确定',
			success: function(res) {
				if (res.confirm) {
					obj.success && obj.success();
				} else if (res.cancel) {
					obj.cancel && obj.cancel();
				}
			}
		});
	},

	/* 
	 异步设置本地存储
	 */
	async setStorage(key, data) {
		let oldStore = await this.getStorage();
		oldStore[key] = data;
		uni.setStorage({
			key: 'STORAGESTATE',
			data: encrypt(oldStore)
		});
	},

	// 同步读取本地存储
	getStorage() {
		try {
			const val = uni.getStorageSync('STORAGESTATE');
			if (val) {
				return decrypt(val)
			} else {
				return {};
			}
		} catch (e) {
			return {};
		}
	},

};

export default common;
