/**
 * 配置模块
 */

var path = require("path");

//文件过期的设置
exports.Expires = {
    fileMatch: /^(gif|png|jpg|js|css)$/ig,
    maxAge: 60 * 60 * 24 * 365
};
//压缩的文件类型
exports.Compress = {
    match: /css|js|html/ig
};

//开发环境的設置
exports.Dev = {
    open: true,//是否开启开发模式 false true
    port:8888,
	path: path.join(__filename, '..', '..'),//静态分支本地路径 'D:\\wwwroot\\workspace\\20111128_100133_huanyan-2.7_1'
	folder:{
		js : ['\\min','\\view', ".."],//开发环境的静态资源服务器路径重写配置 [源路径，目标路径, 如何从源路径访问到目标路径]，也即[压缩后文件路径，待压缩文件路径]
		css:['\\min','','']
	},
	file:{//要压缩的文件列表  TODO 1.处理多个文件 2.如果长度为0，则待压缩的目录下的所有文件都将被压缩
		js:['estimatePrice.js'],//estimatePrice.js index.js
		css:['alp.css']
	}
};
