import Vue from 'vue'
import App from './App'

import store from '/store/index.js'
import api from '/common/api.js'
import toast from '/common/toast.js'

Vue.prototype.$store = store;
Vue.prototype.api = api;
Vue.prototype.$toast = toast;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue(App)
app.$mount()
