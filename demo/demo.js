(()=>{"use strict";var t,i={591:(t,i,o)=>{var s=o(984),r=o(146);class e extends r.v{constructor(t=0,i=0,o=0,r=1){super(),this.from=new c,this.to=new c,this.startTime=0,this.duration=0,this.easing=s.oY.Linear.None,this.onTick=t=>{this.onComplete(t)||this.updateColor(t)},this.color=new c(t,i,o,r)}change(t,i,o,s,r,a){const h=e.initOption(a);this.color.equalRGBA(t,i,o,s)||(u.ticker.removeListener("raf",this.onTick),this.initFromAndTo(t,i,o,s),this.startTime=h.startTime??performance.now(),this.duration=r,this.easing=h.easing,u.ticker.on("raf",this.onTick))}initFromAndTo(t,i,o,s){this.to.setRGBA(t,i,o,s),this.from.set(this.color)}updateColor(t){const i=this.easing((t-this.startTime)/this.duration);this.color.mix(this.from,this.to,i),this.emit("onUpdate",this)}onComplete(t){return t>this.startTime+this.duration&&(this.color.set(this.to),u.ticker.removeListener("raf",this.onTick),this.emit("onUpdate",this),this.emit("onComplete",this),!0)}static initOption(t){return t??={},t.easing??=s.oY.Linear.None,t}getAttribute(){return[this.color.r/255,this.color.g/255,this.color.b/255,this.color.alpha]}getCSSStyle(){return`rgba(${Math.round(this.color.r)},${Math.round(this.color.g)},${Math.round(this.color.b)},${this.color.alpha})`}getCSSColor(){return`rgb(${Math.round(this.color.r)},${Math.round(this.color.g)},${Math.round(this.color.b)})`}getAlpha(){return this.color.alpha.toString()}clone(){return new e(this.color.r,this.color.g,this.color.b,this.color.alpha)}}class a extends e{constructor(){super(...arguments),this.fromHSL=new l,this.toHSL=new l}initFromAndTo(t,i,o,s){super.initFromAndTo(t,i,o,s),this.fromHSL.set(this.color),this.toHSL.setRGBA(t,i,o,s)}updateColor(t){const i=this.easing((t-this.startTime)/this.duration);this.color.mixHSL(this.fromHSL,this.toHSL,i),this.emit("onUpdate",this)}}var h,n=o(630);class l{constructor(t=0,i=0,o=0,s=1){this.h=t,this.s=i,this.l=o,this.alpha=s}toRGB(){const t=this.toColor();return new c(t.red(),t.green(),t.blue(),t.alpha())}toColor(){return n.Z.hsl({h:this.h,l:this.l,s:this.s,alpha:this.alpha})}set(t){const i=n.Z.rgb(t);this.h=i.hue(),this.l=i.lightness(),this.s=i.saturationl(),this.alpha=i.alpha()}setRGBA(t,i,o,s){const r=n.Z.rgb({r:t,g:i,b:o,alpha:s});this.h=r.hue(),this.l=r.lightness(),this.s=r.saturationl(),this.alpha=r.alpha()}}class c{constructor(t=0,i=0,o=0,s=1){this.r=t,this.g=i,this.b=o,this.alpha=s}static fromColor(t){return new c(t.red(),t.green(),t.blue(),t.alpha())}set(t){this.r=t.r,this.g=t.g,this.b=t.b,this.alpha=t.alpha}setRGBA(t,i,o,s){this.r=t,this.g=i,this.b=o,this.alpha=s}equalRGBA(t,i,o,s){return this.r==t&&this.g==i&&this.b==o&&this.alpha==s}mix(t,i,o){const s=1-o;this.r=i.r*o+t.r*s,this.g=i.g*o+t.g*s,this.b=i.b*o+t.b*s,this.alpha=i.alpha*o+t.alpha*s}mixHSL(t,i,o){const s=1-o,r=new l;r.h=i.h*o+t.h*s,r.s=i.s*o+t.s*s,r.l=i.l*o+t.l*s,r.alpha=i.alpha*o+t.alpha*s,this.set(r.toRGB())}}class u{static get rafID(){return this._rafID}static start(t){this._rafID||this.rafCallback(t??performance.now())}static stop(){this._rafID&&(cancelAnimationFrame(this._rafID),this._rafID=void 0)}static update(t){this.ticker.emit("raf",t)}}h=u,u.ticker=new r.Z,u.rafCallback=t=>{h.update(t),h._rafID=requestAnimationFrame(h.rafCallback)};var p=function(){function t(){u.start();var i=new e,o=t.getRect(i,0,0);document.body.appendChild(o),t.animateColor(i,o);var s=new a,r=t.getRect(s,0,160);document.body.appendChild(r),t.animateColor(s,r)}return t.getRect=function(t,i,o){var s=document.createElement("div");return s.style.width="100px",s.style.height="100px",s.style.top=i+"px",s.style.left=o+"px",s.style.position="absolute",s.style.backgroundColor=t.getCSSColor(),s.style.opacity=t.getAlpha(),s},t.animateColor=function(t,i){t.on("onUpdate",(function(t){i.style.backgroundColor=t.getCSSColor(),i.style.opacity=t.getAlpha()})),t.change(255,16,16,1,8e3,{easing:s.oY.Cubic.Out}),setTimeout((function(){t.change(0,255,255,1,6e3,{easing:s.oY.Cubic.Out})}),1e4)},t}();window.onload=function(){new p}}},o={};function s(t){var r=o[t];if(void 0!==r)return r.exports;var e=o[t]={exports:{}};return i[t](e,e.exports,s),e.exports}s.m=i,t=[],s.O=(i,o,r,e)=>{if(!o){var a=1/0;for(c=0;c<t.length;c++){for(var[o,r,e]=t[c],h=!0,n=0;n<o.length;n++)(!1&e||a>=e)&&Object.keys(s.O).every((t=>s.O[t](o[n])))?o.splice(n--,1):(h=!1,e<a&&(a=e));if(h){t.splice(c--,1);var l=r();void 0!==l&&(i=l)}}return i}e=e||0;for(var c=t.length;c>0&&t[c-1][2]>e;c--)t[c]=t[c-1];t[c]=[o,r,e]},s.d=(t,i)=>{for(var o in i)s.o(i,o)&&!s.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:i[o]})},s.o=(t,i)=>Object.prototype.hasOwnProperty.call(t,i),(()=>{var t={577:0};s.O.j=i=>0===t[i];var i=(i,o)=>{var r,e,[a,h,n]=o,l=0;if(a.some((i=>0!==t[i]))){for(r in h)s.o(h,r)&&(s.m[r]=h[r]);if(n)var c=n(s)}for(i&&i(o);l<a.length;l++)e=a[l],s.o(t,e)&&t[e]&&t[e][0](),t[e]=0;return s.O(c)},o=self.webpackChunk_masatomakino_tweenable_color=self.webpackChunk_masatomakino_tweenable_color||[];o.forEach(i.bind(null,0)),o.push=i.bind(null,o.push.bind(o))})();var r=s.O(void 0,[736],(()=>s(591)));r=s.O(r)})();