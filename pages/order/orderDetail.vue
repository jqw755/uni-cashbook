<template>
	<view class="container order-list-container">
		<!-- 导航栏 -->
		<navbar>
			<view slot="contentText">详情</view>
		</navbar>

		<view class="" >
			
		
		</view>


	</view>
</template>

<script>

	export default {
		data() {
			return {
			}
		},

		onLoad() {
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
		},
	}
</script>

<style lang="scss">

</style>
