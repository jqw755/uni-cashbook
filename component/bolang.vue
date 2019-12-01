<template>
	<view class="bolang-wrap">

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
	.bolang-wrap {
		width: 100%;
		height: 100%;
		min-height: 200rpx;
		margin: 0 auto;
		background-image: linear-gradient(200deg, #007851, #14a032);
		overflow: hidden;
		position: relative;

		&:before,
		&:after {
			content: "";
			display: inline-block;
			width: calc(100vw + 400rpx);
			height: calc(100vw + 400rpx);
			background: rgba(255, 255, 255, .8);
			border-radius: 44%;
			position: absolute;
			left: 50%;
			top: 0;
			transform: translate(-50%, -70%) rotate(0deg);
			animation: bolangAnimate 10s linear infinite;
			z-index: 2;
		}

		&:after {
			background: rgba(255, 255, 255, .6);
			border-radius: 46%;
			animation: bolangAnimate 12s linear infinite;
			z-index: 3;
		}
	}

	@keyframes bolangAnimate {
		50% {
			transform: translate(-50%, -73%) rotate(180deg);
		}

		100% {
			transform: translate(-50%, -70%) rotate(360deg);
		}
	}
</style>
