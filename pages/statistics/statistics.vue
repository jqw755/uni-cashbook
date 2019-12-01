<template>
	<!-- 统计图 -->
	<view class="container statistics-container">
		<!-- 日期筛选 -->
		<view class="by-wrap by-date-wrap">
			<!-- 这里用背景图装饰 -->
			<view class="by-title-wrap">
				<text class="by-title-tip">日期</text>
				<text class="by-title-desc">按日期查看走势</text>
			</view>

			<view class="date-com-wrap"><byDate @chooseDateView="chooseDateView" @chooseDate="chooseDate" /></view>
		</view>

		<!-- 分类筛选 -->
		<view class="by-wrap by-cate-wrap">
			<view class="by-title-wrap">
				<text class="by-title-tip cate-title">分类</text>
				<text class="by-title-desc">按收入/支出查看走势</text>
			</view>

			<!-- 分类列表 -->
			<view class="cate-list-wrap">
				<view class="by-income-wrap">
					<text>收入：</text>
					<income />
				</view>	
				
				<view class="by-expenditure-wrap">
					<text>支出：</text>
					<expenditure />
				</view>
			</view>
		</view>

		<!-- 图表 -->
		<chart />

		<!-- 排行，最高最低的前十 -->
		<ranking />
	</view>
</template>

<style lang="scss">
.statistics-container {
	background: #fff;

	.by-wrap {
		.by-title-wrap {
			padding: 20rpx 20rpx;
			background: #f4f4f4;
			.by-title-tip {
				font-size: 40rpx;
				font-weight: bold;
				margin-right: 20rpx;
				padding-left: 16rpx;
				position: relative;
				&::before {
					content: '';
					display: block;
					width: 8rpx;
					height: 80%;
					background: #1fd7bd;
					position: absolute;
					left: 0;
					top: 10%;
					border-radius: 4rpx;
				}
				&.cate-title{
					&::before {
						background: #ffde3f;
					}
				}
			}
			.by-title-desc {
				color: #999;
				font-size: 26rpx;
			}
		}

		&.by-date-wrap {
			.date-com-wrap {
				padding: 32rpx 52rpx;
			}
		}

		&.by-cate-wrap {
			margin-bottom: 40rpx;
			.cate-list-wrap{
				padding: 32rpx 52rpx;
			}
		}
	}
}
</style>

<script>
import utils from '@/common/utils.js';

import byDate from './include/date.vue';
import chart from './include/chart.vue';
import ranking from './include/ranking.vue';
import income from '@/component/income.vue';
import expenditure from '@/component/expenditure.vue';

export default {
	data() {
		return {
			dateResult: '' // 选中的日期
		};
	},

	onLoad() {},

	methods: {
		// 切换日期视图，要设置默认时间
		chooseDateView(res) {
			if (res === 0) {
				const currentDate = utils.formatDate(Date.now(), 'yyyy-MM');
				this.dateResult = currentDate;
			}
			if (res === 1) {
				this.dateResult = new Date().getFullYear();
			}
		},

		// 选择日期
		chooseDate(res) {
			this.dateResult = res;
		}
	},

	components: { byDate, ranking, chart, income, expenditure }
};
</script>