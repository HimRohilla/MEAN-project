module.exports = {
	sendResponse: function(res, json) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(JSON.stringify(json));
		res.end();
	}
}