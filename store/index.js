import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: '',
		familyId: '',
		userInfo: {},
		isOpenIndexAni: false, // 是否开启首页动画
	},

	mutations: {
		// 设置token
		SETTOKEN(state, data) {
			state.token = data;
		},

		// 设置familyId
		SETFAMILYID(state, data) {
			state.familyId = data;
		},

		// 设置userInfo
		SETUSERINFO(state, data) {
			state.userInfo = data;
		},	
		
		// 设置userInfo
		SETINDEXANI(state, data) {
			state.isOpenIndexAni = data;
		},

	},

	actions: {
		//setMapMarkerBg({ commit }, o){
		//  commit("SETMAPMARKERBG", o);
		//},

	}
})

export default store
