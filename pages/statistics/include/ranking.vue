<template>
	<!-- 排行，最高最低的前十 -->
	<view class="ranking-wrap">
		<!-- 最高 -->
		<view class="ranking-wrap-item top-ranking-wrap">
			<!-- 标题、切换icon -->
			<view class="ranking-title-wrap flex flex-align">
				<view class="ranking-title">
					<text class="title-word">TOP</text>
					<text class="title-box-shadow"></text>
					<text class="title-desc">
						<text v-show="rankingDateType===0">月</text>
						<text v-show="rankingDateType===1">年</text>	
						<text v-show="swiperIndex===0">收入</text>
						<text v-show="swiperIndex===1">支出</text>
						榜前十
					</text>
					<!-- 这里动态变年月周 -->
				</view>

				<view class="change-ranking-btn icons icon-qiehuan" @tap="changeRanking">切换榜单</view>
			</view>

			<swiper class="ranking-order-swiper" :current="swiperIndex">
				<!-- 最高 -->
				<swiper-item>
					<view class="ranking-order-item" v-for="(item, index) in rankingTopOrders" :key="index"><order-item :order-data="item" /></view>
				</swiper-item>

				<!-- 最低 -->
				<swiper-item>
					<view class="ranking-order-item" v-for="(item, index) in rankingLastOrders" :key="index"><order-item :order-data="item" /></view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import orderItem from '../../order/orderItem.vue';
export default {
	props: {
		// 最高排行数组
		rankingTopOrders: {
			type: Array,
			default() {
				return [];
			}
		},
		// 最低排行数组
		rankingLastOrders: {
			type: Array,
			default() {
				return [];
			}
		},
		// 日期排行榜类型 （年，月） 根据页面上日期筛选类型展示
		rankingDateType: {
			type: Number,
			default() {
				return 0;
			}
		},
	},
	data() {
		return {
			swiperIndex: 0, // 当前swiper所在的current
		};
	},
	created() {},
	methods: {
		changeRanking() {
			switch (this.swiperIndex) {
				case 0:
					this.swiperIndex = 1;
					break;
				case 1:
					this.swiperIndex = 0;
					break;
			}
		}
	},
	components: { orderItem }
};
</script>

<style lang="scss">
.ranking-wrap {
	margin-bottom: 60rpx;
	.ranking-wrap-item {
		.ranking-title-wrap {
			padding: 0 20rpx;
			justify-content: space-between;
			margin-bottom: 20rpx;

			.ranking-title {
				position: relative;

				.title-word {
					font-size: 46rpx;
					color: #1ab959;
					font-weight: bold;
					margin-right: 10rpx;
					position: relative;
					z-index: 1;
				}
				.title-box-shadow {
					width: 90rpx;
					height: 30rpx;
					border-radius: 6rpx;
					position: absolute;
					left: 14rpx;
					bottom: 0;
					background: rgba(119, 213, 88, 0.3);
					z-index: 0;
				}
				.title-desc {
					font-size: 26rpx;
					color: #aaa;
				}
			}

			.change-ranking-btn {
				font-size: 24rpx;
				color: rgb(149, 113, 233);
			}
		}
	}
}
</style>
