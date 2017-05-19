function controller(canvas){
  const ctx = canvas.getContext('2d')
  let width = window.innerWidth, height = window.innerHeight,
    xOffset = 0, yOffset = 0,
    epsilon = 0.01, decimalLimit = 0
  const lineSet = new Set()

  let room

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
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
  }

  function eventToXY(event){
    return event.touches ? [event.touches[0].clientX, event.touches[0].clientY] : [event.clientX, event.clientY]
  }

  function handleDrawStart(e){
    drawState.isDrawing = true
    const [x, y] = eventToXY(e)
    drawState.x1 = parseFloat((x - xOffset).toFixed(decimalLimit))
    drawState.y1 = parseFloat((y - yOffset).toFixed(decimalLimit))
    drawState.x2 = parseFloat((x - xOffset).toFixed(decimalLimit))
    drawState.y2 = parseFloat((y - yOffset).toFixed(decimalLimit))
  }

  function handleDrawMove(e){
    const [x, y] = eventToXY(e)
    drawState.x2 = parseFloat((x - xOffset).toFixed(decimalLimit))
    drawState.y2 = parseFloat((y - yOffset).toFixed(decimalLimit))
  }

  function handleDrawStop(e){
    drawState.isDrawing = false
  }

  function handleResize(e){
    width = window.innerWidth
    height = window.innerHeight
    xOffset = (width - canvas.width) * 0.5
    yOffset = (height - canvas.height) * 0
  }

  function registerTouchEvents(){
    document.addEventListener('touchstart', handleDrawStart)
    document.addEventListener('touchmove', handleDrawMove)
    document.addEventListener('touchend', handleDrawStop)
    document.addEventListener('mousedown', handleDrawStart)
    document.addEventListener('mousemove', handleDrawMove)
    document.addEventListener('mouseup', handleDrawStop)
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
    setRoom(r){
      room = r
    },
    draw(){
      if(drawState.isDrawing){
        const ds = drawState,
          setKey = [ds.x1, ds.y1, ds.x2, ds.y2].join(',')
        if(!lineSet.has(setKey)){
          socket.emit('pushData', room, {x1:ds.x1, y1:ds.y1, x2:ds.x2, y2:ds.y2})
          line(ds.x1, ds.y1, ds.x2, ds.y2)
          lineSet.add(setKey)
          ds.step()
        }
      }
    }
  }
}
