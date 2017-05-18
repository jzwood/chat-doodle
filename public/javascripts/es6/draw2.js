'use strict'
var io, socket

document.addEventListener("DOMContentLoaded", e => {
  start()
})

function start(){
  const canvas = document.querySelector('.canvas-wrapper__canvas')
  if (canvas.getContext) {
    const ctrl = controller(canvas)
    ctrl.setBackground('#ffffff')

    socket = io('/')
    let room = window.location.pathname.slice(-40)

    ctrl.setRoom(room)

    socket.emit('init', room)

    socket.on('linePositionData', data => {
      ctrl.line(data.x1, data.y1, data.x2, data.y2)
    })

    socket.on('clear', () => {
      ctrl.clearBackground(cx2, canvas)
    })

    MainLoop.setMaxAllowedFPS([60]).setDraw(ctrl.draw).start()
  }

}
