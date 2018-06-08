
// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {  
	console.log('Client connected...');

	client.on('join', function(data) {
     console.log(data);
  });

  client.on('messages', function(data) {
     client.emit('broad', data);
     client.broadcast.emit('broad',data);
  });

});						

console.info("[ Listening on port ]", 9090);
server.listen(9090);  
