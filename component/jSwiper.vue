<template>
	<view class="j-swiper-container">
		<view
			:class="['j-swiper-wrap flex', { move: isMoveEnd }]"
			@touchstart="touchSwiperItem($event)"
			@touchmove="moveSwiperItem($event)"
			@touchend="endSwiperItem($event)"
			@transitionend="bindTransitionEnd"
			:style="{ width: `${swiperWrapWidth}px`, transform: `translateX(${swiperLeft + swiperDis}px)` }"
		>
			<!-- 如果不监听@transitionend事件，可以通过变量控制style的transition -->
			<!-- 使用匿名slot-->
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// swiper-item得数量，因为暂时没有获取到页面中 类名为j-swiper-item 的view长度
		swiperLen: {
			type: Number,
			required: true
		},
		// 当前swiper索引，可用于指定哪一屏先展示
		swiperIdx: {
			type: Number,
			required: false,
			default() {
				return 0;
			}
		}
	},
	data() {
		return {
			deviceWidth: 0, // 设备屏幕宽度

			swiperWrapWidth: 0, // swiper-wrap总宽度

			swiperLeft: 0, // swiper-wrap当前的left值

			touchX: 0, // 手指按下时x的值

			swiperDis: 0, // 滑动距离

			swiperIdxData: 0, // 当前swiper索引

			isMoveEnd: false, // 是否移动结束

			staticDis: 25, // 移动多远才触发左右滚动。以避免竖直滚动时误触左右滚动

			isSelfChange: false // 是否是该组件自身滑动
		};
	},
	created() {
		const swiperIdx = this.swiperIdx;

		this.swiperIdxData = swiperIdx;

		uni.getSystemInfo({
			success: e => {
				// 设备宽
				this.deviceWidth = e.screenWidth;

				// 总swiper-wrap的宽
				this.swiperWrapWidth = this.swiperLen * this.deviceWidth;

				// 进入该组件，如果父组件指定了swiperIdx为第一屏（默认为0，就不执行了），则执行一次动画
				if (swiperIdx !== 0) {
					this.swiperAnimate(swiperIdx);
				}

				// 异步获取当前swiper-wrap的left
				setTimeout(() => {
					let view = uni
						.createSelectorQuery()
						.in(this)
						.select('.j-swiper-wrap');

					view
						.boundingClientRect(data => {
							this.swiperLeft = data.left;
						})
						.exec();
				}, 0);
			}
		});
	},
	methods: {
		// 手指按下事件
		touchSwiperItem(e) {
			const { pageX } = e.mp.changedTouches[0];
			this.touchX = pageX;
		},

		// 移动swiper
		moveSwiperItem(e) {
			const { pageX } = e.mp.changedTouches[0];
			const staticDis = this.staticDis;

			// 防止竖直滚动误触发
			if (pageX - this.touchX < staticDis && pageX - this.touchX > -staticDis) {
				return;
			}

			this.swiperDis = pageX - this.touchX;
		},

		// 手指移动结束
		endSwiperItem(e) {
			let swiperIdxData = this.swiperIdxData;

			const { pageX } = e.mp.changedTouches[0];

			const staticDis = this.staticDis;

			const swiperLen = this.swiperLen;

			// 防止竖直滚动误触发
			const dis = pageX - this.touchX;
			if (dis < staticDis && dis > -staticDis) {
				return;
			}

			// 手指松开，计算当前swiper的索引，索引乘以每个swiper的宽度就是此次要移动的距离
			dis < 0 ? swiperIdxData++ : swiperIdxData--;

			// 防止滑块越界
			if (swiperIdxData < 0) {
				swiperIdxData = 0;
			} else if (swiperIdxData > swiperLen - 1) {
				swiperIdxData = swiperLen - 1;
			}

			this.swiperIdxData = swiperIdxData;

			// 移动结束将移动距离变量置为0！！！
			this.swiperDis = 0;

			// 该组件自身触发，标记为true
			this.isSelfChange = true;

			// 执行动画
			this.swiperAnimate(swiperIdxData);

			// 向父组件传递当前swiper索引
			this.$emit('swiperChange', swiperIdxData);
		},

		// 动画执行方法； @param: currentSwiper =》当前swiper索引
		swiperAnimate(currentSwiper) {
			// 添加移动过度动画
			this.isMoveEnd = true;
			// 这里注意为什么是减法
			this.swiperLeft = 0 - this.deviceWidth * currentSwiper;
		},

		// 监听当前元素上transition执行完成，移除动画类名
		bindTransitionEnd() {
			this.isMoveEnd = false;
		}
	},

	watch: {
		// 监听是否由外部控制当前swiper的索引
		swiperIdx(val) {
			// 如果是父组件触发该swiper滚动才执行该处；该组件自身的手指松开触发滚动时，这里不执行。
			if (this.isSelfChange) {
				this.isSelfChange = false;
				return;
			}

			this.swiperIdxData = val;

			this.swiperAnimate(val);
		}
	}
};
</script>

<style lang="scss">
.j-swiper-container {
	width: 100%;
	overflow-x: hidden;
	.j-swiper-wrap {
		white-space: nowrap;
		&.move {
			transition: transform 200ms ease-out;
		}
	}
}
</style>
