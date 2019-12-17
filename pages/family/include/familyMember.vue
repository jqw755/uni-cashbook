<template>
	<view class="member-wrap">
		<view class="balance-wrap">
			<view class="money-title">当前余额（元）</view>
			<view class="money-count">100.00</view>
		</view>

		<view class="title flex member-title">
			<text>成员</text>
			<!-- 添加按钮 -->
			<image src="/static/family/add-user.png" mode="" class="add-member-icon" @tap="addMember"></image>
		</view>
		<view class="member-list flex">
			<!-- 成员itme -->
			<view v-for="(item, index) in 6" :key="index" class="member-item text-center" @tap="queryMember(item)">
				<view class="member-avatar-wrap"><image src="/static/contact-avatar.png" mode="widthFix" class="member-avatar"></image></view>
				<view class="member-name text-overflow">成员名字</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		// 添加家庭成员
		addMember() {
			this.$emit('toAddMember', true)
		},
		
		// 点击查看家庭成员信息
		queryMember(data) {
			this.$toast('点击查看家庭成员信息');
		}
	}
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
		// background: #00d18b;
		background: #2dc478;
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
