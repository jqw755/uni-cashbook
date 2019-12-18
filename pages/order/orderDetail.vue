<template>
	<view class="container order-detail-container">
		<!-- 导航栏 -->
		<navbar><view slot="contentText">详情</view></navbar>
		<!-- 详情页内容 -->
		<view class="order-detail-wrap">
			<view class="order-detail-top text-center">
				<view class="detail-top-item"><image src="../../static/cate/canyin.png" mode="" class="order-icon-wrap"></image></view>
				<view class="detail-top-item order-title">餐饮</view>
				<view class="detail-top-item order-money">-10.00</view>
			</view>

			<ul class="order-detail-bottom">
				<li class="detail-item">
					<text class="detail-tip">当前状态</text>
					<text>支付成功</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">账单备注</text>
					<text>我10号吃饭了，11号记账的</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">支付方式</text>
					<text>支付宝余额付款</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">消费时间</text>
					<text>2019-11-10 12：00</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">创建时间</text>
					<text>2019-11-11 20：02</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">订单号</text>
					<text>12021454576946513203</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">照片</text>
					<view class="order-pics">
						<!-- <image src="../../static/cate/canyin.png" mode="" class="order-pic-item"></image> -->
					</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
	data() {
		return {};
	},

	onLoad() {},

	onReady() {},

	methods: {
		getOrderList(page = this.page) {
			this.$api({
				url: '/order/list',
				data: {
					page,
					pageSize: this.pageSize
				}
			})
				.then(res => {
					if (res.list) {
						this.orderList = res.list;
					}
				})
				.catch(e => {
					this.$common.toast(e.msg);
				})
				.finally();
		}
	},

	components: {}
};
</script>

<style lang="scss">
.order-detail-wrap {
	.order-detail-top {
		padding: 32rpx 64rpx 50rpx;
		margin-bottom: 16rpx;
		background: #fff;
		.detail-top-item {
			padding-bottom: 12rpx;
			&:last-child {
				padding-bottom: 0;
			}
			.order-icon-wrap {
				width: 90rpx;
				height: 90rpx;
			}
			&.order-title {
				font-size: 32rpx;
			}
			&.order-money {
				font-size: 36rpx;
				font-weight: bold;
			}
		}
	}
	.order-detail-bottom {
		padding: 32rpx 64rpx 40rpx;
		background: #fff;
		.detail-item {
			display: flex;
			margin-bottom: 20rpx;
			color: #000;
			&:last-child {
				margin-bottom: 0;
			}
			.detail-tip {
				flex-basis: 120rpx;
				margin-right: 20rpx;
				font-size: 26rpx;
				color: #808080;
			}
			.order-pics {
				.order-pic-item{
					max-width: 140rpx;
					max-height: 140rpx;
					margin: 0 10rpx 10rpx 0;
				}
			}
		}
	}
}
</style>
