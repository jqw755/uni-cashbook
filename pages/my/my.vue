<template>
	<view class="user-container">
		<view class="user-info-wrap flex flex-align flex-justify">
			<!-- 顶部信息背景图 -->
			<image src="/static/default-user-head-bg.jpg" mode="aspectFill" class="user-info-bg"></image>

			<!-- 顶部信息 -->
			<view class="user-head-wrap">
				<!-- 家庭头像、昵称 -->
				<view class="top-info flex flex-align">
					<view class="family-info flex flex-align">
						<text>来自</text>
						<image :src="userData.familyAvatar" mode="" class="family-avatar" v-if="userData.familyAvatar"></image>
						<image src="/static/family/home.png" mode="" class="family-avatar" v-else></image>
						<text>{{ userData.familyName || '--' }}</text>
					</view>

					<navigator url="/pages/my/set" class="set-btn">设置</navigator>
				</view>

				<!-- 问候语 -->
				<view class="greet-tip">{{ greetings }}</view>

				<!-- 中间个人信息 -->
				<view class="middle-info text-center">
					<view class="avatar-wrap" @tap="actionUploadAvatar(true)">
						<image :src="userData.avatar" mode="" class="user-avatar" v-if="userData.avatar"></image>
						<image src="/static/family/default-head-bg.jpg" mode="" class="user-avatar" v-else></image>
					</view>
					<view class="user-name">{{ userData.userName || '--' }}</view>
				</view>
			</view>
		</view>

		<!-- 功能 -->
		<view class="fun-wrap">
			<!-- tab -->
			<view class="fun-tab-wrap flex flex-align flex-justify">
				<text :class="['tab-item', { active: item.id === currentTab }]" v-for="(item, index) in tabList" :key="index" @tap="changeTab(item.id)">{{ item.name }}</text>
			</view>

			<j-swiper :swiperLen="2" @swiperChange="swiperChange" :swiperIdx="currentTab">
				<!-- 主页 -->
				<view class="j-swiper-item">
					<!-- 余额展示 -->
					<view class="balance-container">
						<view class="balance-wrap">
							<view class="money-title"><text>当前余额（元）</text></view>
							<view class="money-count">{{ store.userInfo.balance }}</view>
						</view>
					</view>

					<!-- 我的功能设置 -->
					<view class="my-fun-wrap">
						<view class="my-fun-item is-open-index-ani">
							<text>首页动画</text>
							<switch class="open-index-switch f-right" color="#00d18b" :checked="store.isOpenIndexAni" @change="isOpenIndexAniEvt" />
						</view>
					</view>
				</view>

				<!-- 预留位置，暂为相册 -->
				<view class="j-swiper-item">
					<view class="my-page-order-wrap" v-if="!photos.length"><empty-data noDataDesc="暂无相册" /></view>
				</view>
			</j-swiper>
		</view>

		<!-- 查看头像弹窗 -->
		<view class="big-avatar-wrap flex flex-justify" v-if="isShowUploadAvatar">
			<view class="mask" @tap="actionUploadAvatar(false)"></view>

			<view class="avatar-content">
				<view class="big-user-avatar-wrap">
					<image :src="userData.avatar" mode="" class="big-user-avatar" v-if="userData.avatar"></image>
					<image src="/static/family/default-head-bg.jpg" mode="widthFix" class="big-user-avatar" v-else></image>
				</view>
				<view class="update-avatar-tip text-center" @tap="changeAvatar">更换头像</view>
			</view>
		</view>
	</view>
</template>

