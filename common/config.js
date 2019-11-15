let config = {
	active: "dev", // 环境变量

	globalImgUrl: "/static/images", //	静态图片主路径

	key: "4cb79fa85032cf9370e8b9a199eefc2a", // 地图小程序KEY

	defaultLatLog: {
		latitude: 0,
		longitude: 0
	},

	// 各个环境下域名
	dev: {
		baseUrl: ""
	},
	test: {
		baseUrl: ""
	},
	pro: {
		baseUrl: ""
	},
  getConfig() {
    return config[config.active];
  }

};

export default config;
