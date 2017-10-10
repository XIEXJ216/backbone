define(['lib/backbone', 'lib/underscore', 'lib/zepto', 'css!./layer.css'], function(Backbone, _, $) {
	// 窗口高度
	var height = $(window).height();
	// 创建视图
	return Backbone.View.extend({
		// 定义当前图片id
		currentImageId: 0,
		// 绑定事件
		events: {
			'tap .layer .image-container img': 'toggleHeader',
			
			// 向左划
			'swipeLeft .layer .image-container img': 'showNextImage',
			// 向右滑
			'swipeRight .layer .image-container img': 'showPrevImage',
			// 点击返回按钮
			'tap .layer .go-back': 'goBack'
		},


		tpl: _.template($('#tpl_layer').text()),

		
		// 返回逻辑
		goBack: function() {
			history.go(-1)
		},
		// 显示下一张图片
		showNextImage: function() {
			
			this.currentImageId++;
			// 根据id获取图片
			var model = this.collection.get(this.currentImageId);
			
			if (model) {


				// 显示图片
				location.hash = '#/layer/' + this.currentImageId;
			} else {
				// 提示用户
				alert('已经是最后一张了！')
				// 更新当前id
				this.currentImageId--;
			}
		},
		// 显示上一张图片
		showPrevImage: function() {
			// 更新当前图片id
			this.currentImageId--;
			// 获取模型
			var model = this.collection.get(this.currentImageId);
		
			if (model) {
				
				location.hash = '#/layer/' + this.currentImageId;
			} else {
				// 提示用户
				alert('已经是第一张了');
				// 更新当前id
				this.currentImageId++;
			}
		},
		// 渲染图片
		randerImage: function(model) {
			// 更新图片
			this.$('.layer .image-container img').attr('src', model.get('url'))
			// 更新标题
			this.$('.layer .header h1').html(model.get('title'))
		},
		// 切换标题的方法
		toggleHeader: function() {
			// 切换layer中的header元素
			this.$('.layer .header').toggle()
		},
		// 定义渲染的方法
		render: function(id) {
			
			//  获取数据
			var model = this.collection.get(id);
			
			// 模型不存在，不能进入大图页
			if (!model) {
				// 进入列表页
				Backbone.history.location.replace('#/')
				return;
			}
			// 缓存当前图片的id
			this.currentImageId = model.get('id');
			var obj = {
				src: model.get('url'),
				style: 'line-height: ' + height + 'px',
				title: model.get('title'),
			}
			
			// 获取容器元素
			var dom = this.$('#layer')
			//  获取模板
			//  格式化模板
			var html = this.tpl(obj)
			//  渲染视图
			dom.html(html);
			
		}
	})
})