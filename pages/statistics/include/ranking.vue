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
						<text v-show="rankingDateType === 0">月</text>
						<text v-show="rankingDateType === 1">年</text>
						<text v-show="swiperIndex === 0">支出</text>
						<text v-show="swiperIndex === 1">收入</text>
						榜前十
					</text>
					<!-- 这里动态变年月周 -->
				</view>

				<view class="change-ranking-btn" @tap="changeRanking">
					<text class="icons change-ranking-icon"></text>
					<text>切换榜单</text>
				</view>
			</view>

			<j-swiper :swiperLen="2" @swiperChange="changeSwiper" :swiperIdx="swiperIndex">
				<!-- 支出降序 -->
				<view class="j-swiper-item">
					<view class="ranking-order-item" v-for="(item, index) in expenditureTopOrders" :key="index"><order-item :order-data="item" /></view>
					<empty-data noDataDesc="暂无订单" v-if="!expenditureTopOrders.length" />
				</view>
				<!-- 收入降序 -->
				<view class="j-swiper-item">
					<view class="ranking-order-item" v-for="(item, index) in incomeTopOrders" :key="index"><order-item :order-data="item" /></view>
					<empty-data noDataDesc="暂无订单" v-if="!incomeTopOrders.length" />
				</view>
			</j-swiper>
		</view>
	</view>
</template>

<script>
import jSwiper from '@/component/jSwiper.vue';
import orderItem from '../../order/orderItem.vue';
export default {
	props: {
		// 最高排行数组
		incomeTopOrders: {
			type: Array,
			default() {
				return [];
			}
		},
		// 最低排行数组
		expenditureTopOrders: {
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
		}
	},
	data() {
		return {
			swiperIndex: 0 // 当前swiper所在的current
		};
	},
	created() {},
	methods: {
		// 滑动swiper
		changeSwiper(e) {
			this.swiperIndex = e;
		},
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
	components: { orderItem, jSwiper }
};
</script>

<style lang="scss">
.ranking-wrap {
	margin-bottom: 60rpx;
	.ranking-wrap-item {
		.ranking-title-wrap {
			padding: 16rpx 20rpx;
			justify-content: space-between;
			margin-bottom: 20rpx;
			position: sticky;
			top: 0;
			z-index: 10;
			background-color: #fff;
			border-bottom: 1px solid #f4f4f4;

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
				.change-ranking-icon{
					background-position: -96rpx 0;
					top: 6rpx;
					left: -4rpx;
				}
			}
		}
	}
}
</style>
