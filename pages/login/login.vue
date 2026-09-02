<template>
	<view class="page_login">
		<!-- 导航栏 -->
		<navbar v-if="isShowNavBar" />

		<!-- 头部logo -->
		<view class="head-wrap flex flex-align flex-justify">
			<view class="head-bg flex flex-justify"><image src="/static/login/head.png" class="head-logo" /></view>
		</view>
		<!-- 登录form -->
		<view class="login_form flex flex-align flex-justify">
			<view class="input-wrap flex flex-align flex-justify">
				<view class="img"><image style="width:22px;height: 22px;" src="/static/login/icon_user.png" /></view>
				<input type="text" v-model="username" placeholder="请输入账号" />
				<view class="img"><image @tap="delUser" class="img_del" src="/static/login/clear-ipt.png" /></view>
			</view>
			<view class="line" />
			<view class="input-wrap flex flex-align flex-justify">
				<view class="img"><image style="width:18px;height: 22px;" src="/static/login/icon_pwd.png" /></view>
				<input :type="pwdType" :value="userpwd" @input="inputPwd" placeholder="请输入密码" />
				<view class="img" @tap="switchPwd"><image class="img_pwd_switch" src="/static/login/close-pwd.png" /></view>
			</view>
		</view>

		<!-- 登录按钮 -->
		<view class="submit-login" type="primary" @tap="login">登录</view>

		<view class="opts flex flex-align">
			<text @tap="goReg" class="text">立即注册</text>
			<text @tap="findPwd" class="text">忘记密码？</text>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			isShowNavBar: false, // 是否需要导航栏

			username: '',
			userpwd: '',
			pwdType: 'password'
		};
	},

	onLoad() {
		var pages = getCurrentPages();
		this.isShowNavBar = pages.length > 1;

	},

	methods: {
		inputUsername(e) {
			this.username = e.target.value;
		},
		inputPwd(e) {
			this.userpwd = e.target.value;
		},
		delUser() {
			this.username = '';
		},
		switchPwd() {
			this.pwdType = this.pwdType === 'text' ? 'password' : 'text';
		},
		login() {
			const username = this.username,
				userpwd = this.userpwd;

			if (!username.trim()) {
				this.$common.toast('请输入账号');
				return;
			}
			if (!userpwd.trim()) {
				this.$common.toast('请输入密码');
				return;
			}
			const params = {
				userName: username,
				password: userpwd
			};
			this.$api({
				url: '/user/login',
				data: params,
				notToken: true
			})
				.then(async res => {
					if (res) {
						await this.$common.setStorage('userInfo', res);
						this.$store.commit('SETUSERINFO', res);
						// 通知首页刷新
						if(this.isShowNavBar){
							this.$store.commit('ISHOMETABREFRESH', true);
						}
						
						// 重定向到成员页面
						uni.switchTab({
							url: '/pages/index/index'
						});
					}

				})
				.catch(e => {
					this.$common.toast(e.msg);
				});
		},
		findPwd() {
			this.$common.showModal({
				content: '以家庭身份登录后，点击成员头像可修改成员密码',
				showCancel: true,
				success: () => {
					uni.navigateTo({
						url: '/pages/family/login'
					});
				}
			});
		},
		goReg() {
			this.$common.showModal({
				content: '请以家庭身份登录后添加成员',
				showCancel: true,
				success: () => {
					uni.navigateTo({
						url: '/pages/family/login'
					});
				}
			});
		}
	}
};
</script>
<style>
page {
	height: auto;
	min-height: 100%;
	background-color: #f5f6f8;
}
</style>
<style lang="scss">
$logo-padding: 60px;
$form-border-color: rgba(214, 214, 214, 1);
$text-color: #b6b6b6;

.page_login {
	width: 100%;
	padding: 72rpx 72rpx;
}

.head-wrap {
	padding: 60rpx 0 30rpx;

	.head-bg {
		border-radius: 50%;
		width: 180rpx;
		height: 180rpx;
		background: #fc2c5d;
		align-items: flex-end;
		overflow: hidden;

		.head-logo {
			width: 58px;
			height: 66px;
		}
	}
}

.login_form {
	margin: 40rpx auto;
	flex-direction: column;
	border: 1px solid $form-border-color;
	border-radius: 20rpx;

	.line {
		width: 100%;
		height: 1px;
		background-color: $form-border-color;
	}

	.input-wrap {
		width: 100%;
		max-height: 90rpx;
		padding: 20rpx 4rpx;

		.img {
			min-width: 40px;
			min-height: 40px;
			margin: 5px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.img_del {
			width: 32rpx;
			height: 32rpx;
		}

		.img_pwd_switch {
			width: 48rpx;
			height: 48rpx;
		}

		input {
			outline: none;
			height: 60rpx;
			width: 100%;

			&:focus {
				outline: none;
			}
		}
	}
}

.submit-login {
	height: 90rpx;
	line-height: 90rpx;
	text-align: center;
	border-radius: 10rpx;
	margin-top: 70rpx auto 50rpx;
	color: white;
	font-size: 32rpx;
	background-color: #fc2c5d;
	-webkit-tap-highlight-color: #fc2c5d;

	&:active {
		color: #b6b6b6;
		background-color: rgba(252, 44, 93, 0.8);
	}
}

.opts {
	margin: 30rpx 48rpx;
	justify-content: space-between;

	.text {
		font-size: 14px;
		color: $text-color;
	}
}
</style>
