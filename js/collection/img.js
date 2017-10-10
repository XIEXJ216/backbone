define(['lib/backbone', 'model/img', 'lib/zepto', 'lib/underscore'], function(Backbone, ImageModel, $, _) {
	// 创建图片的集合
	var ImageCollection = Backbone.Collection.extend({
		// 关联模型
		model: ImageModel,
		// 定义id类加载器
		modelID: 0,
		// 定义请求地址
		url: 'data/imageList.json',
		// 定义请求数据的方法
		fetchData: function() {
			// 缓存this
			var me = this;
			// console.log(this)
			// 请求数据
			$.get(this.url, function(res) {
				// console.log(res)
				// 如果请求成功，我们将数据存储在集合中
				if(res && res.errno === 0) {
					// 为了增加体验，我们希望展示的效果在变，因此我们可以对数据乱序
					res.data.sort(function() {
						return Math.random() > .5 ? 1 : -1;
					})
					// 打开大图页要在集合中，要根据id，寻找到模型，为每一个模型添加id
					// 为返回的数据添加id，在创建模型的时候，模型就拥有了id
					// 遍历data数据，为每一个成员添加id属性
					_.forEach(res.data, function(obj, index, arr) {
						// obj添加id
						obj.id = ++me.modelID
					})
					// console.log(this)
					me.add(res.data)
					// 查看结果
					// me.forEach(function(model, index, models) {
					// 	console.log(model.toJSON())
					// })
				}
			})
		}
	})

	// 暴露接口
	return ImageCollection;
	// 测试
	// var ic = new ImageCollection();
	// ic.fetchData()
})