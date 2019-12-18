<template>
	<view class="family-container">
		<!-- 头像 昵称等信息 -->
		<view class="family-info-wrap flex flex-align flex-justify">
			<image src="/static/family/default-head-bg.jpg" mode="aspectFill" class="family-info-bg"></image>
			<view class="family-head-wrap flex flex-align flex-justify">
				<image src="/static/family/family-logo.png" mode="" class="family-head"></image>
				<view class="family-name">家庭昵称</view>
				<view class="family-tags">吃货家庭，开心，美食</view>
			</view>
		</view>

		<!-- 功能 -->
		<view class="fun-wrap">
			<!-- tab -->
			<view class="fun-tab-wrap flex flex-align flex-justify">
				<text :class="['tab-item', { active: item.id === currentTab }]" v-for="(item, index) in tabList" :key="index" @tap="changeTab(item.id)">{{ item.name }}</text>
			</view>

			<swiper class="swiper-wrap" :current="currentTab" @change="changeSwiper" duration="300">
				<swiper-item class="swiper-item"><family-member @toAddMember="addMember" /></swiper-item>

				<swiper-item class="swiper-item">
					<order-item v-for="(item, index) in orderList" :key="index" :order-data="item" />

					<view class="no-order-wrap" v-if="!orderList.length"><emptyData noDataDesc="暂无订单" /></view>
				</swiper-item>

				<swiper-item class="swiper-item">
					<view class="no-order-wrap" v-if="!photos.length"><emptyData noDataDesc="暂无相册" /></view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 添加成员diolog -->
		<add-member :isShowDialog="isShowDialog" @closeDialog="closeDialog"></add-member>
	</view>
</template>

<script>
import addMember from './include/addMember.vue';
import familyMember from './include/familyMember.vue';
import orderItem from '../order/orderItem.vue';
import emptyData from '@/component/emptyData.vue';
export default {
	data() {
		return {
			currentTab: 0,
			tabList: [{ id: 0, name: '家庭' }, { id: 1, name: '订单' }, { id: 2, name: '相册' }],
			orderList: [],
			photos: [],

			isShowDialog: false // 是否显示添加成员dialog
		};
	},
	onLoad() {
		// const store = this.$common.getStorage();
		// this.$common.setStorage('aaa','132465789');

		this.getFamilyInfo();
	},
	methods: {
		
		// 滑动swiper
		changeSwiper(e) {
			this.currentTab = e.detail.current;
		},
		// 点击tab
		changeTab(id) {
			this.currentTab = id;
		},
		
		// 添加成员
		addMember(e) {
			this.isShowDialog = e;
		},
		
		// 关闭添加成员dialog
		closeDialog(e) {
			this.isShowDialog = e;
		},
		
		// 查询家庭信息
		getFamilyInfo() {
			this.$api({
				url: '/family/info'
			})
				.then(res => {})
				.catch(e => {
					this.$common.showModal(e.msg || '');
				})
				.finally(() => {
				});
		},
		
		
		
	},
	components: { addMember, familyMember, orderItem, emptyData }
};
</script>

<style lang="scss" scoped>
.family-container {
	width: 100%;
	background: #f4f4f4;
	.family-info-wrap {
		width: 100%;
		height: 420rpx;
		overflow: hidden;
		position: relative;
		.family-info-bg {
			width: 100%;
			position: absolute;
			left: 0;
			top: 0;
			// filter: 20;
			z-index: 1;
		}
		.family-head-wrap {
			position: relative;
			flex-direction: column;
			z-index: 2;
			.family-head {
				width: 140rpx;
				max-height: 140rpx;
				border: 4rpx solid #fff;
				border-radius: 50%;
				overflow: hidden;
				box-shadow: 0 0 4rpx 4rpx rgba(0, 0, 0, 0.1);
			}
			.family-name {
				color: #fff;
				margin: 30rpx 0;
			}
			.family-tags {
				font-size: 24rpx;
				color: #fff;
				padding: 6rpx 20rpx;
				background: rgba(0, 0, 0, 0.4);
				border-radius: 200rpx;
			}
		}
	}

	.fun-wrap {
		.fun-tab-wrap {
			background: #fff;
			margin-bottom: 30rpx;
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
						bottom: 0;
					}
				}
			}
		}

		.swiper-wrap {
			min-height: calc(100vh - 530rpx);
			// padding: 0 40rpx;
			background: #fff;
			.no-order-wrap {
				margin-top: 100rpx;
			}
		}

		.fun-list {
			background: #fff;
			.fun-item {
				display: flex;
				align-items: center;
				height: 100rpx;
				padding: 0 32rpx;
				border-bottom: 1px solid #f1f1f1;
				&:last-child {
					border-bottom: 0;
				}
				&.hover-fun {
					background: #f4f4f4;
				}
			}
		}
	}
}
</style>
