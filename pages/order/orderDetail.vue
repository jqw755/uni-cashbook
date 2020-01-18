<template>
	<view class="container order-detail-container">
		<!-- 导航栏 -->
		<navbar><view slot="contentText">详情</view></navbar>
		<!-- 详情页内容 -->
		<view class="order-detail-wrap">
			<view class="order-detail-top text-center">
				<view class="detail-top-item order-goods-wrap flex flex-align flex-justify">
					<image :src="orderData.goodsImg" class="order-goods-img"></image>
				</view>
				<view class="detail-top-item order-title">{{ orderData.goodsName || '--' }}</view>
				<view class="detail-top-item order-money">
					<text v-if="orderData.orderType === 1">-</text>
					<text v-if="orderData.orderType === 2">+</text>
					<text class="money-num">{{ orderData.money }}</text>
				</view>
			</view>

			<ul class="order-detail-bottom">
				<li class="detail-item">
					<text class="detail-tip">记账人</text>
					<view class="flex flex-align">
						<image v-if="createrData.avatar" :src="createrData.avatar" mode="" class="creater-avatar"></image>
						<image v-else src="/static/family/default-head-bg.jpg" mode="" class="creater-avatar"></image>
						<text>{{ createrData.userName}}</text>
					</view>
				</li>
				<li class="detail-item">
					<text class="detail-tip">当前状态</text>
					<text>{{ orderData.orderState === 1 ? '已完成' : '未知'}}</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">支付方式</text>
					<text>本APP支付</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">
						<text v-if="orderData.orderType === 1">支出</text>
						<text v-if="orderData.orderType === 2">收入</text>
						<text>时间</text>
					</text>
					
					<text>{{ orderData.payTime || '--' }}</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">创建时间</text>
					<text>{{ orderData.createTime || '--' }}</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip" :selectable="true">订单号</text>
					<text>{{ orderData['_id'] || '--' }}</text>
				</li>
				<li class="detail-item">
					<text class="detail-tip">订单备注</text>
					<text class="order-remark">{{ orderData.remark || '--' }}</text>
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
			orderData: {},// 订单信息
			createrData: {}, // 订单创建人信息
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
						const {detail, creater} = res;
						detail.createTime = detail.createTime ? utils.formatDate(detail.createTime, 'yyyy-MM-dd hh:mm:ss') : '--';
						detail.payTime = detail.payTime ? utils.formatDate(detail.payTime, 'yyyy-MM-dd hh:mm:ss') : '--';
						this.orderData = detail;
						this.createrData = creater;
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
			margin-bottom: 14rpx;
			&:last-child {
				margin-bottom: 0;
			}
			&.order-goods-wrap {
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				background: #f4f4f4;
				margin-left: auto;
				margin-right: auto;
				.order-goods-img{
					width: 64rpx;
					height: 64rpx;
				}
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
			.creater-avatar{
				width: 46rpx;
				height: 46rpx;
				border-radius: 50%;
				margin-right: 6rpx;
			}
			.detail-tip {
				flex-shrink: 0;
				width: 120rpx;
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
			.order-remark{
				color: $uni-color-primary;
			}
		}
	}
}
</style>
