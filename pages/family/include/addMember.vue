<template>
	<view class="">
		<j-dialog :isShowDialog="isShowDialog" :isShowCancelBtn="true" :isMaskClose="false" @closeDialog="closeDialog" @confirmDialog="registerEvt">
			<text slot="title"></text>
			<view slot="content">
				<view class="member-register">
					<!-- 头部logo -->
					<view class="head-bg flex flex-justify" @tap="changeLocalPic"><image src="/static/login/head.png" class="head-logo" /></view>

					<!-- 登录form -->
					<view class="login_form flex flex-align flex-justify">
						<view class="input-wrap flex flex-align flex-justify">
							<input type="text" v-model="username" placeholder="请输入账号" />
							<view class="img"><image @tap="delUser" class="img_del" src="/static/login/clear-ipt.png" /></view>
						</view>

						<view class="line" />

						<view class="input-wrap flex flex-align flex-justify">
							<input :type="pwdType" :value="userpwd" @input="inputPwd" placeholder="请输入密码" />
							<view class="img" @tap="switchPwd">
								<image class="img_pwd_switch" v-show="pwdType === 'password'" src="/static/login/close-pwd.png" />
								<image class="img_pwd_switch" v-show="pwdType === 'text'" src="/static/login/open-pwd.png" />
							</view>
						</view>

						<view class="line" />

						<view class="input-wrap flex flex-align flex-justify"><input type="password" :value="userConfirmPwd" @input="inputConfirmPwd" placeholder="请再次输入密码" /></view>
					</view>

					<!-- 登录按钮 -->
					<!-- <button class="submit-login" type="primary" @tap="registerEvt" :disabled="isSubmiting">注册</button> -->
				</view>
			</view>
		</j-dialog>
	</view>
</template>

<script>
import jDialog from '@/component/dialog.vue';
export default {
	props: {
		// 是否显示弹窗
		isShowDialog: {
			type: Boolean,
			required: true,
			default() {
				return false;
			}
		}
	},
	data() {
		return {
			// isShowDialog: true
			username: '',
			userpwd: '',
			userConfirmPwd: '',
			pwdType: 'password',
			isSubmiting: false
		};
	},
	created() {},
	methods: {
		// 选择本地图片上传头像
		changeLocalPic(){
			this.$api({
				url: '/family/uploadAvatar',
				data: params
			})
				.then(res => {})
				.catch(e => {
					this.$toast(e.msg);
				})
				.finally(() => {
					this.isSubmiting = false;
				});
		},
		// 输入账户
		inputUsername(e) {
			this.username = e.target.value;
		},
		// 输入密码
		inputPwd(e) {
			this.userpwd = e.target.value;
		},
		// 确认密码
		inputConfirmPwd(e) {
			this.userConfirmPwd = e.target.value;
		},
		// 清空账户
		delUser() {
			this.username = '';
		},
		// 查看密码
		switchPwd() {
			this.pwdType = this.pwdType === 'text' ? 'password' : 'text';
		},
		// 注册
		registerEvt() {
			const username = this.username,
				userpwd = this.userpwd,
				userConfirmPwd = this.userConfirmPwd;
			if (!username.trim()) {
				this.$toast('请输入账号');
				return;
			}
			if (!userpwd.trim()) {
				this.$toast('请输入密码');
				return;
			}
			if (!userConfirmPwd.trim()) {
				this.$toast('请输入确认密码');
				return;
			}
			if (userConfirmPwd.trim() !== userpwd.trim()) {
				this.$toast('两次密码输入不一致');
				return;
			}
			const params = {
				username,
				password: userpwd
			};
			this.isSubmiting = true;
			this.$api({
				url: '/user/regist',
				data: params
			})
				.then(res => {})
				.catch(e => {
					this.$toast(e.msg);
				})
				.finally(() => {
					this.isSubmiting = false;
				});
		},

		closeDialog() {
			this.$emit('closeDialog', false);
		}
	},
	components: { jDialog }
};
</script>

<style lang="scss">
$form-border-color: rgba(214, 214, 214, 1);
$text-color: #b6b6b6;
.member-register {
	.head-bg {
		border-radius: 50%;
		width: 140rpx;
		height: 140rpx;
		background: #fc2c5d;
		align-items: flex-end;
		overflow: hidden;
		margin: 0 auto;

		.head-logo {
			width: 88rpx;
			height: 99rpx;
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
				width: 32rpx;
				height: 32rpx;
			}

			.img_pwd_switch {
				width: 48rpx;
				height: 48rpx;
			}

			input {
				height: 60rpx;
				width: 100%;
			}
		}
	}

	.submit-login {
		margin-top: 70rpx auto 50rpx;
		color: white;
		background-color: rgba(252, 44, 93, 1);
		-webkit-tap-highlight-color: rgba(252, 44, 93, 1);

		&:active {
			color: #b6b6b6;
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
}
</style>
