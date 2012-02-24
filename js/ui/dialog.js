/**
 * dialog组件  @jiali.shijl
 * 基于jquery
 * @20120104
 * 
 * @param {Object} _cfg
 * 					-width
 * 					-height
 * 					-zIndex
 * 					-title
 * 					-content
 * 					-base dialog的父级元素
 * 					-border
 * 					-mask  bool  true 默认  true:全窗口覆盖，false只有窗体背后一点
 * 					-padding	默认4  外边框阴影宽度
 * 					-center 是否居中
 * 					-noclose  bool 没有关闭按钮
 * 
 * 			onOpen:fucntion(){}
 * 			onClose:function(){}
 * 			onHide:function(){}
 * 			onResize:function(){}
 */
(function(ns, $) {
	ns.Dialog = function(_cfg){
		var cfg = {
			mask:true,
			padding:4,
			center:true
		};
		var evts = ns.Dialog.event,self = this;
		$.extend(cfg,_cfg);
		this._base = cfg.base;
		if(!cfg.base) cfg.base = $("body");
		this._count = ns.Dialog.count++;
		cfg.base.append(this._html.replace({
			title:cfg.title,
			cnt:cfg.content,
			id:this._count,
			noclose:cfg.noclose
		}));
		
		var id = "#lt-dialig-"+this._count ;
		var node = $(id);
		var outerCss = {zIndex:cfg.zIndex};
		if(!cfg.mask) outerCss.padding = cfg.padding;
		this.hasMask = cfg.mask;
		node.css(outerCss);
		//控制标题栏
		if(!cfg.title){
			node.find('div.lt-head').hide();
		}
		
		
		node[0].instance = this;
		
		var overflow = "";
		if(cfg.height){overflow = "hidden";}
		
		node.find('> div.lt-dialog-inner').css({
			width:cfg.width,
			height:cfg.height,
			overflow:overflow
		});
		node.find("div.lt-head").bind("mousedown",function(e){
			var offset,pos_base;
			var n = $(id);
			if(e.target.className.indexOf('-btn') != -1) return;
			e = e.originalEvent;
			if(e.layerX) offset = [e.layerX,e.layerY];
			else offset = [e.offsetX,e.offsetY];
			//base offset
			if (self._base) {
				pos_base = self._base.offset();
				offset[0] += pos_base.left;
				offset[1] += pos_base.top;
			}
			
			$(document).bind("mousemove",_mousemove).bind("mouseup",_mouseup);
			function _mousemove(e){
				document.body.onselectstart=function(){return false};
				n.css({
					top:e.pageY - offset[1],
					left:e.pageX - offset[0]
				});
			}
			function _mouseup(e){
				document.body.onselectstart=null;
				$(document).unbind("mousemove",_mousemove).unbind("mouseup",_mouseup);
			}
		});
		this._id = id;
		var self = this;

		node.find('a[rel=close]').bind("click",function(e){
			self.close();
			e.stopPropagation();
			return false;
		})
		
		for( var i =0 ; i < evts.length ; i++){
			if(cfg[evts[i]]) $(this).bind(evts[i],cfg[evts[i]]);
		}
		this.show();
		if(cfg.center)
			this.setCenter(node)
		else
			node.css({
				left:cfg.left,
				top:cfg.top
			})
		//焦点
		node[0].focus();
		node = null;
	}
	ns.Dialog.count = 0;
	ns.Dialog.event = ['onOpen','onClose','onHide','onResize'];
	ns.Dialog.prototype = {
		_closed:false,
		_count:null,
		_html:new Util.Template('<div class="lt-dialog" id="lt-dialig-#{id}">\
				<div class="lt-dialog-inner">\
					<div class="lt-head">\
						<div class="lt-bg lt-bg-l"></div>\
						<div class="lt-bg lt-bg-r"></div>\
						<div class="lt-bg lt-bg-c">\
							#{if(!#noclose)}<a href="app:close-dialog" class="lt-btn-close" rel="close"></a>#{endif}\
							<span class="lt-tit">#{title}</span>\
						</div>\
					</div>\
					<div class="lt-cnt">\
						<div class="lt-inner">\
							#{cnt}\
						</div>\
					</div>\
				</div>\
			</div>'),
		close:function(){
			if(this._closed) return;
			if(this.hasMask)ns.Dialog._mask.hide();
			$(this).trigger('onClose');
			var node = $(this._id);
			node[0].instance = null;
			node.remove();
			this._base = null;
			this._closed = true;
		},
		hide:function(){
			if(this.hasMask)ns.Dialog._mask.hide();
			$(this).trigger('onHide');
			$(this._id).hide();
		},
		show:function(){
			if(this.hasMask)this.setMask();
			$(this._id).show();
			$(this).trigger('onOpen');
		},
		resize:function(cfg){
			var _cfg;
			if(cfg.width){
				_cfg.width = cfg.width;
				delete cfg.width;
			}
			if(cfg.height){
				_cfg.height = cfg.height;
				delete cfg.height;
			}
			$(this._id).css(cfg).find('> div.lt-dialog-inner').css(_cfg);
			$(this).trigger('onResize');
		},
		bind:function(event,func){
			$(this).bind(event,func);
		},
		unbind:function(){
			$(this).unbind(event,func);	
		},
		find:function(jselect){
			return $(this._id).find(jselect);
		},
		setTitle:function(tit){
			var node = $(this._id + ' div.lt-head');
			if(!tit)
				$(this._id + ' div.lt-head').hide();
			else{
				$(this._id + ' div.lt-head').show().find('span.lt-tit').html(tit);
			}
		},
		setContent:function(cnt){
			$(this._id + ' div.lt-inner').html(cnt);
		},
		setPosition:function(pos){
			$(this._id).css(pos);
		},
		setCenter:function(node){
			var offset_top = $(document).scrollTop();
			var main_h = $(window).height();
			var main_w = $(window).width();
			var self_h = node.height();
			var self_w = node.width();
			node.css({
				left: (main_w - self_w)/2,
				top: offset_top + ((main_h - self_h) > 40 ? (main_h - self_h)/2 : 20)
			})
		},
		setMask:function(){
			if (!ns.Dialog._mask) {
				ns.Dialog._mask = new ns.Mask({
					target: window,
					noIframe: true,
					base: this._base
				});
			} else 
				ns.Dialog._mask.show();
		}
	}

	/**
	 * 
	 * @param {Object} cfg
	 * 					-width
	 * 					-content
	 * 					-title
	 * 					-type  String: INFO/WARN/ERROR/SUCC/HELP
	 * 					-onClose
	 * 					-label 
	 * 	ns.alert({
			title:"阿萨德飞",
			content:"爱的发生的费空间按萨德",
			type:'SUCC'
		})
	 */
	ns.alert = function(cfg){
		var icon = {
			INFO:'alp-icon-info alp-info48',
			WARN:'alp-icon-info alp-failed48',
			ERROR:'alp-icon-info alp-prob48',
			SUCC:'alp-icon-info alp-success48',
			HELP:'alp-icon-info alp-help48'
		};
		//cfg.type = cfg.type ? cfg.type : 'WARN';
		cfg.label = cfg.label ? cfg.label : '确 定';
		var default_cfg = {
			width:300,
			content:'<div class="lt-dialog-msg"><div class="l"><i class="'+icon[cfg.type]+'"></i></div><div class="info">'+cfg.content+'</div><div class="c"></div></div>\
					<div class="lt-dialog-opt ar">\
						<a class="alp-btns-s" href="javascript:closeAlert" rel="close"><span class="inner">'+cfg.label+'</span></a>\
					</div>',
			mask:false,
			type:'WARN'
		};
		delete cfg.content;
		$.extend(default_cfg,cfg);
		var dia = new ns.Dialog(default_cfg);
		if(cfg.onClose)
			dia.bind('onClose',cfg.onClose);
	};
	/**
	 * 
	 * @param {Object} cfg
	 * 		-labelConfirm
	 * 		-labelCancel
	 * 		-onConfirm:function() 	确定
	 * 		-onCancel:function()	取消
	 * 		ns.confirm({
	 *			title:"阿萨德飞",
	 *			content:"爱的发生的生的阿斯顿浪费空间按萨德",
	 *			type:'SUCC',
	 *			onConfirm:function(){alert(1)},
	 *			onCancel:function(){alert(0)}
	 *		})
	 */
	ns.confirm = function(cfg){
		var icon = {
			INFO:'lt-t-info48',
			WARN:'lt-t-failed48',
			ERROR:'lt-t-prob48',
			SUCC:'lt-t-success48',
			HELP:'lt-t-help48'
		};
		cfg.labelConfirm = cfg.labelConfirm ? cfg.labelConfirm : '确 定';
		cfg.labelCancel = cfg.labelCancel ? cfg.labelCancel : '取 消';
		var default_cfg = {
			width:300,
			content:'<div class="lt-dialog-msg"><div class="l"><i class="'+icon[cfg.type]+'"></i></div><div class="info">'+cfg.content+'</div><div class="c"></div></div>\
					<div class="lt-dialog-opt ar">\
						<a class="alp-btns-s" href="javascript:;" rel="confirm"><span class="inner">'+cfg.labelConfirm+'</span></a>&nbsp;\
						<a class="alp-btns-s" href="javascript:;" rel="cancel"><span class="inner">'+cfg.labelCancel+'</span></a>\
					</div>'
		};
		delete cfg.content;
		$.extend(default_cfg,cfg);
		var dia = new ns.Dialog(default_cfg);
		$(dia._id+' a[rel]').bind('click',function(){
			var act = $(this).attr('rel');
			dia.close();
			if(act == 'confirm'){
				if(cfg.onConfirm)cfg.onConfirm();
			}else if(act == 'cancel' ){
				if(cfg.onCancel)cfg.onCancel();
			}else if(act == 'close'){
				if(cfg.onCancel)cfg.onCancel();
			}
			dia == null;
			return false;
		});
	};
})(Widget, jQuery);