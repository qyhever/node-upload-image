/**
 * 路由模块
 */
exports.route = (handle, pathname, req, res) => {
	console.log('访问了: ' + pathname);
	if (typeof handle[pathname] === 'function') { // 可以匹配到请求路径
		handle[pathname](req, res);
		
	} else {	// 找不到请求路径，处理错误
		console.log('No request handler found for: ' + pathname);
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.write('404 Not Found');
		res.end();
	}
};