<template>
	<view class="container order-list-container">
		<!-- 导航栏 -->
		<navbar><view slot="contentText">账单列表</view></navbar>

		<view class="list-item" v-for="(item, index) in orderList" :key="index"><order-item :order-data="item" /></view>

		<empty-data noDataDesc="暂无订单" v-if="!pageLoading && !orderList.length" />
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
			pageSize: 10,
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
		uni.stopPullDownRefresh();
	},
	// 上拉加载下一页
	onReachBottom() {
		if (this.orderList.length < this.totalSize) {
			this.page += 1;
			this.getOrderList();
		}
	},

	methods: {
		getOrderList(page = this.page) {
			 
			const orderList = this.orderList;

			this.$api({
				url: '/order/list',
				data: {
					page,
					pageSize: this.pageSize,
					lastId: orderList.length ? orderList[orderList.length - 1]['_id'] : ''
				}
			})
				.then(res => {
					if (res && res.list) {
						this.totalSize = res.total;
						this.orderList = page === 1 ? res.list : orderList.concat(res.list);
					}
				})
				.catch(e => {
					this.$common.toast(e.msg);
				})
				.finally(() => {
					if (this.pageLoading) {
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
}
</style>
