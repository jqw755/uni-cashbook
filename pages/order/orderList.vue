<template>
	<view class="container order-list-container">
		<!-- 导航栏 -->
		<navbar>
			<view slot="contentText">账单列表</view>
		</navbar>

		<view class="list-item" v-for="(item, index) in orderList" :key="index">
			<order-item :order-data="item" />
		</view>
	</view>
</template>

<script>
	import orderItem from './orderItem.vue';

	export default {
		data() {
			return {
				orderList: [],
				page: 1,
				pageSize: 20,
				totalSize: 0, // 总条数
			};
		},

		onLoad() {
			this.getOrderList(this.page);
		},

		// 下拉刷新
		onPullDownRefresh() {
			this.page = 1;
			this.getOrderList();
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
						this.$toast(e.msg);
					})
					.finally(() => {});
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
