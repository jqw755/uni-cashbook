<template>
	<view class="container order-detail-container">
		<!-- 导航栏 -->
		<navbar><view slot="contentText">详情</view></navbar>
		<!-- 详情页内容 -->
		<view class="order-detail-wrap">
			<view class="order-detail-top text-center">
				<view class="detail-top-item"><image src="../../static/cate/canyin.png" mode="" class="order-icon-wrap"></image></view>
				<view class="detail-top-item order-title">{{ orderData.cateStr || '--' }}</view>
				<view class="detail-top-item order-money">
					<text v-if="orderData.orderType === 1">-</text>
					<text v-if="orderData.orderType === 2">+</text>
					<text class="money-num">{{ orderData.money }}</text>
				</view>
			</view>

			<ul class="order-detail-bottom">
				<li class="detail-item">
					<text class="detail-tip">当前状态</text>
					<text>{{ orderData.orderState || '--' }}</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">账单备注</text>
					<text>{{ orderData.remark || '--' }}</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">支付方式</text>
					<text>{{ orderData.payType }}</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">消费时间</text>
					<text>{{ orderData.payTime || '--' }}</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">创建时间</text>
					<text>{{ orderData.createTime || '--' }}</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">订单号</text>
					<text>{{ orderData.orderNo || '--' }}</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">照片</text>
					<view class="order-pics"><!-- <image src="../../static/cate/canyin.png" mode="" class="order-pic-item"></image> --></view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
import utils from '@/common/utils.js';

export default {
	data() {
		return {
			orderNo: '',
			orderData: {}
		};
	},

	onLoad(options) {
		this.orderNo = options.orderNo;

		this.getOrderDetail();
	},

	onReady() {},

	methods: {
		getOrderDetail(page = this.page) {
			this.$api({
				url: '/order/detail',
				data: {
					orderNo: this.orderNo
				}
			})
				.then(res => {
					if (res) {
						res.createTime = res.createTime ? utils.formatDate(res.createTime, 'yyyy-MM-dd hh:mm:ss') : '--';
						res.payTime = res.payTime ? utils.formatDate(res.payTime, 'yyyy-MM-dd hh:mm:ss') : '--';
						this.orderData = res;
					}
				})
				.catch(e => {
					this.$common.toast(e.msg);
				})
				.finally();
		}
	},
	
	// 下拉刷新
	async onPullDownRefresh() {
		this.getOrderDetail();
		uni.startPullDownRefresh();
	},

	components: {}
};
</script>

<style lang="scss">
.order-detail-wrap {
	.order-detail-top {
		padding: 60rpx 64rpx 50rpx;
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
				.order-pic-item {
					max-width: 140rpx;
					max-height: 140rpx;
					margin: 0 10rpx 10rpx 0;
				}
			}
		}
	}
}
</style>
