"use strict";

// var msgpack = require("msgpack-lite");
//
// // encode from JS Object to MessagePack (Buffer)
// var buffer = msgpack.encode({"foo": "bar"});
//
// // decode from MessagePack (Buffer) to JS Object
// var data = msgpack.decode(buffer); // => {"foo": "bar"}
var path = require('path')

function clean(id){
  return (id.slice(id.indexOf("#")+1)).toString()
}

module.exports = {
  networking: function(io, namespace) {

    var nsp = io.of(namespace)

    nsp.on('connection', function(socket) {

      socket.on('init', function(room){
        socket.join(room)
      })

      socket.on('clientDataPush', function(room, data){
        console.log('clientDataPush', clean(socket.id), room)
        socket.to(room).volatile.emit('linePositionData', data)
        // nsp.to(room).volatile.emit('linePositionData', 'temporary data')
      })

      //splices socket out of client socket list
      socket.on('disconnect', function() {
        console.log('someone left')
      })
    })
  }
}
