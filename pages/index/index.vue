<template>
	<view class="container">

		<!-- 顶部金额区域 -->
		<view class="page-top-wrap">
			<!-- 内容区 -->
			<view class="page-top-content flex">
				<!-- 日历 -->
				<rili />

				<!-- 余额 -->
				<view class="balance-wrap text-center">
					<view class="balance-content ">
						<text class="money-tip">￥</text>
						<text class="money-num">{{balance}}</text>
					</view>

					<view class="balance-tip ">
						<text class="icons icon-qianbao"></text>
						<text>当前余额</text>
					</view>
				</view>

				<!-- 天气。这里放一些css实现的天气等图形，可以手动切换显示 -->
				<!-- https://blog.csdn.net/wewfdf/article/details/101389920 -->
				<!-- https://blog.csdn.net/wewfdf/article/details/102887792 -->
				<view></view>

			</view>

			<!-- 海浪背景 -->
			<bolang></bolang>
		</view>

		<!-- 中间部分展示最近的几条记录 -->
		<view class="page-middle-wrap">

			<view class="last-order-title flex flex-align">
				<text class="title">最新</text>

				<navigator url="/pages/order/orderList" hover-class="a-hover" class="more-order-title">
					<text>查看更多 </text>
					<text class="icons icon-jiantou_you"></text>
				</navigator>
			</view>
			<view class="order-list-wrap">
				<order-item v-for="(item, index) in orderList" :key="index" :order-data="item" />
			</view>
		</view>

	</view>
</template>

<script>
	import rili from '@/component/rili.vue'
	import bolang from '@/component/bolang.vue'
	import orderItem from '../order/orderItem.vue'

	export default {
		data() {
			return {
				balance: '',
				orderList: [],
			}
		},

		onLoad() {
			this.getOrderList();
		},

		// 下拉刷新
		async onPullDownRefresh() {
			await this.getBalance();
			uni.startPullDownRefresh();
		    this.getOrderList();
		},

		methods: {
			// 获取最新余额
			getBalance() {
				return this.$api({
					url: '/main/getBalance',
					data: {
						userId: 1
					}
				}).then(res => {
					if (res) {
						this.balance = res.data;
						return res;
					}
				}).catch(e => {
					this.$toast(e.msg);
				}).finally(() => {
				})
			},

			getOrderList() {
				this.$api({
					url: '/order/list',
					data: {
						page: 1,
						pageSize: 10
					}
				}).then(res => {
					if (res && res.list) {
						// 只取前10条
						let num = res.list.length;
						if (num > 10) {
							num = 10
						}
						this.orderList = res.list.splice(0, num);
					}
				}).catch(e => {
					this.$toast(e.msg);
				}).finally()
			},

		},

		components: {
			rili,
			bolang,
			orderItem
		},
	}
</script>

<style lang="scss">
	.page-top-wrap {
		width: 100%;
		height: 400rpx;
		position: relative;

		.page-top-content {
			width: 100%;
			height: 100%;
			padding: 32rpx 32rpx;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 10;

			.balance-wrap {
				width: 100%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);

				.balance-content {
					font-size: 36rpx;
					font-weight: bold;

					.money-tip {
						margin-left: -24rpx;
					}

					.money-num {
						font-size: 80rpx;
					}

				}

				.balance-tip {
					color: #a4a4a4;

					.icon-qianbao {
						color: #ddca26;
					}
				}
			}

		}

	}

	.page-middle-wrap {
		// position: relative;

		.last-order-title {
			width: 100%;
			justify-content: space-between;
			padding: 24rpx 32rpx 24rpx 32rpx;
			background: #e5e5e5;
			position: sticky;
			top: 0;

			.title {
				font-size: 40rpx;
				color: #000;
			}

			.more-order-title {
				align-self: flex-end;
				color: #666;
			}
		}
	}
</style>
