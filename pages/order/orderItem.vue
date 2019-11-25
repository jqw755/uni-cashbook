<template>
	<navigator :url="'/pages/order/orderDetail?orderId='+orderData.orderNo" hover-class="none" class="order-item-wrap flex flex-align">
		<!-- 收支类型icon -->
		<view class="order-type-icon">
			<image src="/static/cate/canyin.png" mode="" class="order-type-img"></image>
		</view>

		<view class="order-data-wrap flex">
			<view class="data-left">
				<view class="cate-str">{{orderData.cateStr}}</view>
				<view class="time">{{formatTime}}</view>
			</view>

			<view :class="['order-money-wrap', {'active':orderData.type!==1}]">
				<text>{{orderData.type===1?'-':'+'}}</text>
				<text class="money-num">{{orderData.money}}</text>
			</view>
		</view>
	</navigator>
</template>

<script>
	import utils from '@/common/utils.js'
	export default {
		props: {
			orderData: {
				required: true,
				type: Object,
				// 如果这里结构报错，就把default定义为函数，内部return默认值即可
				default () {
					return {}
				}
			}
		},
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {

		},
		computed: {
			formatTime() {
				return utils.formatDate(this.orderData.time, 'yyyy年MM月dd日 hh:mm');
			}
		}
	}
</script>

<style lang="scss">
	.order-item-wrap {
		padding: 0 32rpx;
		background: #f6f6f6;

		&:active {
			background: #ddd;
		}

		.order-type-icon {
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			background: #f4f4f4;
			margin-right: 20rpx;

			.order-type-img {
				max-width: 100%;
				max-height: 100%;
			}
		}

		.order-data-wrap {
			flex: 1;
			padding: 28rpx 0;
			justify-content: space-between;
			border-bottom: 1px solid $uni-border-color;

			.data-left {
				font-size: 28rpx;
				color: #999;

				.cate-str {
					font-size: 32rpx;
					color: #333;
					margin-bottom: 10rpx;
				}
			}

			.order-money-wrap {
				text-align: right;
				font-size: 36rpx;
				color: #000;

				&.active {
					color: #e89c02;
				}

			}
		}
	}
</style>
