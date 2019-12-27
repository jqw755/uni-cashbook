<template>
	<view class="page_register">
		<!-- 导航栏 -->
		<navbar v-if="isShowNavBar" />

		<!-- 头部logo -->
		<view class="head-wrap flex ">创建您的家庭吧</view>

		<!-- form -->
		<view class="login_form flex flex-align flex-justify">
			<view class="input-wrap flex flex-align flex-justify">
				<input type="text" v-model="familyName" placeholder="请输入家庭账号" />
				<view class="img"><image @tap="delUser" class="img_del" src="/static/login/clear-ipt.png" /></view>
			</view>

			<view class="line" />

			<view class="input-wrap flex flex-align flex-justify">
				<input :type="pwdType" :value="password" @input="inputPwd" placeholder="请输入家庭密码" />
				<view class="img" @tap="switchPwd">
					<image class="img_pwd_switch" v-show="pwdType === 'password'" src="/static/login/close-pwd.png" />
					<image class="img_pwd_switch" v-show="pwdType === 'text'" src="/static/login/open-pwd.png" />
				</view>
			</view>

			<view class="line" />

		</view>

		<!-- 登录按钮 -->
		<button class="submit-login" type="primary" @tap="registerEvt" :disabled="isSubmiting">注册</button>

		<view class="opts"><text @tap="goLogin" class="text">家庭登录</text></view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			isShowNavBar: false, // 是否需要导航栏

			familyAvatar: '',
			familyName: '',
			password: '',
			pwdType: 'password',
			isSubmiting: false
		};
	},
	onLoad() {
		var pages = getCurrentPages();
		this.isShowNavBar = pages.length > 1;

	},
	methods: {
		// 输入账户
		inputUsername(e) {
			this.familyName = e.target.value;
		},
		// 输入密码
		inputPwd(e) {
			this.password = e.target.value;
		},

		// 清空账户
		delUser() {
			this.familyName = '';
		},
		// 查看密码
		switchPwd() {
			this.pwdType = this.pwdType === 'text' ? 'password' : 'text';
		},
		// 注册
		registerEvt() {
			const familyName = this.familyName,
				password = this.password;

			if (!familyName.trim()) {
				this.$common.toast('请输入账号');
				return;
			}
			if (!password.trim()) {
				this.$common.toast('请输入密码');
				return;
			}

			const params = {
				familyName,
				password: password
			};
			this.isSubmiting = true;
			this.$api({
				url: '/family/register',
				data: params,
				notToken: true
			})
				.then(async res => {
					if (res) {
						this.$store.commit('SETTOKEN', res.token);
						await this.$common.setStorage('token', res.token);
						uni.redirectTo({
							url: '/pages/family/index'
						});
					}
				})
				.catch(e => {
					this.$common.toast(e.msg);
				})
				.finally(() => {
					this.isSubmiting = false;
				});
		},

		goLogin() {
			uni.navigateTo({
				url: '/pages/family/login'
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

.page_register {
	width: 100%;
	padding: 72rpx 72rpx;
}

.head-wrap {
	padding: 60rpx 0 30rpx;
	font-size: 50rpx;
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
		padding: 18rpx 0 18rpx 30rpx;

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
	margin-top: 70rpx auto 50rpx;
	color: white;
	background-color: rgba(252, 44, 93, 1);

	&:active {
		background-color: rgba(252, 44, 93, 0.8);
	}
}

.opts {
	margin: 30rpx 48rpx;
	text-align: right;
	.text {
		font-size: 14px;
		color: #fc2c5d;
	}
}
</style>
