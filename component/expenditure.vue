<template>
	<view class="expenditure-wrap flex">
		<view :class="['expenditure-item', { active: item._id === selectedId }]" v-for="(item, index) in expenditureList" :key="index" @tap="chooseExpenditure(item)">
			<view class="icons flex flex-align flex-justify"><image :src="item.goodsImg" class="goods-img"></image></view>
			<view class="expenditure-name">{{ item.goodsName }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			selectedId: null,
			expenditureList: []
		};
	},
	created() {
		const { goodsArray } = this.$store.state.userInfo;
		if(goodsArray && goodsArray.length){
			this.expenditureList = goodsArray.filter(item => item.goodsType === 1);
		}
	},
	methods: {
		chooseExpenditure(expenditure) {
			this.selectedId = expenditure._id;
			this.$emit('chooseExpenditure', expenditure);
		}
	}
};
</script>

<style lang="scss">
.expenditure-wrap {
	flex-wrap: wrap;
	.expenditure-item {
		font-size: 24rpx;
		color: #999;
		text-align: center;
		margin: 0 20rpx 30rpx 0;
		.icons {
			width: 90rpx;
			height: 90rpx;
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
			.icons {
				background: #78e197;
			}
			.expenditure-name {
				color: #000;
			}
		}
	}
}
</style>
