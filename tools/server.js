/**
 * HTTP 静态文件服务器
 */
var http = require("http"), fs = require("fs"), path = require("path"), url = require("url");
var mime = require("./mime").types;
var config = require("./config");
//var zlib = require("zlib");//使用gzip壓縮 TODO

var server = http.createServer(function(request, response){
	
	console.log('=========server=========');
	
    var pathname = url.parse(request.url).pathname;
    var reg = {
		css: '-min.css',
		js: '-min.js'
	}
    var realPath;
    var devpathname;
	var fileName;
	var lastName = {
		css:'.css',
		js :'.js'
	}

    var type = path.extname(pathname);
    type = type ? type.slice(1) : 'unknown';
	if (type == 'html') {
		realPath = path.join(config.Dev.path, type, pathname);
	}else {
		realPath = path.join(config.Dev.path, pathname);
	}
	console.log('config.Dev.open====' + config.Dev.open);
    var folder = config.Dev.folder[type];
	folder = folder ? folder : [];
	console.log('realPath====' + realPath);
	if (folder.length > 0 && realPath.indexOf(folder[0]) > 0) {
	
		console.log('本地文件被请求====' + realPath);
		
		
		console.log('folder[0]==' + folder[0]);
		var basename = path.basename(realPath);
		var dirname = path.dirname(realPath);

		basename = basename.replace(reg[type], lastName[type]);
		dirname = dirname.replace(folder[0], folder[1]);
		realPath = path.join(dirname, basename);
		console.log('realPath==' + realPath);

    }
	
    path.exists(realPath, function(exists){
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            
            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        }
        else {
            fs.readFile(realPath, "binary", function(err, file){
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    
                    response.end(err);
                }
                else {
                
                    var ext = path.extname(realPath);
                    ext = ext ? ext.slice(1) : 'unknown';                    
                    var contentType = mime[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType,
                        'Accept-Charset': 'utf-8'
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});

server.listen(config.Dev.port);
console.log("静态资源服务器已启动，端口" + config.Dev.port);

console.log(config.Dev.open?'当前模式为开发模式':'当前模式为生产模式');