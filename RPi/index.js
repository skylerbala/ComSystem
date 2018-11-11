var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('New Connection: ' + socket.id);

  socket.on('messages', function(staffName, message) {
    console.log('New Message: ' + staffName + message)
    socket.broadcast.emit('messages', staffName, message);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
  
});