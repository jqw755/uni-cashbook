<template>
		<!-- 排行，最高最低的前十 -->
		<view class="ranking-wrap">
			<!-- 最高 -->
			<view class="ranking-wrap-item top-ranking-wrap">
				<view class="ranking-title">
					<text class="title-word">TOP</text>
					<text class="title-box-shadow"></text>
					<text class="title-desc">周收入/支出榜前十</text>
					<!-- 这里动态变年月周 -->
				</view>
				<view class="ranking-order-wrap"></view>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss"> 
	.ranking-wrap {
		.ranking-wrap-item {
			.ranking-title {
				position: relative;
				.title-word {
					font-size: 46rpx;
					color: #1ab959;
					font-weight: bold;
					margin-right: 10rpx;
					position: relative;
					z-index: 1;
				}
				.title-box-shadow {
					width: 90rpx;
					height: 30rpx;
					border-radius: 6rpx;
					position: absolute;
					left: 14rpx;
					bottom: 0;
					background: rgba(119, 213, 88, 0.3);
					z-index: 0;
				}
				.title-desc {
					font-size: 26rpx;
					color: #aaa;
				}
			}
		}
	}
</style>
