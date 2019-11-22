<script>
	import Vue from 'vue'

	export default {
		onLaunch: function() {

			// 根据设备类型，定义自导航栏高度
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.$statusBar = e.statusBarHeight;
					if (e.platform === 'android') {
						Vue.prototype.$customeBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.$customeBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.$statusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.$customeBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.$statusBar = e.statusBarHeight;
					Vue.prototype.$customeBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})


		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style lang='scss'>
	/*每个页面公共css */
	@import url("./style/base.scss");
	
	@import url("./style/icon.css");

</style>
