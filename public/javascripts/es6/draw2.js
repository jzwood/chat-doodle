var io, socket

let room, x = 0, y = 0, epsilon = 0.01
const bgcolor = 256

function init(){
  const canvas = document.querySelector('.canvas-wrapper__canvas')
  if (canvas.getContext) {
    const controller = controller(canvas)
    controller.setBackground('#ffffff')

    const isPrivate = location.href.indexOf('/private')
    socket = isPrivate > 0 ? io('/private') : io('/public')
    room = window.location.pathname.slice(-40)

    socket.emit('init', room)

    socket.on('linePositionData', data => {
      controller.line(data.x, data.y, data.x2, data.y2)
    })

    socket.on('clear', () => {
      controller.clearBackground(cx2, canvas)
    })

  }




  if (canvas.getContext) {



    const isPrivate = location.href.indexOf('/private')
    socket = isPrivate > 0 ? io('/private') : io('/public')
    room = window.location.pathname.slice(-40)

    setBackgroundColor(cx2, canvas, '#000000')

    socket.emit('init', room)

    socket.on('linePositionData', data => {
      line(data.x, data.y, data.x2, data.y2)
    })

    socket.on('clear', () => {
      clearBackground(cx2, canvas)
    })
  }

}

function draw(){
  if(p.keyCode === 114){
    p.background(bgcolor)
    socket.emit('clear', room)
  }
  if(p.touchIsDown || p.mouseIsPressed){
    const [x2, y2] = p.touchIsDown ? [p.touchX, p.touchY] : [p.mouseX, p.mouseY]
    if(x > 0 && y > 0){
      p.line(x, y, x2, y2)
      socket.emit('pushData', room, {x, y, x2, y2})
    }
    x = x2
    y = y2
  }else{
    x = 0
    y = 0
  }
}
