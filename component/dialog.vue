<template>
	<view class="dialog-wrap" v-if="isShowDialogData">
		<!-- 弹窗阴影遮罩 -->
		<view class="dialog-mask" @tap="tapMask"></view>

		<view class="dialog-content-wrap">
			<!-- 弹窗标题 -->
			<view class="dialog-title"><slot name="title">提示</slot></view>

			<!-- 弹窗内容 -->
			<view class="dialog-content"><slot name="content"></slot></view>

			<view class="footer-btn">
				<view class="btn cancel-btn" hover-class="current" @tap="cancelEvt" v-if="isShowCancelBtn">
					取消
					<text class="line"></text>
				</view>
				<view class="btn confirm-btn" hover-class="current" @tap="confirmEvt">确定</view>
			</view>
		</view> 
	</view>
</template> 

<script>
	
	/* 
	 ** 公用弹窗组件。由于不知道弹窗会展示什么内容，所以内容部分需要在具体的页面中以slot的形式传入 
	 */
	
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
		// 点击mask是否关闭弹窗
		isMaskClose: {
			type: Boolean,
			required: false,
			default() {
				return false;
			}
		},
		
		// 是否显示取消按钮
		isShowCancelBtn: {
			type: Boolean,
			required: false,
			default() {
				return false;
			}
		}
	},
	data() {
		return {
			isShowDialogData: false
		};
	},

	created() {
		// 值类型的props不允许直接修改，这里赋值给data解决
		// this.isShowDialogData = this.isShowDialog;
	},

	methods: {
		// 点击mask
		tapMask(){
			if(this.isMaskClose){
				this.cancelEvt();
			}
		},
		// 关闭弹窗
		cancelEvt() {
			this.isShowDialogData = false;
			this.$emit('closeDialog');
		},

		// 点击确定按钮
		confirmEvt() {
			this.$emit('confirmDialog');
		}
	},

	watch: {
		isShowDialog(val) {
			this.isShowDialogData = val;
		}
	}
};
</script>

<style lang="scss" scoped>
.dialog-wrap {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	.dialog-mask {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transform-origin: center;
		-webkit-transform-origin: center;
		animation: opacityAni 200ms ease;
		-webkit-animation: opacityAni 200ms ease;
		animation-fill-mode: forwards;
		-webkit-animation-fill-mode: forwards;
	}
	.dialog-content-wrap {
		width: 75%;
		max-width: 750px;
		font-size: 26rpx;
		background: #fff;
		border-radius: 8rpx;
		position: absolute;
		top: 20%;
		left: 12.5%;
		transform-origin: center;
		-webkit-transform-origin: center;
		animation: zoomIn 200ms ease;
		-webkit-animation: zoomIn 200ms ease;
		animation-fill-mode: forwards;
		-webkit-animation-fill-mode: forwards;
		.dialog-title {
			font-size: 36rpx;
			text-align: center;
			color: #000;
			font-weight: 500;
			padding: 44rpx 0 32rpx 0;
		}
		.dialog-content {
			padding: 0 36rpx;
		}
		.footer-btn {
			display: flex;
			flex-direction: row;
			height: 98rpx;
			line-height: 98rpx;
			border-top: 1px solid #e7e8e9;
			font-size: 36rpx;
			margin-top: 32rpx;
			text-align: center;
			.btn {
				flex: 1;
				height: 100%;
				text-align: center;
				position: relative;
				&.current {
					background: #f4f4f4;
				}
			}
			.cancel-btn {
				color: #999999;
			}
			.line {
				width: 1px;
				height: 100%;
				background: #e7e8e9;
				position: absolute;
				right: 0;
				top: 0;
			}
			.confirm-btn {
				color: #00c200;
			}
		}
	}
}

@keyframes opacityAni {
	from {
		background: rgba(0, 0, 0, 0.1);
	}
	to {
		background: rgba(0, 0, 0, 0.55);
	}
}

@keyframes zoomIn {
	from {
		transform: scale(0.96);
	}
	to {
		transform: scale(1);
	}
}
</style>
