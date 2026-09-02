<template>
	<view class="income-wrap flex">
		<view :class="['income-item', { active: item._id === selectedId }]" v-for="(item, index) in incomeList" :key="index" @tap="chooseIncome(item)">
			<view class="goods-img-wrap flex flex-align flex-justify"><image :src="item.goodsImg" class="goods-img"></image></view>
			<view class="income-name">{{ item.goodsName }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			selectedId: null,
			incomeList: []
		};
	},
	created() {
		const { goodsArray } = this.$store.state.userInfo;
		if (goodsArray && goodsArray.length) {
			this.incomeList = goodsArray.filter(item => item.goodsType === 2);
		}
	},
	methods: {
		chooseIncome(income) {
			this.selectedId = income._id;
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
		margin: 0 20rpx 30rpx 0;
		.goods-img-wrap {
			width: 80rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 50%;
			font-size: 46rpx;
			color: #000;
			background: #f4f4f4;
			.goods-img {
				width: 64rpx;
				height: 64rpx;
			}
		}
		&.active {
			.goods-img-wrap {
				background: #f3de76;
			}
			.income-name {
				color: #000;
			}
		}
	}
}
</style>
