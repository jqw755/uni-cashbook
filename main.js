import Vue from 'vue'
import App from './App'

import store from '@/store/index.js'
import api from '@/common/api.js'
import toast from '@/common/toast.js'

import navbar from '@/component/navbar.vue'

Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$toast = toast;

Vue.component('navbar', navbar); // 全局注册自定义导航栏

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
