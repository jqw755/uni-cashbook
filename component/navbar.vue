<template>
	<view class="nav-bar-wrap" :style="{ height: customeBar + 'px' }">
		<view class="nav-bar-fixed-wrap flex flex-align" :style="{ height: customeBar + 'px' }">
			<!-- 导航栏左侧 -->
			<view class="nav-left-wrap" v-if="isShowBack" @tap="backPage">
				<text class="icons icon-fanhui"></text>
				<slot name="backText">返回</slot>
			</view>

			<!-- 导航栏中间 -->
			<view class="nav-content-wrap text-overflow"><slot name="contentText"></slot></view>

			<!-- 导航栏右侧 -->
			<view class="nav-right-wrap"><slot name="rightText"></slot></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		isShowBack: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	data() {
		return {
			customeBar: this.$customeBar
		};
	},
	methods: {
		// 点击返回
		backPage() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss">
.nav-bar-wrap {
	.nav-bar-fixed-wrap {
		width: 100%;
		justify-content: space-between;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9999;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
		background-color: $uni-bg-color;
		color: #ffffff;
		padding: 0 32rpx;
		font-size: $uni-font-size-lg;
		font-weight: bold;
		/* 浏览器不支持的时候显示 */
		background-color: #f3b505;
		background-image: linear-gradient(-90deg, #c809c2, #f3b505);

		.nav-left-wrap {
			.icons.icon-fanhui {
				margin-right: 10rpx;
			}
		}

		.nav-content-wrap {
			width: calc(100% - 400rpx);
			text-align: center;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}

		.nav-right-wrap {
		}
	}
}
</style>
