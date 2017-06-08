function controller(canvas){
  const ctx = canvas.getContext('2d')
  let width = window.innerWidth, height = window.innerHeight,
    epsilon = 0.01, decimalLimit = 0
  let lineMap = [], copyModal = getShareModal(), aboutModal = getAboutModal()

  let disableDrawing = false
  copyModal.onShow(() => {
    disableDrawing = true
  })

  aboutModal.onShow(() => {
    disableDrawing = true
  })

  copyModal.onHide(() => {
    window.setTimeout(() => {
      disableDrawing = false
    }, 200)
  })

  aboutModal.onHide(() => {
    window.setTimeout(() => {
      disableDrawing = false
    }, 200)
  })

  let room

  const drawState = {x1:0, y1:0, x2: 0, y2: 0, isDrawing: false, isErasing: false, step(){
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
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
  }

  function eventToXY(event){
    return event.touches ? [event.touches[0].clientX, event.touches[0].clientY] : [event.clientX, event.clientY]
  }

  function handleDrawStart(e){
    drawState.isDrawing = true
    const [x, y] = eventToXY(e)
    drawState.x1 = parseFloat((x).toFixed(decimalLimit))
    drawState.y1 = parseFloat((y).toFixed(decimalLimit))
    drawState.x2 = parseFloat((x).toFixed(decimalLimit))
    drawState.y2 = parseFloat((y).toFixed(decimalLimit))
  }

  function handleDrawMove(e){
    e.preventDefault()
    const [x, y] = eventToXY(e)
    drawState.x2 = parseFloat((x).toFixed(decimalLimit))
    drawState.y2 = parseFloat((y).toFixed(decimalLimit))
  }

  function handleDrawStop(e){
    drawState.isDrawing = false
  }

  function handleResize(e){
    width = window.innerWidth
    height = window.innerHeight
    initCanvas()
    lineMap.forEach(points => {
      line(...points.split(',').map(i => parseInt(i)))
    })
  }

  function clickRefresh(){
    clearBackground()
    socket.emit('clear', room)
  }

  function clickUndo(){
    ctx.clearRect(0, 0, width, height)
    lineMap = lineMap.slice(0,-2).map(points => {
      line(...points.split(',').map(i => parseInt(i)))
      return points
    })
  }

  function clickShare(){
    copyModal.show()
  }

  function clickAbout(){
    aboutModal.show()
  }

  function registerTouchEvents(){
    document.addEventListener('touchstart', handleDrawStart)
    document.addEventListener('touchmove', handleDrawMove)
    document.addEventListener('touchend', handleDrawStop)
    document.addEventListener('mousedown', handleDrawStart)
    document.addEventListener('mousemove', handleDrawMove)
    document.addEventListener('mouseup', handleDrawStop)
    window.addEventListener('resize', debounce(handleResize, 100))

    const refresh = document.querySelector('.btn__refresh')
    refresh.addEventListener('touchend', clickRefresh)
    refresh.addEventListener('mouseup', clickRefresh)

    const undo = document.querySelector('.btn__erase')
    undo.addEventListener('touchend', clickUndo)
    undo.addEventListener('mouseup', clickUndo)

    const share = document.querySelector('.btn__share')
    share.addEventListener('touchend', clickShare)
    share.addEventListener('mouseup', clickShare)

    const about = document.querySelector('.btn__about')
    about.addEventListener('touchend', clickAbout)
    about.addEventListener('mouseup', clickAbout)
  }

  function line(x1, y1, x2, y2){
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
  }

  function clearBackground(){
    ctx.clearRect(0, 0, width, height)
    lineMap.length = 0
  }

  return {
    line,
    clearBackground,
    setRoom(r){
      room = r
    },
    setBackground(color='#ffffff'){
      bgcolor = color
      ctx.fillStyle = bgcolor
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = color
    },
    draw(){
      if(drawState.isDrawing && !disableDrawing){
        const ds = drawState,
          setKey = [ds.x1, ds.y1, ds.x2, ds.y2].join(',')
        if(lineMap.slice(-1)[0] !== setKey){
          socket.emit('pushData', room, {x1:ds.x1, y1:ds.y1, x2:ds.x2, y2:ds.y2})
          line(ds.x1, ds.y1, ds.x2, ds.y2)
          lineMap.push(setKey)
          ds.step()
        }
      }
    }
  }
}
