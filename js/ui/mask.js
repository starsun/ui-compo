/**
 * @author xinlin.zhengxl | xinlin.zhengxl@alibaba-inc.com
 * 遮罩层
 * 	new ns.Mask({
 * 		base : JNode 遮罩层的宿主
 * 		target: JNode 遮罩目标对象
 * 		noIframe: Boolean 是否需要iframe
 * 		noPosition: Boolean 是否需要定位
 * 	})
 */
(function(ns, $) {
	ns.Mask = function(cfg){
		if(cfg.target){
			if (cfg.target == window) {
				var _h_b =  $("body").height();
				var _h_w = document.documentElement.clientHeight;
				cfg.width = "100%";
				cfg.height = _h_b > _h_w ? _h_b : _h_w;
				cfg.top = 0;
				cfg.left = 0;
			} else {
				var _tar = cfg.target;
				cfg.width = _tar[0].offsetWidth;
				cfg.height = _tar[0].offsetHeight;
				if(!cfg.noPosition){
					var pos = _tar.position();
					cfg.top = pos.top;
					cfg.left = pos.left;
				}
			}
		}
		this._mask = this.createMask(cfg);
	};
	ns.Mask._count = 0;
	ns.Mask.prototype = {
		createMask:function(cfg){
			var base = cfg.base ? cfg.base : $('body');
			var id = 'mask_'+ ns.Mask._count;
			var mask_str = [
				'<div class="lt-mask" id="',
				id,
				'" style="width:',
				fixUnit(cfg.width),
				';height:',
				fixUnit(cfg.height),
				';top:',
				fixUnit(cfg.top),
				';left:',
				fixUnit(cfg.left)
			]
			if(cfg.zIndex){
				mask_str.push(';z-index:'+cfg.zIndex);
			}
			mask_str.push('">');
			if(!cfg.noIframe){
				mask_str.push('<iframe class="lt-mask-iframe" disabled="disabled"></iframe>');
			}
			mask_str.push('</div>');
			base.append(mask_str.join(''));
			ns.Mask._count++;
			function fixUnit(v){
				if(/(%|px)$/.test(v)) return v;
				else return v+ "px";
			}
			return id;
		},
		show:function(){
			$("#"+this._mask).show();
		},
		hide:function(){
			$("#"+this._mask).hide();
		},
		height:function(h){
			$("#"+this._mask).height(h);
		},
		destory:function(){
			$("#"+this._mask).remove();
		}
	};
})(Widget, jQuery);
