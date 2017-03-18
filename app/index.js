var mongoose = require('mongoose');
var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
var constants = require(__base + "app/utility/constants");

var mongoDB = constants.mongo_db_url;
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error);

app.use('/', router);

fs.readdirSync('./app/controllers').forEach(function (file) {
	if(file.substr(-3) == '.js') {
		str = "/" + file.substr(0, file.length - 3) + "/";
		app.use(str, require(__base + 'app/controllers/' + file));
	}
});

router.get('/public/*', function(req, res) {
	res.sendFile(path.join(__dirname + '../..' + req.originalUrl));
});

router.get('/app/views/*', function(req, res) {
	res.sendFile(path.join(__dirname + '../..' + req.originalUrl));
});

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/index.html'));
});

module.exports = app;