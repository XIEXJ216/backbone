// 定义图片模型模块
define(['lib/backbone', 'lib/zepto'], function(Backbone, zepto) {
	// 获取图片的宽度  (屏幕的宽度 - 3个边距) / 2 
	var w = ($(window).width() - 6 * 3) / 2;
	// 定义模型类
	var ImageModel = Backbone.Model.extend({
		// 适配数据，在构造函数中
		initialize: function() {
			// 适配绘制的宽高
			// h2 = w2 / w1 * h1
			var h = w / this.attributes.width * this.attributes.height;
			// 将高度和宽度存储
			this.attributes.drawWidth = w;
			this.attributes.drawHeight = h;
		}

	})
	// 暴露接口
	return ImageModel;
	// 实例化
	// var im = new ImageModel({
	// 		"title": "摄影作品鉴赏",
	// 		"url": "img/02.jpg",
	// 		"type": 0,
	// 		"width": 954,
	// 		"height": 722
	// 	})
	// console.log(im.toJSON(), im.get('drawWidth') / im.get('drawHeight'), im.get('width') / im.get('height'))
})