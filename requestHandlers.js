/**
 * 请求处理程序
 */
const {exec} = require('child_process');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

let filename = '';

function start(req, res) {
	console.log('请求处理：start');
	// exec('ls -lah', (error, stdout, stderr) => {
	// 	res.writeHead(404, {'Content-Type': 'text-plain'});
	// 	res.write(stdout);
	// 	res.end();
	// });
	fs.readFile('./upload.html', (error, fileConent) => {
		if (error) return;
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(fileConent);
		res.end();
	});
	
}

function upload(req, res) {
	console.log('请求处理：upload');
	let form = new formidable.IncomingForm();
	form.parse(req, (error, fields, files) => {
		try {
			console.log(files)
			filename = files.upload.name;
			// 跨磁盘分区移动或操作文件会有权限问题：可能导致文件移动失败
			// fs.renameSync(files.upload.path, path.join(__dirname, `/tmp/${filename}`));
			
			// 使用流式操作可以正常使用
			let readStream = fs.createReadStream(files.upload.path);
      let writeStream = fs.createWriteStream(`./tmp/${filename}`);
      readStream.pipe(writeStream);
		} catch(e) {
			console.log(e);
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('received image: <br>');
		res.write('<img src="/show" />')
		res.end();
	});
}

function show(req, res) {
	console.log('请求处理：show');
	fs.readFile(`./tmp/${filename}`, 'binary', (error, fileConent) => {
		if (error) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.write(error + '\n');
			res.end();
		} else {
			res.writeHead(200, {'Content-Type': 'image/png'});
			res.write(fileConent, 'binary');
			res.end();
		}
	});
}

module.exports = {
	start,
	upload,
	show
};