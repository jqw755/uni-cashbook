<template>
	<view class="no-data-wrap">
		<image src="/static/no-data.png" mode="" class="no-data-img"></image>
		<view class="no-data-tip">{{ noDataDesc }}</view>
	</view>
</template>

<script>
export default {
	props: {
		noDataDesc: {
			type: String,
			required: false,
			default: () => {
				return '';
			}
		}
	},
	data() {
		return {};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss">
.no-data-wrap {
	font-size: 30rpx;
	color: #999999;
	text-align: center;
	// background: #fff;
	.no-data-img {
		width: 200rpx;
		height: 200rpx;
	}
	.no-data-tip{
		margin-top: 30rpx;
		text-align: center;
	}
}
</style>
