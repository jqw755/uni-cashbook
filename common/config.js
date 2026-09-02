let config = {
	active: "dev", // 环境变量

	globalImgUrl: "/static/images", //	静态图片主路径

	key: "", // 地图KEY

	defaultLatLog: {
		latitude: 0,
		longitude: 0
	},

	// 各个环境下域名
	dev: {
		// baseUrl: "http://rap2api.taobao.org/app/mock/237547",
		baseUrl: "http://localhost:3000/cashbook/api/v1", // koa提供服务
		// baseUrl: "http://101.132.176.130:3000/cashbook/api/v1", // ali
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
