/**
 * hash 格式
 * 	#key=value&key=value&key=value
 * 	key: 字母开头，数字字母
 * 	value: 
 * 		-String	sdadf	== 'sdadf'
 * 		-Array    1,2,3,4	==  [1,2,3,4]	一个维度
 * 		-Object	a@b,c@d	 == 	{a:'b',c:'d'} 一个维度
 */
(function(ns){
	ns.URLHash = {
		_win:null,
		_hash:{},
		init:function(win){
			var hash,map={},tmp;
			win = win ? win : window;
			this._win = win;
			
			hash = win.location.hash.replace(/^#/,'');
			if(hash)
				this._hash = this._str2obj(hash,'&','=');
		},
		get:function(name,type){
			var v = this._hash[name];
			if(!v) return null;
			if(!type) 
				return v;
			else if(type =='ARRAY')
				return this._str2obj(v,',');
			else if(type =="OBJECT")
				return this._str2obj(v,',','@');
		},
		set:function(name,data){
			this._hash[name] = this._obj2str(data,',','@');
			this._win.location.hash = this._obj2str(this._hash,'&','=');
		},
		remove:function(name){
			if(!name){
				this._win.location.hash = '';
			}else{
				if(this._hash[name]) delete this._hash[name];
				this._win.location.hash = this._obj2str(this._hash,'&','=');
			}
		},
		_str2obj:function(str,a,b){
			var hash,map={},tmp;
			hash = str.split(a);
			if(!b) return hash;
			for(var i=0,n=hash.length;i<n;i++){
				tmp = hash[i].split(b);
				map[tmp[0]] = tmp[1];
			}
			return map;
		},
		_obj2str:function(obj,a,b){
			if(obj.constructor == Array){
				obj.join(a);
			}else if(obj.constructor == Object){
				var aa = [];
				for(var i in obj){
					aa.push(i+b+obj[i]);
				}
				return aa.join(a);
			}else{
				return obj;
			}
		}
	};
})(Util);
