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
				<!-- 支出 -->
				<view class="cate-item-wrap by-expenditure-wrap">
					<view class="by-cate-title flex flex-align" @tap="tapCateTitle(2)">
						<text>支出：{{ expenditureSelObj.name }}</text>
						<text :class="['icons icon-arrow-down icon-xiajiantou', { 'icon-rotate': isShowExpend }]"></text>
					</view>

					<view :class="['page-cate-list-wrap', { down: isShowExpend }]">
						<view class="page-cate-list-content"><expenditure @chooseExpenditure="chooseExpenditure" /></view>
					</view>
				</view>

				<!-- 收入 -->
				<view class="cate-item-wrap by-income-wrap">
					<view class="by-cate-title flex flex-align" @tap="tapCateTitle(1)">
						<text>收入：{{ incomeSelObj.name }}</text>
						<text :class="['icons icon-arrow-down icon-xiajiantou', { 'icon-rotate': isShowIncome }]"></text>
					</view>

					<view :class="['page-cate-list-wrap', { down: isShowIncome }]">
						<view class="page-cate-list-content"><income @chooseIncome="chooseIncome" /></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 图表 -->
		<chart :chartDataProp="chartData"/>

		<!-- 排行，最高最低的前十 -->
		<ranking :rankingTopOrders="rankingTopOrders" :rankingLastOrders="rankingLastOrders" :rankingDateType="rankingDateType" />
	</view>
</template>

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
			dateResult: '', // 选中的日期

			isShowIncome: false, // 是否展示更多收支类型
			isShowExpend: false, // 是否展示更多支出类型

			incomeSelObj: {}, // 选中的收入数组

			expenditureSelObj: {}, // 选中的支出数组

			rankingDateType: 0, // 根据页面上日期筛选类型展示

			rankingTopOrders: [], // 收入最高

			rankingLastOrders: [], // 支出最高
			
			// 图表数据
			chartData: {}
			
		};
	},

	onLoad() {
		// 默认查询本年当月数据
		const date = new Date();
		this.getRanking({ year: date.getFullYear(), month: date.getMonth() + 1 });
		// this.getRanking({year: 2019, month: 11, goodsId: "5e09bf12f3787b47aceaa892"});
		// this.getRanking({year: 2019,  month: 11});
		// this.getRanking({year: 2019, goodsId: "5e09bf12f3787b47aceaa892"});
	},

	methods: {
		// 切换日期视图，要设置默认时间
		chooseDateView(res) {
			if (res === 0) {
				const currentDate = utils.formatDate(Date.now(), 'yyyy-MM');
				this.dateResult = currentDate;
				this.rankingDateType = 0;
			}
			if (res === 1) {
				this.dateResult = new Date().getFullYear();
				this.rankingDateType = 1;
			}
		},

		// 选择日期
		chooseDate(res) {
			this.dateResult = res;
		},

		// 切换收支类型展示更多
		tapCateTitle(n) {
			switch (n) {
				case 1:
					this.isShowIncome = !this.isShowIncome;
					break;
				case 2:
					this.isShowExpend = !this.isShowExpend;
					break;
			}
		},

		// 选择收入类型
		chooseIncome(data) {
			this.incomeSelObj = data;
		},

		// 选择支出类型
		chooseExpenditure(data) {
			this.expenditureSelObj = data;
		},

		// 查询排行方法
		getRanking(params) {
			this.$api({ url: '/user/getRanking', data: { rankingParams: params } })
				.then(res => {
					if (res) {
						
						let Area = { categories: [], series: [] };
						let totalOrder = [], totalMoney = [];
						
						if(res && res.length){
							res.forEach(item => {
								Area.categories.push(item._id);
								totalOrder.push(item.totalOrder);
								totalMoney.push(item.totalMoney);
							});
							Area.series = [
								{
									name: '订单数',
									data: totalOrder,
									color: '#facc14'
								},
								{
									name: '总金额',
									data: totalMoney,
									color: '#2fc25b'
								},
							]
							this.chartData = Area;
						}
						
					}
				})
				.catch(e => {
					this.$common.toast(e.msg);
				})
				.finally(() => {});
		}
	},

	watch:{
		dateResult(val){
			const dateArr = String(val).split('-');
			let params = {
				year: dateArr[0]
			};
			if( dateArr[1]){
				Object.assign(params, {
					month: dateArr[1]
				})
			}
			// if(){
			// 	Object.assign(params, {
			// 		goodsId: params[1]
			// 	})
			// }
			
			this.getRanking(params);
		},
	},

	components: {
		byDate,
		ranking,
		chart,
		income,
		expenditure
	}
};
</script>

<style lang="scss">
.statistics-container {
	background: #fff;

	.by-wrap {
		.by-title-wrap {
			padding: 20rpx 20rpx;
			// background: linear-gradient(-90deg, #be6450, #a242eb);
			background: #f4f4f4;

			.by-title-tip {
				font-size: 40rpx;
				font-weight: bold;
				margin-right: 20rpx;
				padding-left: 16rpx;
				position: relative;
				color: #000;

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

				&.cate-title {
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

			.cate-list-wrap {
				padding: 32rpx 52rpx;

				.cate-item-wrap {
					.by-cate-title {
						height: 80rpx;
						justify-content: space-between;
						border-bottom: 1px solid #ddd;

						&:last-child {
							border-bottom: 0;
						}

						.icon-arrow-down {
							transition: all 400ms;

							&.icon-rotate {
								transform: rotate(180deg);
							}
						}
					}

					.page-cate-list-wrap {
						background: #f8f8f8;
						border-radius: 10rpx;
						transition: height 300ms;
						overflow: hidden;
						height: 0;

						.page-cate-list-content {
							padding: 20rpx 20rpx;
						}

						&.down {
							height: 240rpx;
							overflow: scroll;
						}
					}
				}
			}
		}
	}

	// 折叠面板效果
	@keyframes foldUp {
		from {
			height: 0;
		}

		to {
			height: auto;
		}
	}

	@keyframes foldDown {
		from {
			height: auto;
		}

		to {
			height: 0;
		}
	}
}
</style>
