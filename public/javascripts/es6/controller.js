function controller(canvas){
  const ctx = canvas.getContext('2d')
  let width = window.innerWidth, height = window.innerHeight,
    xOffset = 0, yOffset = 0,
    epsilon = 0.01

  const drawState = {x1:0, y1:0, x2: 0, y2: 0, isDrawing: false, step(){
    this.x1 = this.x2
    this.y1 = this.y2
  }}

  let bgcolor = '#ffffff',
    color = '#000000'

  initCanvas()
  registerTouchEvents()


  function initCanvas(){
    canvas.width = width
    canvas.height = height

    console.log(canvas, width, height)
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
  }

  function handleFingerDown(e){
    drawState.isDrawing = true
    let [x, y] = [e.touches[0].clientX, e.touches[0].clientY]
    drawState.x1 = x - xOffset
    drawState.y1 = y - yOffset
    drawState.x2 = x - xOffset
    drawState.y2 = y - yOffset
  }

  function handleFingerDrag(e){
      drawState.x2 = e.touches[0].clientX - xOffset
      drawState.y2 = e.touches[0].clientY - yOffset
  }

  function handleFingerUp(e){
    drawState.isDrawing = false
  }

  function handleResize(e){
    width = window.innerWidth
    height = window.innerHeight
    xOffset = (width - canvas.width) * 0.5
    yOffset = (height - canvas.height) * 0
  }

  function registerTouchEvents(){
    document.addEventListener('touchstart', handleFingerDown)
    document.addEventListener('touchmove', handleFingerDrag)
    document.addEventListener('touchend', handleFingerUp)
    window.addEventListener('resize', debounce(handleResize, 100))
  }

  function line(x1, y1, x2, y2){
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.closePath()
      ctx.stroke()
  }

  return {
    line,
    setBackground(color='#ffffff'){
      console.log('setBackground')
      bgcolor = color
      ctx.fillStyle = bgcolor
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = color
    },
    clearBackground(){
      console.log('clearBackground')
      ctx.clearRect(0, 0, width, height)
    },
    draw(){
      if(drawState.isDrawing){
        const ds = drawState
        console.log(ds.x1, ds.y1, ds.x2, ds.y2)
        line(ds.x1, ds.y1, ds.x2, ds.y2)
        ds.step()
      }
    }
  }
}
/*
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
*/
