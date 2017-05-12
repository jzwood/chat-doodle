var io, socket

let p5App = new window.p5(p => {

  let room, x = 0, y = 0, epsilon = 0.01
  const bgcolor = 256

  //p5 calls setup automatically (once)
  p.setup = () => {
    //inserts canvas in DOM
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight)
    canvas.parent('wrapper__canvas')
    canvas.class('wrapper__canvas__p5')

    p.strokeWeight(10)

    const isPrivate = location.href.indexOf('/private')
    socket = isPrivate > 0 ? io('/private') : io('/public')
    room = window.location.pathname.slice(-40)

    socket.emit('init', room)

    socket.on('linePositionData', data => {
      p.line(data.x, data.y, data.tx, data.ty)
    })

    socket.on('clear', () => {
      p.background(bgcolor)
    })
  }

  // p5 calls draw (animation loop) automatically
  p.draw = () => {
    if(p.keyCode === 114){
      p.background(bgcolor)
      socket.emit('clear', room)
    }
    if(p.touchIsDown || p.mouseIsPressed){
      const [tx, ty] = p.touchIsDown ? [p.touchX, p.touchY] : [p.mouseX, p.mouseY]
      if(x > 0 && y > 0){
        p.line(x, y, tx, ty)
        socket.emit('pushData', room, {x, y, tx, ty})
      }
      x = tx
      y = ty
    }else{
      x = 0
      y = 0
    }
  }
})
