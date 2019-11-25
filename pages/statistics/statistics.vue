<template>
	<view class="container statistics-container">
		<!-- 统计图 -->
		<view class="statistics-charts-wrap">
			<!-- 统计图表,按年月；分类筛选，给出消费和收入两种类型的对比 -->
			<view class="by-wrap by-date-wrap">
				<!-- 这里用背景图装饰 -->
				<view class="by-title-wrap">
					<text class="by-title-tip">日期</text>
					<text class="by-title-desc">按日期查看统计走势</text>
				</view>

				<view class="choose-date-wrap">
					<text class="date-type">月</text>
					<text class="ate-content">2019-11</text>
				</view>
			</view>

			<view class="by-wrap by-cate-wrap">
				<view class="by-title-wrap">
					<text class="by-title-tip">分类</text>
					<text class="by-title-desc">按收入/支出查看统计走势</text>
				</view>
				<!-- 分类列表 -->
				<view class="">
					
				</view>
			</view>

			<view class="charts-content-wrap">
				<!-- 图表 -->
				<view class="qiun-columns">
					<view class="qiun-bg-white qiun-title-bar qiun-common-mt"><view class="qiun-title-dot-light">基本区域图</view></view>
					<view class="qiun-charts">
						<canvas canvas-id="canvasArea" id="canvasArea" class="charts" @touchstart="touchArea"></canvas>
					</view>
				</view>
			</view>
		</view>

		<!-- 排行，最高最低的前十 -->
		<view class="ranking-wrap">
			<!-- 最高 -->
			<view class="ranking-wrap-item top-ranking-wrap">
				<view class="ranking-title">
					<text class="title-word">TOP</text>
					<text class="title-box-shadow"></text>
					<text class="title-desc">周收入/支出榜前十</text>
					<!-- 这里动态变年月周 -->
				</view>
				<view class="ranking-order-wrap"></view>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
.statistics-container {
	background: #fff;
	.statistics-charts-wrap {
		margin-bottom: 60rpx;
		.by-wrap {
			.by-title-wrap {
				padding: 10rpx 32rpx;
				background: #f4f4f4;
				.by-title-tip {
					font-size: 40rpx;
					font-weight: bold;
					color: #000;
					margin-right: 20rpx;
				}
				.by-title-desc {
					color: #999;
					font-size: 24rpx;
				}
			}

			&.by-date-wrap {
				.choose-date-wrap {
					padding: 0 32rpx;
					.date-type {
					}
					.ate-content {
					}
				}
			}

			&.by-cate-wrap {
				margin-bottom: 20rpx;
			}
		}

		.charts-content-wrap {
			padding: 0 32rpx;

			.qiun-charts {
				width: 100%;
				height: 500rpx;
				background-color: #ffffff;
			}

			.charts {
				width: 100%;
				height: 500rpx;
				background-color: #ffffff;
			}
		}
	}

	.ranking-wrap {
		.ranking-wrap-item {
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
					left: 20rpx;
					bottom: -2rpx;
					background: rgba(119, 213, 88, 0.3);
					z-index: 0;
				}
				.title-desc {
					font-size: 26rpx;
					color: #aaa;
				}
			}
		}
	}
}
</style>

<script>
import uCharts from '@/component/u-charts/u-charts.js';
var _self;
var canvaArea = null;
export default {
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1
		};
	},
	onLoad() {
		_self = this;
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		this.getServerData();
	},
	methods: {
		getServerData() {
			uni.request({
				url: 'https://www.ucharts.cn/data.json',
				data: {},
				success: function(res) {
					console.log(res.data.data);
					let Area = { categories: [], series: [] };
					//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
					Area.categories = res.data.data.Area.categories;
					Area.series = res.data.data.Area.series;
					_self.showArea('canvasArea', Area);
				},
				fail: () => {
					_self.tips = '网络错误，小程序端请检查合法域名';
				}
			});
		},
		showArea(canvasId, chartData) {
			canvaArea = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'area',
				fontSize: 11,
				legend: true,
				dataLabel: false,
				dataPointShape: true,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				xAxis: {
					type: 'grid',
					gridColor: '#CCCCCC',
					gridType: 'dash',
					dashLength: 8
				},
				yAxis: {
					gridType: 'dash',
					gridColor: '#CCCCCC',
					dashLength: 8,
					splitNumber: 5,
					min: 10,
					max: 180
				},
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					area: {
						type: 'straight',
						opacity: 0.2,
						addLine: true,
						width: 2
					}
				}
			});
		},
		touchArea(e) {
			canvaArea.showToolTip(e, {
				format: function(item, category) {
					return category + ' ' + item.name + ':' + item.data;
				}
			});
		}
	}
};
</script>
