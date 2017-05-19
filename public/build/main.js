"use strict";function controller(t){function e(t){return t.touches?[t.touches[0].clientX,t.touches[0].clientY]:[t.clientX,t.clientY]}function n(t){y.isDrawing=!0;var n=e(t),o=_slicedToArray(n,2),i=o[0],r=o[1];y.x1=parseFloat((i-s).toFixed(f)),y.y1=parseFloat((r-l).toFixed(f)),y.x2=parseFloat((i-s).toFixed(f)),y.y2=parseFloat((r-l).toFixed(f))}function o(t){var n=e(t),o=_slicedToArray(n,2),i=o[0],r=o[1];y.x2=parseFloat((i-s).toFixed(f)),y.y2=parseFloat((r-l).toFixed(f))}function i(t){y.isDrawing=!1}function r(e){u=window.innerWidth,d=window.innerHeight,s=.5*(u-t.width),l=0*(d-t.height)}function a(t,e,n,o){c.fillStyle=x,c.beginPath(),c.moveTo(t,e),c.lineTo(n,o),c.closePath(),c.stroke()}var c=t.getContext("2d"),u=window.innerWidth,d=window.innerHeight,s=0,l=0,f=0,h=new Set,v=void 0,y={x1:0,y1:0,x2:0,y2:0,isDrawing:!1,step:function(){this.x1=this.x2,this.y1=this.y2}},w="#ffffff",x="#000000";return function(){t.width=u,t.height=d,console.log(t,u,d),c.lineWidth=8,c.lineCap="round"}(),function(){document.addEventListener("touchstart",n),document.addEventListener("touchmove",o),document.addEventListener("touchend",i),document.addEventListener("mousedown",n),document.addEventListener("mousemove",o),document.addEventListener("mouseup",i),window.addEventListener("resize",debounce(r,100))}(),{line:a,setBackground:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#ffffff";console.log("setBackground"),w=t,c.fillStyle=w,c.fillRect(0,0,u,d),c.fillStyle=t},clearBackground:function(){console.log("clearBackground"),c.clearRect(0,0,u,d)},setRoom:function(t){v=t},draw:function(){if(y.isDrawing){var t=y,e=[t.x1,t.y1,t.x2,t.y2].join(",");h.has(e)||(socket.emit("pushData",v,{x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2}),a(t.x1,t.y1,t.x2,t.y2),h.add(e),t.step())}}}}function start(){var t=document.querySelector(".canvas-wrapper__canvas");if(t.getContext){var e=controller(t);e.setBackground("#ffffff"),socket=io("/");var n=window.location.pathname.slice(-40);e.setRoom(n),socket.emit("init",n),socket.on("linePositionData",function(t){e.line(t.x1,t.y1,t.x2,t.y2)}),socket.on("clear",function(){e.clearBackground(cx2,t)}),MainLoop.setMaxAllowedFPS([60]).setDraw(e.draw).start()}}function avg(t){return t.reduce(function(t,e){return t+e},0)/t.length}function mod(t,e){for(var n=t%e;n<=0;)n+=e;return n}function throttle(t,e){var n=arguments,o=this,i=0;return function(){var r=n,a=o,c=+new Date;c>=i+e&&(i=c,t.apply(a,r))}}function debounce(t,e,n){var o=this,i=arguments,r=void 0;return function(){var a=o,c=i,u=function(){r=null,n||t.apply(a,c)},d=n&&!r;clearTimeout(r),r=setTimeout(u,e),d&&t.apply(a,c)}}var _slicedToArray=function(){function t(t,e){var n=[],o=!0,i=!1,r=void 0;try{for(var a,c=t[Symbol.iterator]();!(o=(a=c.next()).done)&&(n.push(a.value),!e||n.length!==e);o=!0);}catch(t){i=!0,r=t}finally{try{!o&&c.return&&c.return()}finally{if(i)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),io,socket;document.addEventListener("DOMContentLoaded",function(t){start()});
//# sourceMappingURL=main.js.map
