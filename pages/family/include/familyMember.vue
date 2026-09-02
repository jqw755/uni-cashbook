<template>
	<view class="member-wrap">
		<view class="balance-wrap">
			<view class="money-title"><text>当前余额（元）</text></view>
			<view class="money-count">{{familyData.balance}}</view>
			<view class="money-tip">
				（账户金额由家庭成员充值，点此
				<text class="login-member" @tap="loginMember">切换</text>
				到家庭成员）
			</view>
		</view>

		<view class="title flex member-title">
			<text>成员</text>
			<!-- 添加按钮 -->
			<image src="/static/family/add-user.png" mode="" class="add-member-icon" @tap="addMember"></image>
		</view>
		<view class="member-list flex">
			<!-- 成员itme -->
			<view v-for="(item, index) in familyData.members" :key="index" class="member-item text-center" @tap="queryMember(item)">
				<view class="member-avatar-wrap">
					<image :src="item.avatar" mode="widthFix" class="member-avatar" v-if="item.avatar"></image>
					<image src="/static/family/default-head-bg.jpg" mode="widthFix" class="member-avatar" v-else></image>
				</view>
				<view class="member-name text-overflow">{{item.userName}}</view>
			</view>



		</view>

		<view class="no-member-wrap" v-if="!familyData.members||!familyData.members.length"><empty-data noDataDesc="暂无成员" /></view>

	</view>
</template>

<script>
export default {
	props: {
		familyData: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		// 账户管理
		loginMember() {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},

		// 添加家庭成员
		addMember() {
			this.$emit('toAddMember', true);
		},

		// 点击查看家庭成员信息
		queryMember(data) {
			this.$common.toast('点击查看家庭成员信息');
		}
	},
	components:{ }
};
</script>

<style lang="scss" scoped>
.member-wrap {
	.title {
		color: #999;
		padding: 20rpx 40rpx;
		background: #fff;
		justify-content: space-between;
		.add-member-icon {
			width: 40rpx;
			height: 40rpx;
		}
		&.member-title {
			color: #5e35b3;
		}
	}

	.balance-wrap {
		padding: 30rpx 40rpx;
		margin: 20rpx 20rpx;
		// background: #00d18b;
		background: #2dc478;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		color: #fff;
		.money-title {
			font-size: 26rpx;
			margin-bottom: 10rpx;
		}
		.money-count {
			font-weight: bold;
			font-size: 56rpx;
		}
		.money-tip {
			font-size: 24rpx;
			.login-member {
				color: orange;
				text-decoration: underline;
				margin: 0 6rpx;
			}
		}
	}

	.member-list {
		// padding: 20rpx 0;
		background: #fff;
		flex-wrap: wrap;
		.member-item {
			margin-left: 40rpx;
			.member-avatar-wrap {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				overflow: hidden;
				.member-avatar {
					width: 100%;
					max-height: 100%;
				}
			}
			.member-name {
				max-width: 100rpx;
				padding: 10rpx 0;
				font-size: 24rpx;
			}
		}
	}
}
</style>
