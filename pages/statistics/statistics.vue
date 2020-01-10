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
						<text>支出：{{ expenditureSelObj.goodsName||'' }}</text>
						<text :class="['icons icon-arrow-down', { 'icon-rotate': isShowExpend }]"></text>
					</view>

					<view :class="['page-cate-list-wrap', { down: isShowExpend }]">
						<view class="page-cate-list-content"><expenditure @chooseExpenditure="chooseExpenditure" /></view>
					</view>
				</view>

				<!-- 收入 -->
				<view class="cate-item-wrap by-income-wrap">
					<view class="by-cate-title flex flex-align" @tap="tapCateTitle(1)">
						<text>收入：{{ incomeSelObj.goodsName||'' }}</text>
						<text :class="['icons icon-arrow-down', { 'icon-rotate': isShowIncome }]"></text>
					</view>

					<view :class="['page-cate-list-wrap', { down: isShowIncome }]">
						<view class="page-cate-list-content"><income @chooseIncome="chooseIncome" /></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 图表 -->
		<chart :chartDataProp="chartData" />

		<!-- 排行，最高最低的前十 -->
		<ranking :incomeTopOrders="incomeTopOrders" :expenditureTopOrders="expenditureTopOrders" :rankingDateType="rankingDateType" />
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

			incomeTopOrders: [], // 收入最高

			expenditureTopOrders: [], // 支出最高

			// 图表数据
			chartData: {}
		};
	},

	onLoad() {
		// 默认查询本年当月数据
		const date = new Date();
		const year = date.getFullYear(),
			month = date.getMonth() + 1;

		const a = this.getRanking({ year, month });
		const b = this.getTopAndLast({ year, month, orderType: 1 });
		const c = this.getTopAndLast({ year, month, orderType: 2 });
		uni.showLoading()
		Promise.all([a, b, c]).then(()=>{
			uni.hideLoading()
		})
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

			// 日期改变，更新图表
			this.updateChartByDate();
		},

		// 选择日期  res: '2019-11' || '2019'
		chooseDate(res) {
			this.dateResult = res;
			// 日期改变，更新图表
			this.updateChartByDate();
		},

		/* date: '2019-11' || '2019'*/
		updateChartByDate(date = this.dateResult, goodsId) {
			const dateArr = String(date).split('-');
			let params = {
				year: dateArr[0]
			};
			if (dateArr[1]) {
				Object.assign(params, {
					month: dateArr[1]
				});
			}
			if (goodsId) {
				Object.assign(params, { goodsId });
			}

			const a = this.getRanking(params);
			// 消费最高的十个
			const b = this.getTopAndLast({ ...params, orderType: 1 });
			// 最低的十个
			const c = this.getTopAndLast({ ...params, orderType: 2 });
			
			uni.showLoading()
			Promise.all([a, b, c]).then(()=>{
				uni.hideLoading()
			})
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
			// 收入类型改变，更新图表
			this.updateChartByDate(this.dateResult, data._id);
		},

		// 选择支出类型
		chooseExpenditure(data) {
			this.expenditureSelObj = data;
			// 收入类型改变，更新图表
			this.updateChartByDate(this.dateResult, data._id);
		},

		// 查询排行方法
		getRanking(params) {
			return this.$api({ url: '/user/getRanking', data: { rankingParams: params }, notLoading: true })
				.then(res => {
					if (res) {
						let Area = { categories: [], series: [] };
						let totalOrder = [],
							totalMoney = [];

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
							}
						];

						this.chartData = Area;
						return 1;
					}
				})
				.catch(e => {
					this.$common.toast(e.msg);
				})
				.finally(() => {});
		},

		// 获取最值
		getTopAndLast(params) {
			return this.$api({ url: '/user/getTopAndLast', data: { rankingParams: params }, notLoading: true })
				.then(res => {
					if (res) {
						if (params.orderType === 2) {
							this.incomeTopOrders = res;
						} else {
							this.expenditureTopOrders = res;
						}
						return 1;
					}
				})
				.catch(e => {
					this.$common.toast(e.msg);
				})
				.finally(() => {});
		}
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
	width: 100%;
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
							transition: transform 300ms;

							&.icon-rotate {
								transform: rotate(90deg);
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
