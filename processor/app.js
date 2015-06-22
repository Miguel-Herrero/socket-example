var io = require('socket.io-client'),
socket = io.connect('https://socket-io-redis-sample-miguel-herrero.c9.io/processor', {
    port: 8080
});

socket.on('welcome', function (data) {
  console.log("Hub socket connected.");
  console.log(data);
});
