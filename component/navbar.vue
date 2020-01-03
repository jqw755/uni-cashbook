<template>
	<view class="nav-bar-wrap" :style="{ height: customeBar + 'px' }">
		<view class="nav-bar-fixed-wrap flex flex-align" :style="style">
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
		// 是否显示返回按钮
		isShowBack: {
			type: Boolean,
			required: false,
			default: true
		},
		// 背景色
		bgImage: {
			type: String,
			required: false,
			default: ''
		}
	},
	data() {
		return {
			customeBar: this.$customeBar
		};
	},

	computed: {
		style() {
			let customeBar = this.$customeBar,
				bgImage = this.bgImage;

			let style = `height:${customeBar}px;`;

			if (this.bgImage) {
				style = `${style}background-image:${bgImage};`;
			}
			return style;
		}
	},

	methods: {
		// 点击返回
		backPage() {
			var pages = getCurrentPages();

			// 当不存在上级页面
			if (pages.length === 1) {
				const isFamily = this.$store.state.userInfo.familyId;
				if (isFamily) {
					uni.switchTab({
						url: '/pages/index/index'
					});
				} else {
					uni.redirectTo({ url: '/pages/family/index' });
				}

				return;
			}
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
		/* 浏览器不支持的时候显示 */
		background-color: #fff;
		color: #fff;
		padding: 0 28rpx;
		font-size: 32rpx;
		font-weight: bold;
		background-image: linear-gradient(-90deg, #4CAF50, #3fbc62);

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
