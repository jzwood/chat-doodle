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

      socket.on('pushData', function(room, data){
        socket.to(room).volatile.emit('linePositionData', data)
      })

      socket.on('clear', function(room) {
        socket.to(room).volatile.emit('clear')
      })

      //splices socket out of client socket list
      socket.on('disconnect', function() {
        console.log('someone left')
      })
    })
  }
}
