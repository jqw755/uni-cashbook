<template>
	<view class="page_login">
		<!-- 导航栏 -->
		<navbar v-if="isShowNavBar" />

		<!-- 头部logo -->
		<view class="head-wrap flex flex-align flex-justify">
			<view class="head-bg flex flex-justify"><image src="/static/family/family-logo.png" class="head-logo" /></view>
		</view>
		<!-- 登录form -->
		<view class="login_form flex flex-align flex-justify">
			<view class="input-wrap flex flex-align flex-justify">
				<view class="img"><image style="width:22px;height: 22px;" src="/static/login/icon_user.png" /></view>
				<input type="text" v-model="familyName" placeholder="请输入家庭账号" />
				<view class="img"><image @tap="delUser" class="img_del" src="/static/login/clear-ipt.png" /></view>
			</view>
			<view class="line" />
			<view class="input-wrap flex flex-align flex-justify">
				<view class="img"><image style="width:18px;height: 22px;" src="/static/login/icon_pwd.png" /></view>
				<input :type="pwdType" :value="userpwd" @input="inputPwd" placeholder="请输入家庭密码" />
				<view class="img" @tap="switchPwd">
					<image class="img_pwd_switch" v-show="pwdType === 'password'" src="/static/login/close-pwd.png" />
					<image class="img_pwd_switch" v-show="pwdType === 'text'" src="/static/login/open-pwd.png" />
				</view>
			</view>
		</view>

		<!-- 登录按钮 -->
		<button class="submit-login" type="primary" @tap="login">登录</button>

		<view class="opts flex flex-align">
			<text @tap="goReg" class="text to-reg">家庭注册</text>
			<text @tap="findPwd" class="text">忘记密码？</text>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			isShowNavBar: false, // 是否需要导航栏
			familyName: '',
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
			this.familyName = e.target.value;
		},
		inputPwd(e) {
			this.userpwd = e.target.value;
		},
		delUser() {
			this.familyName = '';
		},
		switchPwd() {
			this.pwdType = this.pwdType === 'text' ? 'password' : 'text';
		},
		login() {
			const familyName = this.familyName,
				userpwd = this.userpwd;

			if (!familyName.trim()) {
				this.$common.toast('请输入账号');
				return;
			}
			if (!userpwd.trim()) {
				this.$common.toast('请输入密码');
				return;
			}
			const params = {
				familyName: familyName,
				password: userpwd
			};
			this.$api({
				url: '/family/login',
				data: params,
				notToken: true
			})
				.then(async res => {
					if(res){
					  this.$store.commit('SETUSERINFO', res);
						await this.$common.setStorage('userInfo', res);
						// 重定向到家庭账户页面
						uni.redirectTo({
							url: '/pages/family/index'
						});
					}

				})
				.catch(e => {
					this.$common.toast(e.msg);
				});
		},
		findPwd() {
			this.$common.toast('暂不支持自助找回密码');
			// uni.navigateTo({
			// 	url: '/pages/findPwd/findPwd'
			// })
		},
		goReg() {
			uni.navigateTo({
				url: '/pages/family/register'
			});
		}
	}
};
</script>

<style lang="scss">

$logo-padding: 60px;
$form-border-color: rgba(214, 214, 214, 1);
$text-color: #b6b6b6;

page {
	height: auto;
	min-height: 100%;
	background-color: #f5f6f8;
}

.page_login {
	width: 100%;
	padding: 72rpx 72rpx;
}

.head-wrap {
	padding: 60rpx 0 30rpx;

	.head-bg {
		align-items: flex-end;

		.head-logo {
			width: 128rpx;
			height: 128rpx;
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
	margin-top: 70rpx auto 50rpx;
	color: white;
	background: linear-gradient(90deg, orange, red);

	&:active {
		color: $text-color;
	}
}

.opts {
	margin: 30rpx 48rpx;
	justify-content: space-between;

	.text {
		font-size: 14px;
		color: $text-color;
		&.to-reg{
			color: orange;
		}
	}
}
</style>
