<template>
	<view class="income-wrap flex">
		<view :class="['income-item', { active: item.id === selectedId }]" v-for="(item, index) in incomeList" :key="index" @tap="chooseIncome(item)">
			<view :class="['icons', item.icon]"></view>
			<view class="income-name">{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			selectedId: 0,
			incomeList: [
				{
					id: 0,
					name: '生活费',
					icon: 'icon-shenghuofei1'
				},
				{
					id: 1,
					name: '兼职',
					icon: 'icon-jianzhi'
				}
			
			]
		};
	},
	created() {},
	methods: {
		chooseIncome(income) {
			this.selectedId = income.id;
			this.$emit('chooseIncome', income);
		}
	}
};
</script>

<style lang="scss">
.income-wrap {
	flex-wrap: wrap;
	.income-item {
		font-size: 24rpx;
		color: #999;
		text-align: center;
		margin: 0 30rpx 30rpx 0;
		.icons {
			width: 80rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 50%;
			font-size: 46rpx;
			color: #000;
			background: #f4f4f4;
		}
		&.active {
			.icons {
				background: #ffde3f;
			}
			.income-name {
				color: #000;
			}
		}
	}
}
</style>
