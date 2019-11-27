<template>
	<view class="flex flex-align">
		<!-- 筛选视图 -->
		<view class="choose-date-type">
			<picker @change="chooseDateType" :value="dataIndex" :range="dateView">
				<view class="view-text">{{ dateView[dataIndex] }}</view>
			</picker>
		</view>

		<!-- 日期选择弹窗 -->
		<view class="date-popup">
			<picker mode="date" :fields="dateFields" :value="dateResult" :start="startDate" :end="endDate" @change="bindDateChange">
				<text class="date-text">{{ dateResult || '请选择日期' }}</text>
			</picker>
		</view>
	</view>
</template>

<script>
import utils from '@/common/utils.js';

export default {
	data() {
		return {
			dataIndex: 0,
			dateView: ['月视图', '年视图'],
			dateFields: 'month',
			dateResult: '',
			startDate: '2016-01',
			endDate: ''
		};
	},

	created() {
		// 当前和结束时间默认都是本月
		const currentDate = utils.formatDate(Date.now(), 'yyyy-MM');

		this.setDataVar({
			end: currentDate,
			date: currentDate
		});
	},

	methods: {
		// 视图改变
		chooseDateType(e) {
			const id = e.target.value;
			if (this.dataIndex === id) {
				return;
			}

			// 切换月视图
			if (id === 0) {
				const currentDate = utils.formatDate(Date.now(), 'yyyy-MM');

				this.setDataVar({
					end: currentDate,
					date: currentDate
				});
			}
			// 切换年视图
			else if (id === 1) {
				const y = String(new Date().getFullYear());

				this.setDataVar({
					fileds: 'year',
					start: '2016',
					end: y,
					date: y
				});
			}

			this.dataIndex = id;
			this.$emit('chooseDateView', id);
		},

		// 改变data中定义的变量，不写那么多重复赋值代码
		setDataVar({ fileds = 'month', start = '2016-01', end = '', date = '' }) {
			this.dateFields = fileds;
			this.startDate = start;
			this.endDate = end;
			this.dateResult = date;
		},

		// 日期改变
		bindDateChange(e) {
			this.dateResult = e.target.value;
			this.$emit('chooseDate', e.target.value);
		}
	}
};
</script>

<style lang="scss">
.choose-date-type {
	margin-right: 40rpx;
	.view-text {
		color: #1fd7bd;
		position: relative;
		&:after {
			content: '';
			display: inline-block;
			width: 60%;
			height: 6rpx;
			background: #1fd7bd;
			border-radius: 4rpx;
			position: absolute;
			bottom: -8rpx;
			left: 50%;
			transform: translateX(-40%);
		}
	}
}

.date-popup {
	color: #1fd7bd;
	position: relative;
	.date-text {
		&:after {
			content: '';
			display: inline-block;
			width: 60%;
			height: 6rpx;
			background: #1fd7bd;
			border-radius: 4rpx;
			position: absolute;
			bottom: -10rpx;
			left: 50%;
			transform: translateX(-40%);
		}
	}
}
</style>
