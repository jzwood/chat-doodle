function avg(vals) {
  return vals.reduce(function(a, b) {
    return a + b
  }, 0) / vals.length
}

//mod is used for wrapping the diamond coordinates
//around the grid. The algorithm below returns the
//positive mod value.
function mod(val, base) {
  var temp = val % base
  while (temp <= 0) {
    temp += base
  }
  return temp
}

function throttle(func, ms){
  let last = 0
  return () => {
    const a = arguments, t = this, now = +(new Date)
    //b/c last = 0 will still run the first time called
    if(now >= last + ms){
      last = now
      func.apply(t, a)
    }
  }
}

function debounce(func, wait, immediate) {
  let timeout
  return () => {
    const context = this, args = arguments
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
