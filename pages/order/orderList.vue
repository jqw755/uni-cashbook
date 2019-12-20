<template>
	<view class="container order-list-container">
		<!-- 导航栏 -->
		<navbar><view slot="contentText">账单列表</view></navbar>

		<view class="list-item" v-for="(item, index) in orderList" :key="index"><order-item :order-data="item" /></view>

		<view class="order-page-no-data" v-if="!pageLoading && !orderList.length"><empty-data noDataDesc="暂无订单" /></view>
	</view>
</template>

<script>
import orderItem from './orderItem.vue';

export default {
	data() {
		return {
			pageLoading: true,
			orderList: [],
			page: 1,
			pageSize: 20,
			totalSize: 0 // 总条数
		};
	},

	onLoad() {
		this.getOrderList(this.page);
	},

	// 下拉刷新
	onPullDownRefresh() {
		this.page = 1;
		this.getOrderList();
		uni.startPullDownRefresh();
	},
	// 上拉加载下一页
	onReachBottom() {
		if (this.totalSize < this.orderList.length) {
			this.page += 1;
			this.getOrderList();
			uni.startPullDownRefresh();
		}
	},

	methods: {
		getOrderList(page = this.page) {
			return this.$api({
				url: '/order/list',
				data: {
					page,
					pageSize: this.pageSize
				}
			})
				.then(res => {
					if (res && res.list) {
						this.orderList = res.list;
						return res;
					}
				})
				.catch(e => {
					this.$common.toast(e.msg);
				})
				.finally(() => {
					if (page === 1) {
						this.pageLoading = false;
					}
				});
		}
	},

	components: {
		orderItem
	}
};
</script>

<style lang="scss">
.order-list-container {
	background: #fff;
	.order-page-no-data {
		margin-top: 150rpx;
	}
}
</style>
