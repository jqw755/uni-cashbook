<template>
	<view class="container order-list-container">
		<!-- 导航栏 -->
		<navbar>
			<view slot="contentText">账单列表</view>
		</navbar>

		<view class="list-item" v-for="(item,index) in orderList" :key="index">
			
			<order-item  :order-data="item" />
		</view>


	</view>
</template>

<script>
	import orderItem from './orderItem.vue'

	export default {
		data() {
			return {
				orderList: [],
				page: 1,
				pageSize: 20
			}
		},

		onLoad() {
			this.getOrderList(this.page);
		},

		onReady() {},

		methods: {
			getOrderList(page = this.page) {

				this.$api({
					url: '/order/list',
					data: {
						page,
						pageSize: this.pageSize
					}
				}).then(res => {
					if (res.list) {
						this.orderList = res.list;
					}
				}).catch(e => {
					this.$toast(e.msg);
				}).finally()
			},
		},

		components: {
			orderItem
		},
	}
</script>

<style lang="scss">
	.order-list-container {

	}
</style>
