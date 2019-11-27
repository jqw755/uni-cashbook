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
					name: '蔬菜',
					icon: 'icon-shucai'
				},
				{
					id: 1,
					name: '调料',
					icon: 'icon-tiaoliao'
				},
				{
					id: 2,
					name: '水果',
					icon: 'icon-shuiguo'
				},
				{
					id: 3,
					name: '酒水',
					icon: 'icon-jiushui'
				},
				{
					id: 4,
					name: '维修',
					icon: 'icon-weixiu'
				},
				{
					id: 5,
					name: '水费',
					icon: 'icon-shuifei'
				},
				{
					id: 6,
					name: '电费',
					icon: 'icon-dianfei'
				},
				{
					id: 7,
					name: '煤气费',
					icon: 'icon-tianranqi'
				},
				{
					id: 8,
					name: '聚会',
					icon: 'icon-juhuibaomingx'
				},
				{
					id: 9,
					name: '电影票',
					icon: 'icon-dianyingpiao'
				},
				{
					id: 10,
					name: 'K歌',
					icon: 'icon-kge'
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
				background: #32d446;
			}
			.income-name {
				color: #000;
			}
		}
	}
}
</style>
