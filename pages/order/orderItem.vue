<template>
	<navigator :url="'/pages/order/orderDetail?orderNo=' + orderData._id" hover-class="none" class="order-item-wrap flex flex-align">
		<!-- 收支类型icon -->
		<view class="order-type-icon flex flex-align flex-justify"><image :src="orderData.goodsImg" mode="" class="order-type-img"></image></view>

		<view class="order-data-wrap flex text-overflow">
			<view class="data-left">
				<view class="goods-name">{{ orderData.goodsName || '--' }}</view>
				<view class="order-ramark text-overflow">{{ orderData.remark || '' }}</view>
				<!-- 以创建时间倒序排序 -->
				<view class="time">{{ formatTime || '--' }}</view>
			</view>

			<view :class="['order-money-wrap', { active: orderData.orderType === 2 }]">
				<text v-if="orderData.orderType === 1">-</text>
				<text v-if="orderData.orderType === 2">+</text>
				<text class="money-num">{{ orderData.money }}</text>
			</view>
		</view>
	</navigator>
</template>

<script>
import utils from '@/common/utils.js';
export default {
	props: {
		orderData: {
			required: true,
			type: Object,
			// 如果这里结构报错，就把default定义为函数，内部return默认值即可
			default() {
				return {};
			}
		}
	},
	data() {
		return {};
	},
	onLoad() {},
	methods: {},
	computed: {
		formatTime() {
			const time = this.orderData.createTime;
			if(!time) return
			return utils.formatDate(time, 'yyyy-MM-dd hh:mm:ss');
		}
	}
};
</script>

<style lang="scss">
.order-item-wrap {
	padding: 0 32rpx;
	background: #fff;

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
			width: 64rpx;
			height: 64rpx;
		}
	}

	.order-data-wrap {
		flex: 1;
		padding: 28rpx 0;
		justify-content: space-between;
		border-bottom: 1px solid $uni-border-color;

		.data-left {
			max-width: 85%;
			font-size: 24rpx;
			color: #999;

			.goods-name {
				font-size: 32rpx;
				color: #333;
				margin-bottom: 10rpx;
			}
			.order-ramark {
				font-size: 26rpx;
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
