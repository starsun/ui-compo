/**
 * sapphire.shand@alibaba-inc.com
 * 20120222
 * 问题：options参数 处理 及 验证
 * input初始化 和tab初始化
 * data的来源
 */

jQuery.namespace('Lite.UI');

(function(ns, $) {
	
	ns.AreaSelect = function() {};
	
	var areaSelects = {};
	
	/**
	 * 
	 * @param {Object} id 容器JId
	 * @param {Object} options  grade:int 显示几级 cGrade:int 选择几级算是完成选择 _txtId:string source: str[url 异步请求接口] json[数据源], codes默认地址值
	 * @param {Object} callback
	 */
	ns.getAreaSelect = function(wrapId, options, callback){
		
		if (!areaSelects[wrapId]) {
			areaSelects[wrapId] = new ns.AreaSelect();
			areaSelects[wrapId]._cb = callback;
			areaSelects[wrapId]._options = options;
			areaSelects[wrapId]._wrapId = wrapId;
			areaSelects[wrapId]._wrap = $(wrapId);
			areaSelects[wrapId]._txt = $(options.txtId);
			areaSelects[wrapId]._codes = options.codes || [-1, -1, -1];
			areaSelects[wrapId]._data = {1: areaData.province, 2: areaData.city, 0: areaData.hotCity, 3: areaData.county, 4: areaData.parent};
			
		}
		return areaSelects[wrapId];
	}		
	
	$.extend(ns.AreaSelect.prototype,{
		
//		_data : {1: areaData.province, 2: areaData.city, 0: areaData.hotCity, 3: areaData.county, 4: areaData.parent},
		
		titleCN : {0: '常用', 1: '省', 2: '市', 3: '区县'},
		/**
		 * 绑定事件，如果没有，则先创建
		 */
		init: function(){	
			var self = this;
			if (this._wrap.find('div.s-tab-b').length == 0) {
				this.create();
				this.initTab();
				this.setTab(0);
			}
			
			this._wrap.find("div.s-tab-b").click(function(e){
				var target = $(e.target||e.srcElement)
				,	code = parseInt(target.attr("code"),10)
				,	index = parseInt(target.parents('div.s-tab-b[index]').attr('index'), 10)
				;
				
				if (isNaN(code)) { //not a num
					return;
				}
					
				self.itemClickHandler(index, code);
				return false;
			});
			
			this._txt.focus(function(e){
				self.open();
			});
			
	
		},
		/**
		 * 对当前tab的处理 设置code
		 * @param {int} code item的code
		 * @param {int} index 点击的tab index
		 */
		itemClickHandler:function(index, code) {
			var indexTab = this._wrap.find("div.s-tab-b[index="+index+"]")
			,	parentCode
			,	index = parseInt(index,10) || 0
			,	code = parseInt(code,10) || -1
			;
			
			if (index == this._options.grade) {//选择最后一个tab中的元素
				this.close();
			} else{

				if (index == 0) {
					index = index == 0 ? 2 : index;//选择热门城市的处理
					parentCode = this._data[4][code];
					this.setTabBody(1, -1);
					this.setTabBody(2, parentCode);
				}
				this.setTab(index + 1, code);
				
				if (parentCode) {
					this.setCode(0, parentCode);
				}
			}

			this.setCode(index - 1, code);
			this.setSelectItem();
			this.setTxt();			
		},
		
		close:function(){
			this._wrap.hide();
		},
		
		open:function(){
			this._wrap.show();
		},
		
		getCode: function() {
			return this._code;
		},		
		/**
		 * 
		 * @param {int} index 0 1 2 省市区
		 * @param {int} code 代码
		 */
		setCode: function(index, code) {
			
			var	index = parseInt(index,10) || 0
			,	code = parseInt(code,10) || -1
			;	
			
			this._codes[index] = code;
			
			for (var i = index+1; i < 3; i++) {
				this._codes[i] = -1; 
			}
		},	
		
		
		getTxt: function() {
			var address = [], i, n, parent;
			
			if (this._txt.length == 0) {
				return;
			}
						
			for (i = 0; i < this._codes.length; i++) {
				if (this._codes[i] != -1 && i == 0) {
					parent = this._data[1];
					for (n in parent) {
						if (parent[n][this._codes[0]]){
							address[0] = parent[n][this._codes[0]];
							break;
						}
					}
				}
				if (this._codes[i] != -1 && i !== 0) {
					parent = this._data[i+1][this._codes[i-1]];
					if (parent[this._codes[i]]){
						address[i] = parent[this._codes[i]];
					}
				}			
			}			
			
			return address;
		},
		
		setTxt: function() {
			
			var address = this.getTxt().join('-');
			this._txt.val(address);	
			
		},
		
		/**
		 * 初始化tab
		 * tab切换
		 */
		initTab: function() {
			var self = this;
			this._wrap.find("ul.h li span").click(function(e) {
				var target = $(e.target||e.srcElement)
				,	index = parseInt(target.parent().attr("index"),10)
				;
				
				if (isNaN(index)) {
					return;
				}
				self.setTab(index);
				return false;
			});
			
		},
		
		setSelectItem: function() {
			var node = this._wrap.find("div.s-tab-b"), i, code;
			
			node.find("li a.current").removeClass("current");
			
			for (i = 0; i < 3; i++) {
				code = this._codes[i];
				if (code !== -1) {
					node.find("ul li a[code=" + code + "]").addClass("current");
				}
			}
		},
		
		/***
		 * 设置tab
		 * @param {int} index 待设置tab的index
		 * @param {int} parentCode 上一级的code 
		 */
		setTab:function(index, parentCode) {
			var	index = parseInt(index,10) || 0
			,	parentCode = parseInt(parentCode,10) || -1
			;
		
			this.setTabTitle(index);
			this.setTabBody(index, parentCode);
		},

		setTabTitle: function(index) {
			this._wrap.find("ul.h li.current").removeClass("current");
			this._wrap.find("ul.h li[index=" + index + "]").addClass("current");
		},
		
		/**
		 * @param {int} parentCode 上一个index的code 通过parentCode 获得此tab要显示的数据
		 * @param {int} index 类型：0 hotCity 1 province 2 city 3 county  常用 省 市 区
		 */
		setTabBody: function(index, parentCode) {
			var data, html, node, parentCode;
			//parentCode == -1 说明点击title
			if (index > 0) {
				parentCode = parentCode == -1 ? this._codes[index - 1] : parentCode;
			}
			node = this._wrap.find("div.s-tab-b[index=" + index + "]");
			
			if ((index > 1 && this._codes[index-1] != parentCode) || (index <= 1 && node.find('ul').length == 0)) {//需要重绘

				if (index > 1) {
					data = this._data[index][parentCode];
				}else {
					data = this._data[index];
				}
				
				if (1 == index) {//对省的特殊处理
					html = this.getCategoryListView(data);
				} else {
					html = this.getListView(data);
				}
				node.html(html);
			}
			this._wrap.find("div.s-tab-b").hide();
			node.show();	
			
		},	
				
		/**
		 * 
		 * @param {Object} data {1002:"安徽省",1098:"北京",1103:"福建省",1181:"甘肃省",1277:"广西壮族自治区",1382:"贵州省",2614:"广东省",3262:"重庆",4853:"澳门特别行政区"}
		 */
		getListView: function(data) {
			var tpl = ['<ul>'], n;
			
			for (n in data) {
				tpl.push('<li><a code="' + n + '" class="panel-item" href="javascript:;">' + data[n] + '</a></li>');
			}
			tpl.push('</ul><div class="c" />');
			
			return tpl.join('');
			
		},
	
		getCategoryListView: function(data) {
			
			var tpl = [], n;
			
			for (n in data) {
				tpl.push('<dl class="panel-category"><dt>' + n + '</dt><dd>');
				tpl.push(this.getListView(data[n]));
				tpl.push('</dd></dl>');	
			}
			
			return tpl.join('');		
		},
		
	
			
		create: function() {
			var grade, html = ['<ul class="h">'], div=[], n;
			
			this._options.grade == this._options.grade || 3;
			
			grade = this._options.grade;
					
			
			
			for (n = 0; n < grade+1; n++) {
				html.push('<li class="s-tab-t" index="' + n + '"><span class="inner">' + this.titleCN[n] + '</span></li>');
				div.push('<div index="' + n + '" class="s-tab-b"></div>');
			}
			
			html.push('<span class="alp-icon alp-close alp-close-area"></span><div class="c"></div></ul>');
			html.push(div.join(''));
			html.push('<div class="c"></div>');
			
			this._wrap.html(html.join(''));
			
		}
		
	});	
	
})(Lite.UI, jQuery);

