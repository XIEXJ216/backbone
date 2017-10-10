// 入口文件
// 定义配置
require.config({
	// 模块化
	shim: {
		// 模块Backbone
		'lib/backbone': {
			// 暴露接口
			exports: 'Backbone',
			// 依赖
			deps: ['lib/underscore', 'lib/zepto', 'lib/zepto.touch']
		},
		// underscore
		'lib/underscore': {
			// 暴露接口
			exports: '_'
		},
		// zepto
		'lib/zepto': {
			// 暴露接口
			exports: '$'
		},
		// zepto.touch
		'lib/zepto.touch': {
			// 暴露接口
			exports: '$',
			// 依赖集合
			deps: ['lib/zepto']
		}
	},
	// 配置css插件
	map: {
		// 第一步 配置css插件
		'*': {
			css: 'lib/css'
		}
	}
})

// 引入模块
// 第二步 引入css
require(['route/router', 'lib/backbone', 'css!reset.css'], function(router, B) {
	// 启动路由
	router()
})