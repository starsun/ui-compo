/**
 * 字符串常用方法
 * sapphire.shand 
 */
//删除字符串首尾空格、空行, 包含全角空格，注:JQuery的trim并不去除全角空格
String.prototype.trim = function(){
    return this.replace(/^[\s\u3000]+|[\s\u3000]+$/g, "");
};
//删除字符串中的所有全半角空格
String.prototype.trimAll = function(){
	return this.replace(/[\s\u3000]/g, "");
};
/**
 * 字符串全半角转换
 * 	只转换 数字，英文字母，以及部分标点，\uFF00-\uFF65 请参考：http://www.nengcha.com/code/unicode/class/145/
 *
 * 	注意：
 * 		平时输入法输入的"。‘ ’ “ ” 、《》" 时，
 * 			输入法默认采用中文标点时，真的很乱：
 * 						单双引号在 ：2018 2019  | 201c 201d , 请参考： http://www.nengcha.com/code/unicode/class/68/
 * 						小中括号在：\u3000-\u303F   		请参考: http://www.nengcha.com/code/unicode/class/102/
 * 						大括号 :		\uFF00-\uFF65 中
 * 			输入法切换到英文标点，都在\uFF00-\uFF65 请参考：http://www.nengcha.com/code/unicode/class/145/
 *
 * 		java的内码应该是unicode的，正好和javascript是一样的，所以这个检测规则需要统一一下。
 */
String.prototype.toDBC = function(){
    var dbc = this;
    dbc = dbc.replace(/\u3000/g, ' ');
    dbc = dbc.replace(/[\uFF00-\uFF65]/g, function(code){
        return String.fromCharCode(code.charCodeAt(0) - 65248);
    });
    return dbc;
};

//删除非英文字符串中的全部空格,支持 全半角空格\n\r\t
String.prototype.trimCN = function(){
    var rexp = new RegExp(/[^a-zA-Z0-9 \-]/);
    if (!rexp.test(this)) {
        return this.trim().replace(/\s+/g, " ");
    }
    else {
        return this.replace(/[\s\u3000]+/g, '');
    }
};

//返回字符串的unicode字符长度
String.prototype.byteLength = function(){
	var rexp = /[\u4E00-\u9FA5\uFF00-\uFF65\u3000]/g;
	var str = this.replace(rexp, '00');
	return str.length;
};
//截取字符串的特定长度（计算2个unicode字符为1个汉字的长度）
String.prototype.byteSubstr = function( byteLen, tail){
	if (!byteLen)
		return this;
	if (tail && this.byteLength() > byteLen) {
		byteLen -= 3;
		tail = true;
	}
	else {
		tail = false;
	}
	str = this.substr(0, byteLen);
	_len = str.byteLength();
	while (_len > byteLen) {
		str = str.substr(0, str.length - Math.ceil((_len - byteLen) / 2));
		_len = str.byteLength();
	}
	if (tail)
		str += '...';
	return str;
};

//对字符串中的HTML特殊字符解码
String.prototype.HTMLDecode = function(){
    $("<div id='__decode'></div>").prependTo("body").hide();
    $("#__decode").html(this.toString());
    var t = $("#__decode").text();
    $("#__decode").remove();
    return t;
};
