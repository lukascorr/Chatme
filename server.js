var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(8888,function(){
    console.log('****** Server started ******');
	console.log('Open http://localhost:8888');});

app.use(express.static(__dirname + '/'));

var visitas = 0;
io.sockets.on('connection', function(socket){
	
	visitas++;
	socket.emit('vtas', visitas);
	socket.broadcast.emit('vtas', visitas);

	socket.on('send message', function(data){
	io.sockets.emit('new message', data);
	});

	socket.on('disconnect', function(){
     	visitas--;
     	socket.broadcast.emit('vtas', visitas);
 	});
});
	
