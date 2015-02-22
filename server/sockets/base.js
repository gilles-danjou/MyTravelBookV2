module.exports = function (io) {
  'use strict';

    io.set('log level', 1); // reduce logging

    io.on('connection', function (socket) {
    socket.broadcast.emit('user connected');

    socket.on('message', function (from, msg) {

      //console.log('recieved message from', from, 'msg', JSON.stringify(msg));
      //console.log('broadcasting message');
      //console.log('payload is', msg);
      io.sockets.emit('broadcast', {
        message: msg,
        source: from
      });
      //console.log('broadcast complete');
    });
  });
};

