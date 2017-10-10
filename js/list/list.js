define(['lib/backbone', 'lib/underscore', 'css!./list.css'], function(Backbone, _) {
	// 创建视图
	var List = Backbone.View.extend({
		// 绑定事件
		events: {
			//  搜索按钮，绑定事件
			'tap .search span': 'gotoSearch',
			//分类按钮，绑定事件
			'tap .nav li': 'showTypeImage',
			// 返回按钮绑定事件
			'tap .go-top': 'goToTop'
		},

		// 定义模板
		tpl: _.template('<a href="<%=href%>"><img style="<%=style%>" src="<%=src%>" alt="" /></a>'),
		// 定义记录左右容器高度
		leftHeight: 0,
		rightHeight: 0,
		// 定义构造函数
		initialize: function() {
			// 初始化数据
			this.initDOM();
			// 跨对象监听
			this.listenTo(this.collection, 'add', function(model, collection, options) {

				this.render(model)
			})
			// 获取数据
			this.getData();
			// 绑定事件
			this.bindEvent();
		},
		// 绑定事件
		bindEvent: function() {
			var me = this;
			// 时间节流
			var fn = _.throttle(function() {
				me.getData();
			}, 500)
			// 为window绑定事件
			$(window).on('scroll', function() {
				// 比较高度
				if ($('body').height() < $(window).scrollTop() + $(window).height() + 200) {
					fn();
				}
				// 切换返回顶部按钮的显隐
				me.toggleGoTop();
			})
		},
		// 返回顶部
		goToTop: function() {
			// 返回顶部
			window.scrollTo(0, 0)
		},
		// 切换返回顶部的显隐
		toggleGoTop: function() {
			// 距离顶部大于500像素显示
			if ($(window).scrollTop() > 500) {
				this.$('.go-top').show()
			} else {
				this.$('.go-top').hide()
			}
		},
		// 定义获取数据的方法
		getData: function() {
			// 通过集合获取数据
			this.collection.fetchData();
		},
		
		initDOM: function() {
			// 左容器
			this.leftContainer = this.$('.left-container');
			// 右容器
			this.rightContainer = this.$('.right-container');
		},
		render: function(model) {
			// 缓存高度
			var height = model.get('drawHeight');
			//  获取数据
			var obj = {
				href: '#layer/' + model.get('id'),
				src: model.get('url'),
				style: 'width: ' + model.get('drawWidth') + 'px; height: ' + height + 'px'
			}
	
			//  格式化模板
			var html = this.tpl(obj);

			//  渲染视图
			if (this.leftHeight <= this.rightHeight) {
				this.renderLeft(html, height);
			} else {
				this.renderRight(html, height);
			}
		},
		
		// 渲染左边容器
		renderLeft: function(html, height) {
		
			this.leftContainer.append(html)
		
			this.leftHeight += height + 6;
		},
		

		// 渲染右边的容器
		renderRight: function(html, height) {
			// 添加图片
			this.rightContainer.append(html);
			// 改变高度
			this.rightHeight += height + 6;
		},



		// =============================
		// 获取搜索框内容
		getSearchInputValue: function() {
			return this.$('.search input').val();
		},
		// 校验搜索内容
		checkSearchValue: function(query) {
			// 校验空白符
			return /^\s*$/.test(query)

		},
		// 过滤集合

		collectionFilter: function(query) {
			
			return this.collection.filter(function(model, index, models) {
			
				// 过滤标题
				return model.get('title').indexOf(query) >= 0;
			})
		},

		// 清空视图
		clearView: function() {
			// 清空内容
			this.leftContainer.html('');
			this.rightContainer.html('');
			// 清空高度
			this.leftHeight = 0;
			this.rightHeight = 0;
		},
		// 渲染结果
		renderResult: function(result) {
			var me = this;
		
			_.forEach(result, function(model, index, arr) {
				me.render(model)
			})
		},
		// 清空输入框
		clearSearchInput: function() {
			// 获取input元素，清空
			this.$('.search input').val('')
		},

		// 去除首尾空白符
		trim: function(value) {
			return value.replace(/^\s+|\s+$/g, '')
		},


		// 定义搜索按钮点击事件
		gotoSearch: function() {
			//  获取input的内容
			var query = this.getSearchInputValue();
			//  校验合法性
			console.log(111,query)
			if (this.checkSearchValue(query)) {
				
				alert('请输入内容！')
				return ;
			}
			//  过滤集合
			var result = this.collectionFilter(this.trim(query))
			//  清空视图
			this.clearView();
			//  渲染视图
			this.renderResult(result);
			//  清空输入框
			this.clearSearchInput();
		},


		
		// ===============================获取事件对象=================
		getDOMID: function(e) {
			
			return this.$(e.target).data('type')
		},
		// 获取集合中，该类的数据
		getTypeResult: function(id) {

			console.log(id);
			
			return this.collection.groupBy('type')[id]
		},
		// 点击分类按钮，回调函数
		showTypeImage: function(e) {
			//  获取分类的数据
			var id = this.getDOMID(e)
			//  过滤集合数据
			var result = this.getTypeResult(id);
			//  清空视图
			this.clearView();
			//  渲染数据
			this.renderResult(result);
		}
	})
	return List;
})