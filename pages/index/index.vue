<template>
  <view class="container">
    <!-- 顶部金额区域 -->
    <view class="page-top-wrap">
      <!-- 内容区 -->
      <view class="page-top-content flex">
        <!-- 日历 -->
        <rili />

        <!-- 余额 -->
        <view class="balance-wrap text-center">
          <view class="balance-content ">
            <text class="money-tip">￥</text>
            <text class="money-num">{{ store.userInfo.balance }}</text>
          </view>

          <view class="balance-tip ">
            <text class="icons qianbao"></text>
            <text>当前余额</text>
          </view>
        </view>

        <!-- 天气。这里放一些css实现的天气等图形，可以手动切换显示 -->
        <!-- https://blog.csdn.net/wewfdf/article/details/101389920 -->
        <!-- https://blog.csdn.net/wewfdf/article/details/102887792 -->
        <view></view>
      </view>

      <!-- 海浪背景 -->
      <bolang v-if="store.isOpenIndexAni"></bolang>
      <view v-else class="no-bolang-view"></view>
    </view>

    <!-- 中间部分展示最近的几条记录 -->
    <view class="page-middle-wrap">
      <view class="last-order-title flex flex-align">
        <text class="title">最新</text>

        <navigator
          url="/pages/order/orderList"
          hover-class="a-hover"
          class="more-order-title"
        >
          <text>查看更多</text>
          <text class="icons arrow-right f-right"></text>
        </navigator>
      </view>
      <view class="order-list-wrap">
        <order-item
          v-for="(item, index) in orderList"
          :key="index"
          :order-data="item"
        />
        <view class="index-page-no-data" v-if="!orderList.length"
          ><empty-data noDataDesc="暂无订单"
        /></view>
      </view>
    </view>

    <!-- 记账悬浮按钮 -->
    <view
      @tap="bookkeepEvt"
      :class="[
        'bookkeep-btn-wrap flex flex-align flex-justify',
        { 'pull-over': isPageScroll }
      ]"
    >
      <image src="/static/bookkeeping.png" class="bookkeep-img"></image>
    </view>
  </view>
</template>

<script>
import rili from "@/component/rili.vue";
import bolang from "@/component/bolang.vue";
import orderItem from "../order/orderItem.vue";

export default {
  data() {
    return {
      store: {},
      orderList: [],
      isPageScroll: false, // 页面是否在滚动
      timer: null
    };
  },

  async onLoad() {
		const { userInfo } = this.$common.getStorage();

		if (!userInfo) {
		  uni.redirectTo({
		    url: "/pages/login/login"
		  });
		  return;
		}
    this.getOrderList();
  },

  onShow() {
    this.store = this.$store.state;

    // 刷新tab首页
    if (this.store.isHomeTabRefresh) {
      this.getOrderList();
      this.$store.commit("ISHOMETABREFRESH", false);
    }
  },

  onPageScroll() {
    this.isPageScroll = true;

    if (this.timer) {
      clearTimeout(this.timer);
    }
    // 停止滚动2s后出现
    this.timer = setTimeout(() => {
      this.isPageScroll = false;
    }, 2000);
  },

  // 下拉刷新
  async onPullDownRefresh() {
	this.getUserInfo();
    this.getOrderList();
    uni.stopPullDownRefresh();
  },

  methods: {
    getOrderList() {
      this.$api({
        url: "/order/list",
        data: {
          page: 1,
          pageSize: 10
        }
      })
        .then(res => {
          if (res && res.list) {
            this.orderList = res.list;
          }
        })
        .catch(e => {
          this.$common.toast(e.msg);
        })
        .finally();
    },

    // 点击记账按钮
    bookkeepEvt() {
      // 如果按钮靠边隐藏了，点击让他出来
      if (this.isPageScroll) {
        this.isPageScroll = false;
        return;
      }

      uni.navigateTo({
        url: "/pages/bookkeep/index"
      });
    },
	  // 查询用户信息
    getUserInfo() {
      this.$api({
        url: '/user/info'
      })
        .then(res => {
          if (res) {
            this.$store.commit("SETUSERINFO", res);
          }
        })
        .catch(e => {
          this.$common.showModal(e.msg || '');
        })
        .finally(() => {});
    }
  },

  components: {
    rili,
    bolang,
    orderItem
  }
};
</script>

<style lang="scss">
.page-top-wrap {
  width: 100%;
  height: 400rpx;
  position: relative;

  .page-top-content {
    width: 100%;
    height: 100%;
    padding: 32rpx 32rpx;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;

    .balance-wrap {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .balance-content {
        font-size: 36rpx;
        font-weight: bold;

        .money-tip {
          margin-left: -24rpx;
        }

        .money-num {
          font-size: 80rpx;
        }
      }

      .balance-tip {
        color: #bbb;

        .qianbao {
          background-position: -128rpx 0;
          top: 6rpx;
          left: -2rpx;
        }
      }
    }
  }

  .no-bolang-view {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(-90deg, #2ba32f, $uni-color-primary);
  }
}

.page-middle-wrap {
  // position: relative;

  .last-order-title {
    width: 100%;
    justify-content: space-between;
    padding: 24rpx 32rpx 24rpx 32rpx;
    background: #e5e5e5;
    position: sticky;
    top: 0;
    z-index: 10;

    .title {
      font-size: 40rpx;
      color: #000;
    }

    .more-order-title {
      align-self: flex-end;
      color: #666;
      .arrow-right {
        background-position: 0 0;
        top: 2rpx;
      }
    }
  }

  .index-page-no-data {
    margin-top: 150rpx;
  }
}

.bookkeep-btn-wrap {
  width: 100rpx;
  height: 100rpx;
  background: $uni-color-primary;
  border-radius: 200rpx;
  position: fixed;
  right: 32rpx;
  bottom: 120rpx;
  box-shadow: 0 0 6rpx 4rpx rgba(0, 0, 0, 0.1);
  transition: transform 300ms ease;
  .bookkeep-img {
    width: 44rpx;
    height: 44rpx;
  }
  &.pull-over {
    transform: translateX(90rpx);
  }
}
</style>
