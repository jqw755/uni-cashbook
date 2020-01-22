<template>
	<view class="container">
		<view class="person-info flex flex-align">
			<view class="person-avatar">
				<image :src="$store.state.userInfo.avatar" class="person-avatar-img"></image>
				<text class="online-state"></text>
			</view>
			<view class="info-wrap">
				<view class="person-name">{{ $store.state.userInfo.userName }}</view>
			</view>
		</view>

		<view class="contact-tab-wrap flex flex-align flex-justify">
			<view :class="['tab-item', { active: item.id === currentTab }]" v-for="item in tabList" :key="item.id" @tap="switchTab(item)">{{ item.name }}</view>
		</view>
		
		<view class="tab-page-wrap">
			<!-- tab1 -->
			<view class="tab-page-item page-item1" v-show="currentTab===0">
				动态聚集地
			</view>
			
			<!-- tab2 -->
			<view class="tab-page-item page-item2" v-show="currentTab===1">
			<!-- 	好友列表  搜用户，加好友，聊天，看对方动态
				<input type="text" value="输入要搜索的用户名称" /> -->
				<contacts :scrollViewTop="140"/>
			</view>
			
			<!-- tab3 -->
			<view class="tab-page-item page-item3" v-show="currentTab===2">
				<view @click="scoketConnect">connect</view>
				聊天
			</view>
			
		</view>

		
	</view>
</template>

<script>
import socket from '@/lib/socket.io.js';
import contacts from './include/contacts.vue'

export default {
	data() {
		return {
			currentTab: 2,
			tabList: [{ name: '动态', id: 0 }, { name: '好友', id: 1 }, { name: '消息', id: 2 }]
		};
	},
	onLoad() {},

	methods: {
		// 切换tab
		switchTab(tab) {
			if (this.currentTab !== tab.id) {
				this.currentTab = tab.id;
			}
		},

		scoketConnect() {
			const client = socket.connect('http://localhost:3000/');

			console.log(client);
			client.emit('sayTo', { fromId: client.id || '', value: '你好11111112' });

			client.on('test', data => {
				console.log(data);
			});
		}
	},
	components: {contacts}
};
</script>

<style lang="scss">
.container {
	background: #fff;
}
.person-info {
	padding: 28rpx 24rpx;
	background: #fff;
	border-bottom: 1px solid #f4f4f4;
	.person-avatar {
		width: 100rpx;
		height: 100rpx;
		overflow: hidden;
		border-radius: 10rpx;
		position: relative;
		.person-avatar-img {
			max-width: 100%;
			max-height: 100%;
		}
		.online-state {
			width: 24rpx;
			height: 24rpx;
			background: $uni-color-primary;
			box-shadow: 0 0 4rpx 2rpx rgba(0, 0, 0, 0.1);
			border-radius: 50%;
			position: absolute;
			right: 0;
			bottom: 0;
		}
	}

	.info-wrap {
		margin-left: 20rpx;
		.person-name {
			font-size: 32rpx;
			font-weight: bold;
			color: #000;
		}
	}
}
.contact-tab-wrap {
	width: 60%;
	height: 80rpx;
	margin: 20rpx auto;
	padding: 20rpx 0;
	background: #fff;
	border-radius: 200rpx;
	box-shadow: 0 0 12rpx 0 rgba(0, 0, 0, 0.1);
	position: sticky;
	top: 0;
	.tab-item {
		font-size: 24rpx;
		color: #666;
		margin: 0 20rpx;
		transition: all 300ms ease;
		&.active {
			font-size: 30rpx;
			color: $uni-color-primary;
		}
	}
}

.tab-page-wrap{
	padding: 0 28rpx;
}
</style>
