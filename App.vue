<script>
import Vue from "vue";

export default {
  async onLaunch() {
    // 根据设备类型，定义自导航栏高度
    uni.getSystemInfo({
      success: function(e) {
        // #ifndef MP
        Vue.prototype.$statusBar = e.statusBarHeight;
        if (e.platform === "android") {
          Vue.prototype.$customeBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.$customeBar = e.statusBarHeight + 45;
        }
        // #endif

        // #ifdef MP
        Vue.prototype.$statusBar = e.statusBarHeight;
        Vue.prototype.$customeBar = 0;
        // #endif
      }
    });

    // 刷新页面后，从本地取，存入store，方便其余页面直接从store获取而不用执行本地存储读取操作。
    let { userInfo } = await this.$common.getStorage();

    this.$store.commit("SETUSERINFO", userInfo || {});
  },

  onShow: function() {},
  onHide: function() {}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import url('./style/base.scss');

// 导入j-swiper样式
@import url('./style/j-swiper.css');
</style>
