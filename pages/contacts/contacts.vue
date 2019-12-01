<template>
	<view class="container">
		<!-- 导航栏 -->
		<navbar>
			<view slot="contentText">联系人</view>
		</navbar>

		<view class="contacts-wrap">
			<!-- 渲染联系人 -->
			<scroll-view class="contacts-swiper-wrap" scroll-y :scroll-into-view="'index-'+indexCur" :style="[{height:'calc(100vh - ' + customeBarH + 'px)'}]"
			 scroll-with-animation enable-back-to-top>

				<view v-for="(list, letter) in contactData" :key="letter" :id="'index-'+letter">
					<!-- 拼音首字母 -->
					<view class="letter-wrap flex flex-align">{{letter}}</view>

					<!-- 首字母下包括的数据 -->
					<view class="contact-people-wrap">
						<view class="contact-people-item flex flex-align" v-for="(item, index) in list" :key="index">
							<image src="/static/contact-avatar.png" mode="" class="contact-avatar"></image>
							<view class="contact-people">{{item.name}}</view>
						</view>
					</view>

				</view>

			</scroll-view>

			<!-- 渲染字母索引 -->
			<view class="contacts-index-wrap flex flex-align flex-justify" :style="[{height:'calc(100vh - ' + customeBarH + 'px)'}]">
				<ul class="contacts-ul box-shadow" @touchstart="touchUlStart" @touchmove="touchUlMove" @touchend.stop="touchUlEnd">
					<li class="index-item flex flex-align flex-justify" :data-id="item" v-for="(item,index) in contactIndexData" :key="index"
					 @touchstart="touchIdxItem">{{item}}</li>
				</ul>
			</view>

			<view v-show="isShowTipBox" class="index-tip-wrap flex flex-align flex-justify">{{indexCur}}</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexCur: '', // 当前索引的首字母
				customeBarH: this.$customeBar,
				contactData: { // 联系人数据
					'A': [{
							name: '阿七'
						},
						{
							name: '阿司'
						}
					],
					'B': [{
							name: '帮主'
						},
						{
							name: '帮助'
						}
					],
					'C': [{
							name: '曹操'
						},
						{
							name: '崇拜'
						}
					],
					'D': [{
							name: '大哥'
						},
						{
							name: '大姐'
						}
					],
					'E': [{
							name: '恶心'
						},
						{
							name: '摁住它'
						}
					],
					'F': [{
							name: '发哥'
						},
						{
							name: '罚钱'
						}
					],
					'G': [{
							name: '个个击破'
						},
						{
							name: '格子'
						}
					],
				},
				contactIndexData: [], // 纯大写字母数组，根据联系人数据创建

				contactsUlBoxTop: 0, // 索引列表距顶部的距离
				isShowTipBox: false, // 手指滑动字母索引列表，提示框提示滑到哪了
			}
		},
		onLoad() {
			// 创建右侧字母索引列表
			this.contactIndexData = Object.keys(this.contactData);
		},

		onReady() {
			// 获取右侧索引列表离顶部的距离
			const query = uni.createSelectorQuery();

			query.select('.contacts-ul').boundingClientRect(data => {
				this.contactsUlBoxTop = data.top;
			}).exec();

		},

		methods: {
			// 点击具体的某个索引字母
			touchIdxItem(e) {
				const id = e.currentTarget.dataset.id;
				if (id) {
					this.indexCur = id;
				}
			},

			// 触摸索引列表ul
			touchUlStart() {
				this.isShowTipBox = true;
			},
			// 触摸滑动索引列表ul
			touchUlMove(e) {
				// 手指当前的位置距顶部的距离
				const myY = e.touches[0].clientY;

				if (myY > this.contactsUlBoxTop) {
					let n = Math.floor((myY - this.contactsUlBoxTop) / 20);
					this.indexCur = this.contactIndexData[n];
				}

			},
			touchUlEnd() {
				this.isShowTipBox = false;
			},

		},
	}
</script>

<style lang="scss">
	.contacts-wrap {
		width: 100%;
		background-color: #f1f1f1;

		.contacts-swiper-wrap {
			.letter-wrap {
				flex: 1;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
				height: 90rpx;
				padding: 0 32rpx;
			}

			.contact-people-wrap {
				padding: 0 0 0 32rpx;
				background-color: $uni-bg-color;
				border-top: 1px solid $uni-divider-line-color;
				border-bottom: 1px solid $uni-divider-line-color;

				.contact-people-item {
					height: 110rpx;
					margin-left: 70rpx;
					border-bottom: 1px solid $uni-divider-line-color;

					&:last-child {
						border-bottom: 0;
					}

					.contact-avatar {
						width: 70rpx;
						height: 70rpx;
						margin-left: -70rpx;
					}

					.contact-people {
						padding-left: 20rpx;
					}

				}

			}
		}

		.contacts-index-wrap {
			flex-direction: column;
			position: fixed;
			right: 32rpx;
			top: 0;

			.contacts-ul {
				color: #888;
				padding: 16rpx 0;
				border-radius: $uni-border-radius-base;
				background: $uni-bg-color;
				font-size: $uni-font-size-sm;

				.index-item {
					width: 50rpx;
					height: 40rpx;
				}
			}

		}

		.index-tip-wrap {
			width: 100rpx;
			height: 100rpx;
			border-radius: $uni-border-radius-base;
			color: #fff;
			font-size: $uni-font-size-lg;
			background: rgba(0, 0, 0, .7);
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
