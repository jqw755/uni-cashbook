import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: '',
		userInfo: {},
		isOpenIndexAni: false, // 是否开启首页动画
		isHomeTabRefresh: false, // 是否记账成功
	},

	mutations: {
		// 设置token
		SETTOKEN(state, data) {
			state.token = data;
		},

		// 设置userInfo
		SETUSERINFO(state, data) {
			state.userInfo = data;
		},

		// 设置是否开启首页动画
		SETINDEXANI(state, data) {
			state.isOpenIndexAni = data;
		},

		// 返回tab首页时刷新数据
		ISHOMETABREFRESH(state, data) {
			state.isHomeTabRefresh = data;
		},

	},

	actions: {
		//setMapMarkerBg({ commit }, o){
		//  commit("SETMAPMARKERBG", o);
		//},

	}
})

export default store
