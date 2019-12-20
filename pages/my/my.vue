<template>
	<view class="family-container">
		<!-- 头像 昵称等信息 -->
		<view class="family-info-wrap flex flex-align flex-justify">
			<image src="/static/default-user-head-bg.jpg" mode="aspectFill" class="family-info-bg"></image>
			<view class="family-head-wrap flex">
				<!-- 左侧信息 -->
				<view class="left-info">
					<view class="greet-tip">Hi，{{ greetings }}</view>
					<view class="user-name">{{ userData.userName || '--' }}</view>
				</view>
				<!-- 右侧头像 -->
				<view class="right-info text-center">
					<view class="" @tap="actionUploadAvatar(true)">
						<image :src="userData.avatar" mode="" class="user-avatar" v-if="userData.avatar"></image>
						<image src="/static/family/default-head-bg.jpg" mode="" class="user-avatar" v-else></image>
					</view>

					<!-- 家庭头像、昵称 -->
					<view class="family-info-wrao">
						<image :src="userData.familyAvatar" mode="" class="family-avatar" v-if="userData.familyAvatar"></image>
						<image src="/static/family/home.png" mode="" class="family-avatar" v-else></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 功能 -->
		<view class="fun-wrap">
			<!-- tab -->
			<view class="fun-tab-wrap flex flex-align flex-justify">
				<text :class="['tab-item', { active: item.id === currentTab }]" v-for="(item, index) in tabList" :key="index" @tap="changeTab(item.id)">{{ item.name }}</text>
			</view>

			<swiper class="swiper-wrap" :current="currentTab" @change="changeSwiper" duration="300">
				<!-- 账户 -->
				<swiper-item class="swiper-item">
					<!-- 余额展示 -->
					<view class="balance-container">
						<view class="balance-wrap">
							<view class="money-title">
								<text>家庭：{{ userData.familyName }} 当前余额（元）</text>
							</view>
							<view class="money-count">{{ userData.balance }}</view>
						</view>
					</view>

					<!-- 我的功能设置 -->
					<view class="my-fun-wrap">
						<view class="my-fun-item is-open-index-ani">
							<text>首页动画</text>
							<switch class="open-index-switch f-right" color="#00d18b" :checked="$store.state.isOpenIndexAni" @change="isOpenIndexAniEvt" />
						</view>

						<view class="my-fun-item" hover-class="hover-current" v-for="(item, index) in funArr" :key="index" @tap="funTap(item)">
							<text>{{ item.name }}</text>
							<text class="icons icon-jiantou_you f-right"></text>
						</view>

						<view class="logout-wrap">
							<view class="logout-item" hover-class="hover-current" @tap="loginOther">切换账号</view>
							<view class="logout-item" hover-class="hover-current" @tap="loginFamily">家庭登录</view>
						</view>
					</view>
				</swiper-item>

				<swiper-item class="swiper-item">
					<view class="my-page-order-wrap" v-if="!photos.length"><empty-data noDataDesc="暂无相册" /></view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 修改密码 -->
		<changePwdCom :isShowDialog="isShowDialog" @closeDialog="closeDialog" @changePwdSuccess="changePwdSuccess" :userAvatar="userData.avatar" />

		<!-- 查看头像弹窗 -->
		<view class="big-avatar-wrap" v-if="isShowUploadAvatar">
			<view class="mask" @tap="actionUploadAvatar(false)"></view>
			<view class="avatar-content">
				<image :src="userData.avatar" mode="" class="big-user-avatar" v-if="userData.avatar"></image>
				<image src="/static/family/default-head-bg.jpg" mode="" class="big-user-avatar" v-else></image>
				<view class="update-avatar-tip text-center" @tap="changeAvatar">更换头像</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/common/config.js'
import changePwdCom from './include/changePwdCom.vue';
export default {
	data() {
		return {
			userData: {},

			currentTab: 0,
			tabList: [{ id: 0, name: '主页' }, { id: 1, name: '相册' }],
			funArr: [{ id: 0, name: '修改密码' }],
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
				success: (res) => {
					const tempFilePaths = res.tempFilePaths;
					uni.uploadFile({
						url: `${config.getConfig().baseUrl}/user/uploadAvatar`,
						filePath: tempFilePaths[0],
						name: 'avatarFile',
						header:{
							'Authorization': _self.$store.state.token
						},
						success: (data) => {
							const parseData = JSON.parse(data.data);
							_self.actionUploadAvatar(false);
							_self.userData.avatar = parseData.data.avatar;
							
						},
						fail: (e) => {
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

		funTap(item) {
			// 修改密码
			if (item.id === 0) {
				this.isShowDialog = true;
			}
		},

		// 切换账号
		loginOther() {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},

		// 登录家庭账户
		loginFamily() {
			uni.navigateTo({
				url: '/pages/family/login'
			});
		},

		// 滑动swiper
		changeSwiper(e) {
			this.currentTab = e.detail.current;
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
						res.balance = res.balance || res.balance === 0 ? res.balance.toFixed(2) : '--';
						this.userData = res;
					}
				})
				.catch(e => {
					this.$common.showModal(e.msg || '');
				})
				.finally(() => {});
		},

		// 密码修改成功
		changePwdSuccess() {
			this.closeDialog();
			uni.redirectTo({
				url: '/pages/login/login'
			});
		},

		// 关闭dialog
		closeDialog(e) {
			this.isShowDialog = e;
		}
	},
	components: { changePwdCom }
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
			filter: blur(8rpx);
			z-index: 1;
		}
		.family-head-wrap {
			width: 100%;
			height: 100%;
			padding: 60rpx 40rpx 40rpx;
			position: relative;
			z-index: 2;
			justify-content: space-between;
			color: #ffffff;
			.left-info {
				.greet-tip {
					font-size: 22rpx;
					font-weight: bold;
				}
				.user-name {
					margin: 10rpx 0 20rpx;
					font-size: 48rpx;
					font-weight: bold;
				}
			}
			.right-info {
				.user-avatar {
					width: 146rpx;
					height: 146rpx;
					border: 6rpx solid rgba(244, 244, 244, 0.2);
					border-radius: 50%;
					overflow: hidden;
					box-shadow: 0 0 4rpx 4rpx rgba(0, 0, 0, 0.1);
				}

				.family-info-wrao {
					margin-top: 50rpx;
					.family-avatar {
						width: 80rpx;
						height: 80rpx;
					}
				}
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
			min-height: calc(100vh - 530rpx - var(--window-bottom));
			// padding: 0 40rpx;
			// background: #fff;
			.my-page-order-wrap {
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
			// border-bottom: 2rpx solid #ddd;
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

		.logout-wrap {
			margin-top: 16rpx;
			background: #fff;
			text-align: center;
			.logout-item {
				height: 100rpx;
				line-height: 100rpx;
				border-bottom: 2rpx solid #ddd;
				&:last-child {
					border-bottom: 0;
				}
			}
		}
	}

	.hover-current {
		background: #f4f4f4;
	}

	.big-avatar-wrap {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 11;
		.mask {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.7);
		}
		.avatar-content {
			width: 100%;
			max-height: 80%;
			overflow: scroll;
			position: absolute;
			left: 0;
			top: 20%;

			.big-user-avatar {
				display: block;
				max-width: 80%;
				margin: 0 auto;
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
