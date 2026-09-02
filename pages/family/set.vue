<template>
	<view class="set-wrap">
		<!-- 导航栏 -->
		<navbar><view slot="contentText">设置</view></navbar>

		<view class="set-content">
			<!-- 修改密码 -->
			<view class="set-item" hover-class="hover-current" @tap="changePwd">
				<text>修改密码</text>
				<text class="icons f-right"></text>
			</view>

			<!-- 修改密码 -->
			<view class="set-item" hover-class="hover-current" @tap="clearStorage">
				<text>清空缓存</text>
				<text class="icons f-right"></text>
			</view>
		</view>

		<!-- 修改密码 -->
		<changePwdCom :isShowDialog="isShowPwdDialog" @closeDialog="closeDialog" @changePwdSuccess="changePwdSuccess" />
	</view>
</template>
<script>
import changePwdCom from './include/changePwdCom.vue';

export default {
	data() {
		return {
			isShowPwdDialog: false, // 是否显示修改密码弹窗
		};
	},
	methods: {
		// 修改密码
		changePwd() {
			this.isShowPwdDialog = true;
		},
		
		// 密码修改成功
		changePwdSuccess() {
			this.closeDialog();
			uni.redirectTo({
				url: '/pages/family/login'
			});
		},
		
		// 关闭密码dialog
		closeDialog(e) {
			this.isShowPwdDialog = e;
		},

		// 清空缓存
		clearStorage() {
			this.$common.showModal({
				content: '清空缓存可以减小客户端存储、解决一些错误问题，完成后会重新登录',
				showCancel: true,
				success() {
					uni.clearStorage();
					uni.redirectTo({
						url: '/pages/family/login'
					});
				}
			});
		}
	},
	components: { changePwdCom }
};
</script>

<style lang="scss">
.hover-current {
	background: #f4f4f4;
}
.set-wrap {
	width: 100%;
	.set-content {
		.set-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100rpx;
			padding: 0 32rpx;
			background: #fff;
			&:last-child {
				border-bottom: 0;
			}
		}
	}
}
</style>
