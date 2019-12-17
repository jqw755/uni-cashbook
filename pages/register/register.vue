<template>
	<view class="page_register">
		<!-- 头部logo -->
		<view class="head-wrap flex flex-align flex-justify">
			<view class="head-bg flex flex-justify">
				<image src="/static/login/head.png" class="head-logo" />
			</view>
		</view>
		<!-- 登录form -->
		<view class="login_form flex flex-align flex-justify">
			<view class="input-wrap flex flex-align flex-justify">
				<input type="text" v-model="username" placeholder="请输入账号">
				<view class="img">
					<image @tap="delUser" class="img_del" src="/static/login/icon_del.png" />
				</view>
			</view>

			<view class="line" />

			<view class="input-wrap flex flex-align flex-justify">
				<input :type="pwdType" :value="userpwd" @input="inputPwd" placeholder="请输入密码">
				<view class="img" @tap="switchPwd">
					<image class="img_pwd_switch" src="/static/login/icon_pwd_switch.png" />
				</view>
			</view>

			<view class="line" />

			<view class="input-wrap flex flex-align flex-justify">
				<input type="password" :value="userConfirmPwd" @input="inputConfirmPwd" placeholder="请再次输入密码">
			</view>
		</view>

		<!-- 登录按钮 -->
		<button class="submit-login" type="primary" @tap="registerEvt" :disabled="isSubmiting">注册</button>

		<view class="opts">
			<text @tap="goLogin" class="text">登录</text>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				username: '',
				userpwd: '',
				userConfirmPwd: '',
				pwdType: 'password',
				isSubmiting: false
			}
		},
		methods: {
			// 输入账户
			inputUsername(e) {
				this.username = e.target.value
			},
			// 输入密码
			inputPwd(e) {
				this.userpwd = e.target.value
			},
			// 确认密码
			inputConfirmPwd(e) {
				this.userConfirmPwd = e.target.value
			},
			// 清空账户
			delUser() {
				this.username = '';
			},
			// 查看密码
			switchPwd() {
				this.pwdType = this.pwdType === 'text' ? 'password' : 'text'
			},
			// 注册
			registerEvt() {
				const username = this.username,
					userpwd = this.userpwd,
					userConfirmPwd = this.userConfirmPwd;

				if (!username.trim()) {
					this.$toast('请输入账号');
					return
				}
				if (!userpwd.trim()) {
					this.$toast('请输入密码');
					return
				}	
				if (!userConfirmPwd.trim()) {
					this.$toast('请输入确认密码');
					return
				}	
				if (userConfirmPwd.trim() !== userpwd.trim()) {
					this.$toast('两次密码输入不一致');
					return
				}
				const params = {
					username,
					password: userpwd,
				}
				this.isSubmiting = true;
				this.$api({
					url: '/user/regist',
					data: params
				}).then(res => {

				}).catch(e => {
					this.$toast(e.msg);
				}).finally(()=>{
					this.isSubmiting = false;
				})
			},

			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
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
	$text-color: #B6B6B6;

	.page_register {
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
				width: 20px;
				height: 20px;
			}

			.img_pwd_switch {
				width: 28px;
				height: 12px;
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
		background-color: rgba(252, 44, 93, 1.0);
		-webkit-tap-highlight-color: rgba(252, 44, 93, 1.0);

		&:active {
			color: #B6B6B6;
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
