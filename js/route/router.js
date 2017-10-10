define(['lib/backbone', 'list/list', 'layer/layer', 'collection/img'], function(Backbone, List, Layer, ImageCollection) {
	// 实例化集合
	var pc = new ImageCollection();
	// 实例化视图
	var layer = new Layer({
		el: '#app',
		// 绑定集合
		collection: pc
	});
	var list = new List({
		el: '#app',
		// 绑定集合
		collection: pc
	})
	// 第一步 路由类
	var Router = Backbone.Router.extend({
		// 定义规则
		routes: {
			// 大图页
			'layer/:id': 'showLayer',
			// 列表页
			'*other': 'showList'
		},
		// 展示大图页
		showLayer: function(id) {
			// console.log(id, 'layer')
			layer.render(id)
			// 渲染大图页要隐藏列表页，显示大图页
			$('#layer').show();
			$('#list').hide();
		},
		// 展示列表页
		showList: function() {
			// console.log('list')
			// 这里一定要注意，我们注释了
			// list.render()
			// 渲染列表页，要隐藏大图页，显示列表页
			$('#layer').hide();
			$('#list').show();
		}
	})
	// 第二步 实例化
	var router = new Router()
	// 第三步 启动路由
	// Backbone.history.start();
	return function() {
		Backbone.history.start()
	}
})