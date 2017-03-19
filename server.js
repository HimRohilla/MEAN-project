global.__base = __dirname + '/';
var app = require('./app');
app.listen(27017, function(){
	console.log('listening on *:3000');
});
