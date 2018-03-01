/**
 * 入口文件
 */
const server = require('./server');
const router = require('./route');
const requestHandlers = require('./requestHandlers');

// 请求处理程序的集合	url: 请求处理程序
let handle = {
	'/': requestHandlers.start,
	'/start': requestHandlers.start,
	'/upload': requestHandlers.upload,
	'/show': requestHandlers.show
};

server.start(router.route, handle);