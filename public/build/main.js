"use strict";function newController(e,n){var t=newUser(),o=newAnimator(e,n);return{onEnter:function(e,n,o){13===o&&(t.readInput(),e.emit("clientDataPush",n,t.getRule()))},setSize:function(e){o.setSize(e)},update:function(e){o.setState(e)},animate:function(){o.draw()}}}function newAnimator(e,n){var t=[],o=["#000000","#ff00ff","#00ffff","#00ff00","#ffff00","#ff0000"],i=0,r=0;return{draw:function(){for(var e=0,a=t.length;e<a;e++)n.fill(o[t[e]]),n.rect(r*(e%i),r*~~(e/i),r,r)},setSize:function(n){e=n,r=e/i},setState:function(n){t=n.slice(0),i=Math.sqrt(t.length),r=e/i}}}function newUser(){function e(e){var n=e.split("/").map(function(e){return e.trim()}).join("/");return n}var n=[],t=document.querySelector(".wrapper__terminal");return{readInput:function(){n.push(e(t.value))},getRule:function(){var e=n.slice(-1).toString();return e.length?e:"/"}}}function app(e){function n(){var n=location.href.indexOf("/private");socket=io(n>0?"/private":"/public");var r=window.location.pathname.slice(-40);e.noStroke(),e.stroke("#111111"),e.strokeWeight(1),e.strokeCap(e.SQUARE),e.windowResized=function(){e.windowWidth<t+2*i?(o.setSize(e.windowWidth-i),e.resizeCanvas(e.windowWidth-i,e.windowWidth-i)):(o.setSize(t),e.resizeCanvas(t+1,t+1))},socket.emit("init",r),socket.on("updateBoard",function(e){o.update(e)}),socket.on("removeInputfield",function(e){document.querySelector(".wrapper__terminal").remove(),document.querySelector(".warning").textContent=e}),addKeyPressListener(socket,r,o.onEnter)}var t=500,o=newController(t,e),i=20;e.setup=function(){var r=e.windowWidth<t+2*i?(o.setSize(e.windowWidth-i),e.createCanvas(e.windowWidth-i,e.windowWidth-i)):(o.setSize(t),e.createCanvas(t+1,t+1));r.parent("wrapper__canvas"),r.class("wrapper__canvas__p5"),console.log("waiting for network connection");var a=window.setInterval(function(){console.count("connection attempts"),io&&(console.log("network connected"),n(),window.clearInterval(a))},100)},e.draw=function(){e.background("#000"),o.animate()}}function addKeyPressListener(e,n,t){var o=500;document.addEventListener("keydown",function(i){throttle(t(e,n,i.keyCode),o)},!1)}function throttle(e,n){var t=0;return function(){var o=arguments,i=this,r=+new Date;r>=t+n&&(t=r,e.apply(i,o))}}var io,socket,p5App=new window.p5(app);