<script>
import jSwiper from '@/component/jSwiper.vue';
import config from '@/common/config.js';
export default {
	data() {
		return {
			store: {},
			
			userData: {},

			currentTab: 0,

			tabList: [{ id: 0, name: '主页' }, { id: 1, name: '动态' }],

			photos: [],

			greetings: '', // 问候据

			isShowDialog: false, // 是否显示修改密码弹窗

			isShowUploadAvatar: false // 是否显示大头像弹窗
		};
	},

	onLoad() {
		this.getUserInfo();
	},

	onShow() {
		this.store = this.$store.state;
		
		this.createGreetings();
		
	},

	methods: {
		// 获取问候据
		createGreetings() {
			const hours = new Date().getHours(),
				greetSuffix = '好~';
			let greetPrefix = '';
			if (hours >= 0 && hours < 6) {
				greetPrefix = '晚上';
			}
			if (hours >= 6 && hours < 11) {
				greetPrefix = '上午';
			}
			if (hours >= 11 && hours <= 12) {
				greetPrefix = '中午';
			}
			if (hours > 12 && hours <= 18) {
				greetPrefix = '下午';
			}
			if (hours > 18 && hours <= 23) {
				greetPrefix = '晚上';
			}
			this.greetings = greetPrefix + greetSuffix;
		},

		// 打开/关闭上传头像弹窗
		actionUploadAvatar(b) {
			this.isShowUploadAvatar = b;
		},

		// 上传头像
		changeAvatar() {
			const _self = this;
			uni.chooseImage({
				success: res => {
					const tempFilePaths = res.tempFilePaths;
					uni.uploadFile({
						url: `${config.getConfig().baseUrl}/user/uploadAvatar`,
						filePath: tempFilePaths[0],
						name: 'avatarFile',
						header: {
							Authorization: _self.store.userInfo.token
						},
						success: data => {
							const parseData = JSON.parse(data.data);
							_self.actionUploadAvatar(false);
							_self.userData.avatar = parseData.data.avatar;
						},
						fail: e => {
							_self.$common.showModal(e.msg || '');
						}
					});
				}
			});
		},

		//是否开启首页动画
		isOpenIndexAniEvt() {
			const b = this.$store.state.isOpenIndexAni;
			this.$store.commit('SETINDEXANI', !b);
		},

		// 滑动swiper
		swiperChange(e) {
			this.currentTab = e;
		},
		// 点击tab
		changeTab(id) {
			this.currentTab = id;
		},

		// 查询用户信息
		getUserInfo() {
			this.$api({
				url: '/user/info'
			})
				.then(res => {
					if (res) {
						this.userData = res;
					}
				})
				.catch(e => {
					this.$common.showModal(e.msg || '');
				})
				.finally(() => {});
		}
	},
	components: { jSwiper }
};
</script>

<style lang="scss">
.user-container {
	width: 100%;
	background: #f4f4f4;
	.user-info-wrap {
		width: 100%;
		height: 420rpx;
		overflow: hidden;
		position: relative;
		.user-info-bg {
			width: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1;
		}
		.user-head-wrap {
			width: 100%;
			height: 100%;
			padding: 24rpx 24rpx;
			position: relative;
			z-index: 2;
			color: #ffffff;
			font-size: 24rpx;
			text-shadow: 0 0 4rpx rgba(0, 0, 0, 0.6);
			background: rgba(0, 0, 0, 0.22);
			.top-info {
				justify-content: space-between;
				margin-bottom: 10rpx;
				.family-info {
					flex-shrink: 0;
					padding: 4rpx 20rpx;
					margin: 0 10rpx 0 0;
					background: rgba(0, 0, 0, 0.3);
					border-radius: 200rpx;
					.family-avatar {
						width: 34rpx;
						height: 34rpx;
						margin: 0 2rpx 0 4rpx;
					}
				}
			}

			.greet-tip {
				padding: 0 20rpx;
				font-size: 28rpx;
			}

			.middle-info {
				.avatar-wrap{
					width: 146rpx;
					height: 146rpx;
					border: 4rpx solid rgba(244, 244, 244, 0.5);
					border-radius: 50%;
					overflow: hidden;
					box-shadow: 0 0 4rpx 4rpx rgba(0, 0, 0, 0.1);
					margin: 0 auto;
				}
				.user-avatar {
					width: 146rpx;
					height: 146rpx;
				}
				.user-name {
					font-size: 30rpx;
					margin: 14rpx 0;
				}
			}
		}
	}

	.fun-wrap {
		.fun-tab-wrap {
			position: sticky;
			top: 0;
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

		.j-swiper-item{
			min-height: calc(100vh - 530rpx);
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
			}
		}
	}

	.balance-container {
		background: #fff;
		padding: 30rpx 26rpx;
		.balance-wrap {
			padding: 30rpx 40rpx;

			background: #2dc478;
			border-top-left-radius: 26rpx;
			border-top-right-radius: 26rpx;
			color: #fff;
			.money-title {
				font-size: 26rpx;
				margin-bottom: 10rpx;
			}
			.money-count {
				font-weight: bold;
				font-size: 56rpx;
			}
		}
	}

	.my-fun-wrap {
		margin-top: 16rpx;
		background: #f4f4f4;
		.my-fun-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100rpx;
			padding: 0 60rpx;
			background: #fff;
			&:last-child {
				border-bottom: 0;
			}
		}

		.is-open-index-ani {
			margin-bottom: 16rpx;
			border-bottom: 0;
			.open-index-switch {
				transform: scale(0.7, 0.7);
			}
		}
	}

	.hover-current {
		background: #f4f4f4;
	}

	.big-avatar-wrap {
		width: 100%;
		height: 100%;
		flex-direction: column;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 50;
		.mask {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			background: rgba(0, 0, 0, 0.7);
		}
		.avatar-content {
			width: 100%;
			max-height: 80%;
			position: relative;

			.big-user-avatar-wrap {
				width: 100%;
				max-height: 100%;
				overflow: scroll;
				.big-user-avatar {
					display: block;
					max-width: 80%;
					margin: 0 auto;
				}
			}
			.update-avatar-tip {
				padding: 30rpx 0;
				color: #fff;
				font-size: 24rpx;
			}
		}
	}
}
</style>
