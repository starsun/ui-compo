/**
 * tab组件  @sapphire.shand
 * 基于jquery
 * @20111229
 * 
 * 调用 ALP.tab.init("#tab", function(i){alert(i);}, 0);
 *
 */
(function(ns, $){
    ns.tab = {
        /**
         * @param {Object} Jnode   父节点 "#tabId"
         * @param {Object} cb	   回调方法，回传i(当前点击的第几个tab，从0开始)
         * @param {Object} n	   初始化时哪个tab先触发
         */
        init: function(Jnode, cb, n){
        
            var obj = $(Jnode);
            
            var tabBody = obj.find(".lt-tab-body");
            $(obj.find(".lt-tab-t")).each(function(i){
                $(this).attr("bpTab", i);
            });
            
            $(tabBody).each(function(i){
                $(this).addClass("lt-tab-body-" + i);
            });
            
            obj.find(".lt-tab-t").bind("click", function(){
                var self = $(this);
                var i = self.attr("tab")
                obj.find(".current").removeClass("current");
                self.addClass("current");
                tabBody.hide();
                obj.find(".lt-tab-body-" + i).show();
                if (cb) {
                    cb(i, this);
                }
                return false;
            });
            
            //初始化
            tabBody.hide();
            if (!n) {
                n = 0
            }
            obj.find(".lt-tab-t").eq(n).trigger("click");
            
            
        }
    };
})(Widget, jQuery);
