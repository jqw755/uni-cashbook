<template>
	<view class="charts-content-wrap">
		<!-- 图表 -->
		<view class="qiun-columns">
			<view class="qiun-charts">
				<canvas canvas-id="canvasArea" id="canvasArea" class="charts" disable-scroll="true" @touchstart="touchArea" @touchmove="moveArea" @touchend="touchEndArea"></canvas>
			</view>
		</view>
	</view>
</template>

<script>

import uCharts from '@/component/u-charts/u-charts.js';

// 定义全局this canvasId canvaArea
let _self = null,
	canvasId = 'canvasArea',
	canvaArea = null;

export default {
	props:{
		chartDataProp: {
			type: Object,
			default(){
				return {
					categories: [],
					series: []
				}
			}
		}
	},
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,

			// 模拟图表数据
			chartData: {
				categories: [], // '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'
				series: [
					// {
					// 	name: '订单总数',
					// 	data: [100, 80, 95, 150, 112, 132, 100, 50],
					// 	color: '#facc14'
					// },
					// {
					// 	name: '支出总数',
					// 	data: [70, 40, 65, 100, 44, 68, 50, 96],
					// 	color: '#2fc25b'
					// },
					// {
					// 	name: '收入总数',
					// 	data: [35, 20, 25, 37, 4, 20, 23, 30],
					// 	color: '#1890ff'
					// }
				]
			}
		};
	},
	created() {
		_self = this;

		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);

		// 调用初始化图表方法
		this.showArea('canvasArea', this.chartData);
	},
	methods: {

		// 绘制图表
		showArea(canvasId, chartData) {
			canvaArea = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'area',
				fontSize: 12,
				legend: true,
				dataLabel: false,
				dataPointShape: true,
				rotate: false, // 横屏模式展示图表
				enableScroll: true, // 是否可以拖拽滚动
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				xAxis: {
					type: 'grid',
					gridColor: '#CCCCCC',
					gridType: 'dash',
					dashLength: 4,
					itemCount: 12, //x轴单屏显示数据的数量，默认为5个
					scrollShow: true, //新增是否显示滚动条，默认false
					scrollAlign: 'left', //滚动条初始位置
					scrollBackgroundColor: '#F7F7FF' //默认为 #EFEBEF
					//scrollColor: '#DEE7F7' //默认为 #A6A6A6
				},
				yAxis: {
					gridType: 'dash',
					gridColor: '#CCCCCC',
					dashLength: 4,
					splitNumber: 5,
					// min: 10,
					// max: 180
				},
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					area: {
						type: 'curve',
						opacity: 0.2,
						addLine: true,
						width: 2
					}
				}
			});
		},

		// 滚动x轴
		touchArea(e) {
			canvaArea.scrollStart(e);
		},

		moveArea(e) {
			canvaArea.scroll(e);
		},
		touchEndArea(e) {
			canvaArea.scrollEnd(e);
			// 触摸图表显示tooltip
			canvaArea.showToolTip(e, {
				format: function(item, category) {
					return category + ' ' + item.name + ':' + item.data;
				}
			});
		}
	},
	
	watch:{
		chartDataProp(obj){
			_self.showArea('canvasArea', obj);
			// this.chartData = obj;
		}
		
	}
	
};
</script>

<style lang="scss">
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
</style>
