var io, socket

var room

function setup() {
  createCanvas(displayWidth, displayHeight)
  strokeWeight(10)

  const isPrivate = location.href.indexOf('/private')
  socket = isPrivate > 0 ? io('/private') : io('/public')
  //hopefully alerts the server which room socket should join
  room = window.location.pathname.slice(-40)

  socket.emit('init', room)//tell server you've connected to room

  socket.on('linePositionData', data => {
    line(data.x, data.y, data.touchX, data.touchY)
    console.log('drawing a line')
  })

}

var x = 0,
    y = 0

var epsilon = 0.01

function draw() {
  if(keyCode === 114){
    background(256)
  }
  if(touchIsDown){
    if(x > 0 && y > 0){
      line(x, y, touchX, touchY)
      socket.emit('clientDataPush', room, {x:touchX, y:touchY, touchX, touchY})
    }
    x = touchX
    y = touchY
  }else{
    x = 0
    y = 0
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  strokeWeight(10)
}
