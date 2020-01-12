<template>
	<view class="bookkeep-wrap">
		<!-- 导航栏 -->
		<navbar bgImage="linear-gradient(-90deg, #3dbd4d, #e2b229)"><text slot="backText">记账</text></navbar>

		<!-- 收支类型 -->
		<view class="type-tab-wrap flex flex-align flex-justify">
			<text :class="['tab-item', { active: item.id === currentTab }]" v-for="(item, index) in tabList" :key="index" @tap="changeTab(item.id)">{{ item.name }}</text>
		</view>
		<swiper class="type-swiper" duration="300" :current="currentTab" @change="slideSwiper">
			<swiper-item><expenditure @chooseExpenditure="chooseExpenditure" /></swiper-item>

			<swiper-item><income @chooseIncome="chooseIncome" /></swiper-item>
		</swiper>

		<view class="form-wrap">
			<!-- 金额 -->
			<view class="form-item">
				<view class="item-title">{{ tabList[currentTab].name }}金额（元）</view>
				<input type="digit" v-model="money" class="item-ipt" placeholder="请输入金额" />
			</view>

			<!-- 时间 -->
			<view class="form-item">
				<view class="item-title">{{ tabList[currentTab].name }}时间</view>
				<view :class="['item-ipt', { 'no-sel-time': !payTime }]" @click="openDatetimePicker">{{ payTime ? payTime : '请选择时间' }}</view>
			</view>

			<!-- 备注 -->
			<view class="form-item">
				<view class="item-title">备注</view>
				<textarea class="item-ipt item-text-area" placeholder="请输入备注" maxlength="200" v-model="remark" />
			</view>

			<view class="submit-form text-center" hover-class="hover-class" @tap="submitFormEvt">提交</view>
		</view>

		<!-- 时间 picker -->
		<date-time-picker ref="myPicker" @submit="dateTimeSubmit" />
	</view>
</template>
<script>
import income from '@/component/income.vue';
import expenditure from '@/component/expenditure.vue';
import dateTimePicker from '@/component/datetime-picker.vue';
import utils from '@/common/utils.js';

export default {
	data() {
		return {
			currentTab: 0,

			tabList: [{ id: 0, name: '支出' }, { id: 1, name: '收入' }],

			goodsObj: {}, // 选中的支出/收入

			incomeObj: {}, // 选中的收入
			expenditureObj: {}, // 选中的支出

			money: '', //
			payTime: '', //
			remark: '' //
		};
	},

	onLoad() {},

	methods: {
			
		// 点击tab
		changeTab(id) {
			this.currentTab = id;
		},

		// 滑动swiper
		slideSwiper(e) {
			this.currentTab = e.mp.detail.current;
		},

		// 选择收入类型
		chooseIncome(data) {
			this.incomeObj = data;
		},

		// 选择支出类型
		chooseExpenditure(data) {
			this.expenditureObj = data;
		},

		// 打开时间picker
		openDatetimePicker() {
			this.$refs.myPicker.show();
		},

		// 关闭时间picker
		closeDatetimePicker() {
			this.$refs.myPicker.hide();
		},

		// 监听时间icker选择
		dateTimeSubmit(e) {
			// 当前时间
			const nowTime = new Date().getTime();
			// 选中时间
			const pickerTime = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`;
			// 不能大于当前时间
			if (new Date(pickerTime).getTime() > nowTime) {
				this.$common.toast('选中时间不能大于当前时间');
				return;
			}
			this.payTime = pickerTime;
		},

		// 提交表单
		submitFormEvt() {
			const formType = this.tabList[this.currentTab],
				money = this.money,
				payTime = this.payTime,
				remark = this.remark;

			let goodsObj = {};
			if (this.currentTab === 0) {
				goodsObj = this.expenditureObj;
			} else if (this.currentTab === 1) {
				goodsObj = this.incomeObj;
			}

			const { _id, goodsName, goodsImg, goodsType } = goodsObj;

			if (!_id) {
				this.$common.toast('请选择收支类型');
				return;
			}
			if (!utils.checkMoney(money)) {
				this.$common.toast('请输入金额，如有小数保留2位');
				return;
			}
			if (!payTime) {
				this.$common.toast('请选择时间');
				return;
			}
			if (!remark) {
				this.$common.toast('请输入备注');
				return;
			}

			/* 1=>支出 2=>收入 */
			const params = {
				type: formType.id + 1,
				money,
				payTime,
				goodsId: _id,
				goodsName,
				goodsImg,
				goodsType,
				remark
			};

			this.$api({
				url: '/user/bookkeeping',
				data: params
			})
				.then(res => {
					if (res) {
						res.balance = res.balance || res.balance === 0 ? res.balance.toFixed(2) : '--';

						let userInfo = this.$store.state.userInfo;
						userInfo.balance = res.balance;

						this.$common.toast('提交成功');
						// 通知首页刷新
						this.$store.commit('ISHOMETABREFRESH', true);

						// 将最新余额存入本地userInfo和store
						this.$store.commit('SETUSERINFO', userInfo);
						this.$common.setStorage('userInfo', userInfo);

						uni.navigateBack({
							delta: 1
						});
					}
				})
				.catch(e => {
					this.$common.toast(e.msg);
				})
				.finally();
		}
	},

	components: {
		income,
		expenditure,
		dateTimePicker
	}
};
</script>

<style lang="scss">
.bookkeep-wrap {
	width: 100%;
	background: #f4f4f4;
	.type-tab-wrap {
		background: #fff;
		padding-bottom: 20rpx;
		.tab-item {
			text-align: center;
			flex-basis: 100rpx;
			height: 80rpx;
			line-height: 80rpx;
			color: gray;
			font-size: 26rpx;
			position: relative;
			&.active {
				color: orange;
				&:after {
					content: '';
					display: block;
					width: 40%;
					height: 4rpx;
					background: orange;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					bottom: 10rpx;
				}
			}
		}
	}

	.type-swiper {
		padding: 0 40rpx;
		background: #fff;
		margin-bottom: 14rpx;
	}

	.form-wrap {
		padding: 32rpx 32rpx;
		background: #fff;
		.form-item {
			margin-bottom: 30rpx;
			.item-title {
				font-size: 30rpx;
				color: #888;
			}
			.item-ipt {
				font-size: 34rpx;
				height: 100rpx;
				line-height: 100rpx;
				border-bottom: 1px solid #ddd;
			}
			.item-text-area {
				width: 100%;
				padding-top: 20rpx;
				height: 200rpx;
				line-height: 44rpx;
			}
			.no-sel-time {
				color: #888;
			}
		}
		.submit-form {
			width: 80%;
			padding: 20rpx 0;
			background: #32c55d;
			color: #fff;
			margin: 60rpx auto 40rpx;
			box-shadow: 0 0 10rpx 4rpx rgba(0, 0, 0, 0.1);
			border-radius: 200rpx;
			&.hover-class {
				background: #31a854;
			}
		}
	}
}
</style>
