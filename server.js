global.__base = __dirname + '/';
var app = require('./app');
app.listen(3000, function(){
	console.log('listening on *:3000');
});