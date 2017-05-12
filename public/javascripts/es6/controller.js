function controller(canvas){
  const ctx = canvas.getContext('2d')
  let width = window.innerWidth,
    height = window.innerHeight

  let bgcolor = '#ffffff',
    color = '#000000'

  (init => {
    canvas.style.width = width
    canvas.style.height = height
    ctx.lineWidth = 10
    ctx.lineCap = 'round'
  })()

  return {
    line(){
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.closePath()
        ctx.stroke()
    },
    setBackground(color='#ffffff'){
      bgcolor = color
      ctx.fillStyle = bgcolor
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = color
    },
    clearBackground(){
      ctx.clearRect(0, 0, width, height)
    }
  }
}
