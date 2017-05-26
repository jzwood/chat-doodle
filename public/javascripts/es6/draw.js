'use strict'
var io, socket

document.addEventListener("DOMContentLoaded", e => {
  start()
})

function resetNav(){
  const nav = document.querySelector('.nav')
  // nav.style.width = canvas.width + 'px'
  nav.style.height = Math.min(50, ~~(window.innerWidth / nav.childElementCount)) + 'px'
}

function start(){
  const canvas = document.querySelector('.canvas-wrapper__canvas')
  if (canvas.getContext) {
    const ctrl = controller(canvas)
    ctrl.setBackground('#ffffff')

    resetNav()

    socket = io('/')
    let room = window.location.pathname.slice(-40)

    ctrl.setRoom(room)

    socket.emit('init', room)

    socket.on('linePositionData', data => {
      ctrl.line(data.x1, data.y1, data.x2, data.y2)
    })

    socket.on('clear', ctrl.clearBackground)

    MainLoop.setMaxAllowedFPS([60]).setDraw(ctrl.draw).start()
  }

}
