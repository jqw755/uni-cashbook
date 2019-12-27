<template>
	<view class="">
		<j-dialog :isShowDialog="isShowDialog" :isShowCancelBtn="true" :isMaskClose="false" @closeDialog="closeDialog" @confirmDialog="changePwdEvt">
			<text slot="title">修改密码</text>
			<view slot="content">
				<view class="member-register">

					<!-- form -->
					<view class="login_form flex flex-align flex-justify">
						
						<view class="input-wrap flex flex-align flex-justify">
							<input type="password" v-model="userpwd" @input="inputPwd" placeholder="请输入当前账号密码" />
						</view>

						<view class="line" />

						<view class="input-wrap flex flex-align flex-justify">
							<input :type="pwdType" :value="newPwd" @input="inputNewPwd" placeholder="请输入新密码" />
							<view class="img" @tap="switchPwd">
								<image class="img_pwd_switch" v-show="pwdType === 'password'" src="/static/login/close-pwd.png" />
								<image class="img_pwd_switch" v-show="pwdType === 'text'" src="/static/login/open-pwd.png" />
							</view>
						</view>

						<view class="line" />
						
						<view class="input-wrap flex flex-align flex-justify">
							<input type="password" :value="userConfirmPwd" @input="inputConfirmPwd" placeholder="请输入确认密码" />
						</view>
					</view>

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
		},
	},
	data() {
		return {
			userpwd: '',
			newPwd: '',
			userConfirmPwd: '',
			pwdType: 'password',
			isSubmiting: false
		};
	},
	created() {},
	methods: {
		// 输入密码
		inputPwd(e) {
			this.userpwd = e.target.value;
		},
		// 新密码
		inputNewPwd(e) {
			this.newPwd = e.target.value;
		},
		// 确认密码
		inputConfirmPwd(e) {
			this.userConfirmPwd = e.target.value;
		},
		// 查看密码
		switchPwd() {
			this.pwdType = this.pwdType === 'text' ? 'password' : 'text';
		},
		// 修改
		changePwdEvt() {
			if(this.isSubmiting){
				return
			}
			const userpwd = this.userpwd,
				newPwd = this.newPwd,
				userConfirmPwd = this.userConfirmPwd;
			if (!userpwd.trim()) {
				this.$common.toast('请输入密码');
				return;
			}
			if (!newPwd.trim()) {
				this.$common.toast('请输入新密码');
				return;
			}
			if (!userConfirmPwd.trim()) {
				this.$common.toast('请输入确认密码');
				return;
			}
			if (userConfirmPwd.trim() !== newPwd.trim()) {
				this.$common.toast('两次密码输入不一致');
				return;
			}
			const params = {
				newPwd: newPwd,
				password: userpwd
			};
			this.isSubmiting = true;
			this.$api({
				url: '/family/changePwd',
				data: params
			})
				.then(res => {
					this.closeDialog();
					this.$emit('changePwdSuccess', true);
				})
				.catch(e => {
					this.$common.toast(e.msg);
				})
				.finally(() => {
					this.isSubmiting = false;
				});
		},

		closeDialog() {
			this.userpwd = '';
			this.newPwd = '';
			this.userConfirmPwd = '';
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
