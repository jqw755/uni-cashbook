<template>
	<view class="family-container">
		<!-- 头像 昵称等信息 -->
		<view class="family-info-wrap flex flex-align flex-justify">
			<image src="/static/family/default-head-bg.jpg" mode="aspectFill" class="family-info-bg"></image>
			<view class="family-head-wrap flex flex-align flex-justify">
				
				<navigator url="/pages/family/set" class="set-btn">设置</navigator>
				
				<image :src="familyData.familyAvatar" mode="" class="family-head" v-if="familyData.familyAvatar"></image>
				<image src="/static/family/family-logo.png" mode="" class="family-head" v-else></image>
				<view class="family-name">{{familyData.familyName||'--'}}</view>
				<view class="family-tags">吃货家庭，开心，美食</view>
			</view>
		</view>

		<!-- 功能 -->
		<view class="fun-wrap">
			<!-- tab -->
			<view class="fun-tab-wrap flex flex-align flex-justify">
				<text :class="['tab-item', { active: item.id === currentTab }]" v-for="(item, index) in tabList" :key="index" @tap="changeTab(item.id)">{{ item.name }}</text>
			</view>
		
			<j-swiper :swiperLen="3" @swiperChange="changeSwiper" :swiperIdx="currentTab">
				<view class="j-swiper-item">
					<family-member @toAddMember="addMember" :familyData="familyData"/>
				</view>
				
				<view class="j-swiper-item">
					<order-item v-for="(item, index) in orderList" :key="index" :order-data="item" />
				
					<empty-data noDataDesc="暂无订单" v-if="!orderList.length" />
				</view>
				
				<view class="j-swiper-item">
					<empty-data noDataDesc="暂无相册" v-if="!photos.length" />
				</view>
			</j-swiper>
		
		
		</view>

		<!-- 添加成员diolog -->
		<add-member :isShowDialog="isShowDialog" @closeDialog="closeDialog" @addMemberSuccess="addMemberSuccess"></add-member>
	</view>
</template>

<script>
	import jSwiper from '@/component/jSwiper.vue';
import addMember from './include/addMember.vue';
import familyMember from './include/familyMember.vue';
import orderItem from '../order/orderItem.vue';
export default {
	data() {
		return {
			familyData:{},
			
			currentTab: 0,
			tabList: [{ id: 0, name: '家庭' }, { id: 1, name: '订单' }, { id: 2, name: '相册' }],
			orderList: [],
			photos: [],

			isShowDialog: false // 是否显示添加成员dialog
		};
	},
	onLoad() {
		this.getFamilyInfo();
	
	},
	methods: {
		// 滑动swiper
		changeSwiper(e) {
			this.currentTab = e;
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
		
		// 添加成功
		addMemberSuccess(){
			this.closeDialog();
			this.getFamilyInfo();
		},
		
		// 查询家庭信息
		getFamilyInfo() {
			this.$api({
				url: '/family/info'
			})
				.then(res => {
					if(res){
						res.balance = res.balance || res.balance === 0 ? res.balance.toFixed(2) : '--';
						this.familyData = res;
					}
				})
				.catch(e => {
					this.$common.showModal(e.msg || '');
				})
				.finally(() => {
				});
		},
		
		
		
	},
	components: { jSwiper, addMember, familyMember, orderItem }
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
			width: 100%;
			height: 100%;
			position: relative;
			flex-direction: column;
			z-index: 2;
			background: rgba(0, 0, 0, .22);
			.set-btn{
				color: #ddd;
				font-size: 24rpx;
				position: absolute;
				right: 32rpx;
				top: 20rpx;
			}
			
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
		.j-swiper-item{
			min-height: calc(100vh - 530rpx);
			background: #fff;
		}
		
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
