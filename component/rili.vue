<template>
	<view class="rili-wrap">
		<!-- 日历挂钩 -->
		<view class="guagou flex flex-align">
			<text class="hole"></text>
			<text class="hole"></text>
			<view class="rope"></view>
		</view>

		<!-- 日历内容 -->
		<view class="rili-content text-center">
			<view class="date-wrap">
				<view class="weekly">{{dateObj.weekly}}</view>
				<view class="date">{{dateObj.date}}</view>
			</view>

			<!-- 装饰块 -->
			<view class="decor-wrap">
				<view class="decor-item"></view>
				<view class="decor-item"></view>
				<view class="decor-item"></view>
			</view>

		</view>

	</view>
</template>

<script>
	import utils from '@/common/utils.js'

	export default {
		data() {
			return {
				dateObj: {
					weekly: '',
					date: ''
				}
			}
		},
		created() {
			this.dateObj = {
				weekly: utils.getDay(Date.now(), '星期'),
				date: new Date().getDate()
			}
		},
		methods: {

		},
	}
</script>

<style lang="scss">
	.rili-wrap {
		width: 100rpx;
		max-height: 120rpx;
		font-size: 28rpx;

		.guagou {
			width: 100%;
			height: 30rpx;
			padding: 0 16rpx;
			justify-content: space-between;
			background: #0ec08e;
			border-top-left-radius: 10rpx;
			border-top-right-radius: 10rpx;
			position: relative;

			.hole {
				width: 14rpx;
				height: 14rpx;
				background: #11503f;
				border-radius: 50%;
			}

			.rope {
				width: calc(100% - 36rpx);
				height: 6rpx;
				border-radius: 4rpx;
				background: #fff;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
		}

		.rili-content {
			height: 80rpx;
			border: 4rpx solid #f9be26;
			background: #FFFFFF;
			border-bottom-left-radius: 6rpx;
			border-bottom-right-radius: 6rpx;
			border-top: 0;
			position: relative;

			.date-wrap,
			.decor-wrap {
				width: 100%;
				height: 100%;
				font-size: 20rpx;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 2;

				.weekly {
					padding: 4rpx 0 0 0;
				}

				.date {
					font-size: 34rpx;
					font-weight: bold;
				}
			}

			.decor-wrap {
				z-index: 1;

				.decor-item {
					display: inline-block;
					width: 30rpx;
					height: 18rpx;
					background: #e6e6e6;
					position: absolute;
					left: 12rpx;
					top: 12rpx;

					&:nth-child(2) {
						left: 25rpx;
						top: 48rpx;
						background: #ffece5;
					}

					&:nth-child(3) {
						left: 56rpx;
						top: 22rpx;
						background: #daf2d6;
					}
				}
			}

		}
	}
</style>
