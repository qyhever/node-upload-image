/**
 * 服务器模块
 */
const http = require('http');
const url = require('url');

exports.start = (route, handle) => {
	http.createServer((req, res) => {
		let pathname = url.parse(req.url).pathname;

		route(handle, pathname, req, res);

	}).listen('3000', () => {
		console.log('running...');
	});
};