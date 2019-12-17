<template>
	<view class="page_login">
		<!-- 头部logo -->
		<view class="head-wrap flex flex-align flex-justify">
			<view class="head-bg flex flex-justify">
				<image src="/static/login/family-logo.png" class="head-logo" />
			</view>
		</view>
		<!-- 登录form -->
		<view class="login_form flex flex-align flex-justify">
			<view class="input-wrap flex flex-align flex-justify">
				<view class="img">
					<image style="width:22px;height: 22px;" src="/static/login/icon_user.png" />
				</view>
				<input type="text" v-model="username" placeholder="请输入家庭账号">
				<view class="img">
					<image @tap="delUser" class="img_del" src="/static/login/icon_del.png" />
				</view>
			</view>
			<view class="line" />
			<view class="input-wrap flex flex-align flex-justify">
				<view class="img">
					<image style="width:18px;height: 22px;" src="/static/login/icon_pwd.png" />
				</view>
				<input :type="pwdType" :value="userpwd" @input="inputPwd" placeholder="请输入家庭密码">
				<view class="img" @tap="switchPwd">
					<image class="img_pwd_switch" src="/static/login/icon_pwd_switch.png" />
				</view>
			</view>
		</view>

		<!-- 登录按钮 -->
		<button class="submit-login" type="primary" @tap="login">登录</button>

		<view class="opts flex flex-align">
			<text @tap="goReg" class="text">家庭注册</text>
			<text @tap="findPwd" class="text">忘记密码？</text>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				username: '',
				userpwd: '',
				pwdType: 'password',
			}
		},
		methods: {
			inputUsername(e) {
				this.username = e.target.value
			},
			inputPwd(e) {
				this.userpwd = e.target.value
			},
			delUser() {
				this.username = '';
			},
			switchPwd() {
				this.pwdType = this.pwdType === 'text' ? 'password' : 'text'
			},
			login() {
				const username = this.username,
					userpwd = this.userpwd;

				if (!username.trim()) {
					this.$toast('请输入账号');
					return
				}
				if (!userpwd.trim()) {
					this.$toast('请输入密码');
					return
				}
				const params = {
					userName: username,
					password: userpwd,
				}
				this.$api({
					url: '/test/login',
					data: params,
					method: 'GET'
				}).then(res => {
					// 重定向到家庭账户页面
					uni.redirectTo({
						url: '/pages/family/index'
					});

					// res = res.data;
					// res.userInfo.avatar = `${getConfig().serverUrl}${res.userInfo.avatar}`;
					// res.child ? res.child.avatar = `${getConfig().serverUrl}${res.child.avatar}` : '';
					// auth.setIsLogin(1);
					// // auth.setToken(res.token);
					// // auth.setFamilyUserInfo(res.userInfo);
					// auth.setFamilyUserInfo(res.userInfo);
					// res.child ? auth.setPersonUserInfo(res.child) : '';
					// auth.setToken(res.userInfo.id); //存家庭ID
					// auth.setCon(params.con);
					// this.$router.push('/index');


				}).catch(e => {
					this.$toast(e.msg);
				})
			},
			findPwd() {
				this.$toast('暂不支持自助找回密码');
				// uni.navigateTo({
				// 	url: '/pages/findPwd/findPwd'
				// })
			},
			goReg() {
				uni.navigateTo({
					url: '/pages/family/register'
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

	.page_login {
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
		justify-content: space-between;

		.text {
			font-size: 14px;
			color: $text-color;
		}
	}
</style>
