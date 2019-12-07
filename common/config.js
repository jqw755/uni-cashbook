let config = {
	active: "test", // 环境变量

	globalImgUrl: "/static/images", //	静态图片主路径

	key: "4cb79fa85032cf9370e8b9a199eefc2a", // 地图KEY

	defaultLatLog: {
		latitude: 0,
		longitude: 0
	},

	// 各个环境下域名
	dev: {
		baseUrl: "http://rap2api.taobao.org/app/mock/237547",
	},
	test: {
		baseUrl: "http://192.168.1.106:8080/cashbook"
	},
	pro: {
		baseUrl: ""
	},
  getConfig() {
    return config[this.active];
  }

};

export default config;
