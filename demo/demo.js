(()=>{"use strict";var __webpack_modules__={671:(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{eval('\n// UNUSED EXPORTS: Demo\n\n// EXTERNAL MODULE: ./node_modules/@tweenjs/tween.js/dist/tween.esm.js\nvar tween_esm = __webpack_require__(471);\n// EXTERNAL MODULE: ./node_modules/eventemitter3/index.js\nvar eventemitter3 = __webpack_require__(34);\nvar eventemitter3_default = /*#__PURE__*/__webpack_require__.n(eventemitter3);\n;// CONCATENATED MODULE: ./esm/TweenableColorTicker.js\nvar _a;\n\nclass TweenableColorTicker {\n  static get rafID() {\n    return this._rafID;\n  }\n  static start(now) {\n    if (!this._rafID) {\n      this.rafCallback(now ?? performance.now());\n    }\n  }\n  static stop() {\n    if (this._rafID) {\n      cancelAnimationFrame(this._rafID);\n      this._rafID = undefined;\n    }\n  }\n  static update(ms) {\n    this.ticker.emit("raf", ms);\n  }\n}\n_a = TweenableColorTicker;\nTweenableColorTicker.ticker = new (eventemitter3_default())();\nTweenableColorTicker.rafCallback = ms => {\n  _a.update(ms);\n  _a._rafID = requestAnimationFrame(_a.rafCallback);\n};\n// EXTERNAL MODULE: ./node_modules/color/index.js\nvar node_modules_color = __webpack_require__(772);\nvar color_default = /*#__PURE__*/__webpack_require__.n(node_modules_color);\n;// CONCATENATED MODULE: ./esm/color/HSLColor.js\n\n\nclass HSLColor {\n  constructor(h = 0, s = 0, l = 0, alpha = 1.0) {\n    this.h = h;\n    this.s = s;\n    this.l = l;\n    this.alpha = alpha;\n  }\n  toRGB() {\n    const hslObj = this.toColor();\n    return new RGBColor(hslObj.red(), hslObj.green(), hslObj.blue(), hslObj.alpha());\n  }\n  toColor() {\n    return color_default().hsl({\n      h: this.h,\n      l: this.l,\n      s: this.s,\n      alpha: this.alpha\n    });\n  }\n  set(rgbObj) {\n    const color = color_default().rgb(rgbObj);\n    this.h = color.hue();\n    this.l = color.lightness();\n    this.s = color.saturationl();\n    this.alpha = color.alpha();\n  }\n  setRGBA(r, g, b, alpha) {\n    const color = color_default().rgb({\n      r,\n      g,\n      b,\n      alpha\n    });\n    this.h = color.hue();\n    this.l = color.lightness();\n    this.s = color.saturationl();\n    this.alpha = color.alpha();\n  }\n}\n;// CONCATENATED MODULE: ./esm/color/RGBColor.js\n\nclass RGBColor {\n  constructor(r = 0, g = 0, b = 0, alpha = 1.0) {\n    this.r = r;\n    this.g = g;\n    this.b = b;\n    this.alpha = alpha;\n  }\n  static fromColor(color) {\n    return new RGBColor(color.red(), color.green(), color.blue(), color.alpha());\n  }\n  set(rgba) {\n    this.r = rgba.r;\n    this.g = rgba.g;\n    this.b = rgba.b;\n    this.alpha = rgba.alpha;\n  }\n  setRGBA(r, g, b, alpha) {\n    this.r = r;\n    this.g = g;\n    this.b = b;\n    this.alpha = alpha;\n  }\n  equalRGBA(r, g, b, alpha) {\n    return this.r == r && this.g == g && this.b == b && this.alpha == alpha;\n  }\n  mix(from, to, t) {\n    const rt = 1 - t;\n    this.r = to.r * t + from.r * rt;\n    this.g = to.g * t + from.g * rt;\n    this.b = to.b * t + from.b * rt;\n    this.alpha = to.alpha * t + from.alpha * rt;\n  }\n  mixHSL(from, to, t) {\n    const rt = 1 - t;\n    const hsl = new HSLColor();\n    hsl.h = to.h * t + from.h * rt;\n    hsl.s = to.s * t + from.s * rt;\n    hsl.l = to.l * t + from.l * rt;\n    hsl.alpha = to.alpha * t + from.alpha * rt;\n    this.set(hsl.toRGB());\n  }\n}\n;// CONCATENATED MODULE: ./esm/TweenableColor.js\n\n\n\n\nclass TweenableColor extends eventemitter3.EventEmitter {\n  constructor(r = 0, g = 0, b = 0, alpha = 1.0) {\n    super();\n    this.from = new RGBColor();\n    this.to = new RGBColor();\n    this.startTime = 0;\n    this.duration = 0;\n    this.easing = tween_esm/* Easing.Linear.None */.oY.Linear.None;\n    this.onTick = ms => {\n      const isComplete = this.onComplete(ms);\n      if (isComplete) return;\n      this.updateColor(ms);\n    };\n    this.color = new RGBColor(r, g, b, alpha);\n  }\n  change(toR, toG, toB, toAlpha, duration, option) {\n    const changeOption = TweenableColor.initOption(option);\n    if (this.color.equalRGBA(toR, toG, toB, toAlpha)) return;\n    TweenableColorTicker.ticker.removeListener("raf", this.onTick);\n    this.initFromAndTo(toR, toG, toB, toAlpha);\n    this.startTime = changeOption.startTime ?? performance.now();\n    this.duration = duration;\n    this.easing = changeOption.easing;\n    TweenableColorTicker.ticker.on("raf", this.onTick);\n  }\n  initFromAndTo(toR, toG, toB, toAlpha) {\n    this.to.setRGBA(toR, toG, toB, toAlpha);\n    this.from.set(this.color);\n  }\n  updateColor(ms) {\n    const t = this.easing((ms - this.startTime) / this.duration);\n    this.color.mix(this.from, this.to, t);\n    this.emit("onUpdate", this);\n  }\n  onComplete(ms) {\n    if (ms > this.startTime + this.duration) {\n      this.color.set(this.to);\n      TweenableColorTicker.ticker.removeListener("raf", this.onTick);\n      this.emit("onUpdate", this);\n      this.emit("onComplete", this);\n      return true;\n    }\n    return false;\n  }\n  static initOption(option) {\n    option ??= {};\n    option.easing ??= tween_esm/* Easing.Linear.None */.oY.Linear.None;\n    return option;\n  }\n  getAttribute() {\n    return [this.color.r / 255, this.color.g / 255, this.color.b / 255, this.color.alpha];\n  }\n  getCSSStyle() {\n    return `rgba(${Math.round(this.color.r)},${Math.round(this.color.g)},${Math.round(this.color.b)},${this.color.alpha})`;\n  }\n  getCSSColor() {\n    return `rgb(${Math.round(this.color.r)},${Math.round(this.color.g)},${Math.round(this.color.b)})`;\n  }\n  getAlpha() {\n    return this.color.alpha.toString();\n  }\n  clone() {\n    return new TweenableColor(this.color.r, this.color.g, this.color.b, this.color.alpha);\n  }\n}\n;// CONCATENATED MODULE: ./esm/TweenableHSL.js\n\n\nclass TweenableHSL extends TweenableColor {\n  constructor() {\n    super(...arguments);\n    this.fromHSL = new HSLColor();\n    this.toHSL = new HSLColor();\n  }\n  initFromAndTo(toR, toG, toB, toAlpha) {\n    super.initFromAndTo(toR, toG, toB, toAlpha);\n    this.fromHSL.set(this.color);\n    this.toHSL.setRGBA(toR, toG, toB, toAlpha);\n  }\n  updateColor(ms) {\n    const t = this.easing((ms - this.startTime) / this.duration);\n    this.color.mixHSL(this.fromHSL, this.toHSL, t);\n    this.emit("onUpdate", this);\n  }\n}\n;// CONCATENATED MODULE: ./esm/index.js\n\n\n\n\n;// CONCATENATED MODULE: ./demoSrc/demo.ts\n\n\nvar Demo = /** @class */ (function () {\n    function Demo() {\n        TweenableColorTicker.start();\n        var color = new TweenableColor();\n        var rect = Demo.getRect(color, 0, 0);\n        document.body.appendChild(rect);\n        Demo.animateColor(color, rect);\n        var hsl = new TweenableHSL();\n        var rectHSL = Demo.getRect(hsl, 0, 160);\n        document.body.appendChild(rectHSL);\n        Demo.animateColor(hsl, rectHSL);\n    }\n    Demo.getRect = function (color, x, y) {\n        var rect = document.createElement("div");\n        rect.style.width = "100px";\n        rect.style.height = "100px";\n        rect.style.top = x + "px";\n        rect.style.left = y + "px";\n        rect.style.position = "absolute";\n        rect.style.backgroundColor = color.getCSSColor();\n        rect.style.opacity = color.getAlpha();\n        return rect;\n    };\n    Demo.animateColor = function (color, rect) {\n        color.on("onUpdate", function (e) {\n            rect.style.backgroundColor = e.getCSSColor();\n            rect.style.opacity = e.getAlpha();\n        });\n        color.change(255, 16, 16, 1, 8000, { easing: tween_esm/* Easing.Cubic.Out */.oY.Cubic.Out });\n        setTimeout(function () {\n            color.change(0, 255, 255, 1.0, 6000, { easing: tween_esm/* Easing.Cubic.Out */.oY.Cubic.Out });\n        }, 10000);\n    };\n    return Demo;\n}());\n\nwindow.onload = function () {\n    new Demo();\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBRztJQUNkLElBQUksSUFBSSxFQUFFLENBQUM7QUFDYixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AbWFzYXRvbWFraW5vL3R3ZWVuYWJsZS1jb2xvci8uL3NyYy9Ud2VlbmFibGVDb2xvclRpY2tlci50cz9mZjgzIiwid2VicGFjazovL0BtYXNhdG9tYWtpbm8vdHdlZW5hYmxlLWNvbG9yLy4vc3JjL2NvbG9yL0hTTENvbG9yLnRzPzA5NTYiLCJ3ZWJwYWNrOi8vQG1hc2F0b21ha2luby90d2VlbmFibGUtY29sb3IvLi9zcmMvY29sb3IvUkdCQ29sb3IudHM/NGQ1ZiIsIndlYnBhY2s6Ly9AbWFzYXRvbWFraW5vL3R3ZWVuYWJsZS1jb2xvci8uL3NyYy9Ud2VlbmFibGVDb2xvci50cz9jOGY2Iiwid2VicGFjazovL0BtYXNhdG9tYWtpbm8vdHdlZW5hYmxlLWNvbG9yLy4vc3JjL1R3ZWVuYWJsZUhTTC50cz9hYjk4Iiwid2VicGFjazovL0BtYXNhdG9tYWtpbm8vdHdlZW5hYmxlLWNvbG9yLy4vc3JjL2luZGV4LnRzP2ZmYjQiLCJ3ZWJwYWNrOi8vQG1hc2F0b21ha2luby90d2VlbmFibGUtY29sb3IvLi9kZW1vU3JjL2RlbW8udHM/YjZkZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudGVtaXR0ZXIzXCI7XG5cbmV4cG9ydCBjbGFzcyBUd2VlbmFibGVDb2xvclRpY2tlciB7XG4gIHN0YXRpYyB0aWNrZXI6IEV2ZW50RW1pdHRlcjxcInJhZlwiLCBudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHN0YXRpYyBnZXQgcmFmSUQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JhZklEO1xuICB9XG4gIHN0YXRpYyBfcmFmSUQ/OiBudW1iZXI7XG4gIHN0YXRpYyBzdGFydChub3c/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3JhZklEKSB7XG4gICAgICB0aGlzLnJhZkNhbGxiYWNrKG5vdyA/PyBwZXJmb3JtYW5jZS5ub3coKSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHN0b3AoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3JhZklEKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9yYWZJRCk7XG4gICAgICB0aGlzLl9yYWZJRCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlKG1zOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnRpY2tlci5lbWl0KFwicmFmXCIsIG1zKTtcbiAgfVxuXG4gIHN0YXRpYyByYWZDYWxsYmFjayA9IChtczogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy51cGRhdGUobXMpO1xuICAgIHRoaXMuX3JhZklEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmFmQ2FsbGJhY2spO1xuICB9O1xufVxuIiwiaW1wb3J0IENvbG9yIGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHsgUkdCQ29sb3IgfSBmcm9tIFwiLi9SR0JDb2xvclwiO1xuXG5leHBvcnQgY2xhc3MgSFNMQ29sb3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaDogbnVtYmVyID0gMCxcbiAgICBwdWJsaWMgczogbnVtYmVyID0gMCxcbiAgICBwdWJsaWMgbDogbnVtYmVyID0gMCxcbiAgICBwdWJsaWMgYWxwaGE6IG51bWJlciA9IDEuMFxuICApIHt9XG5cbiAgdG9SR0IoKTogUkdCQ29sb3Ige1xuICAgIGNvbnN0IGhzbE9iaiA9IHRoaXMudG9Db2xvcigpO1xuICAgIHJldHVybiBuZXcgUkdCQ29sb3IoXG4gICAgICBoc2xPYmoucmVkKCksXG4gICAgICBoc2xPYmouZ3JlZW4oKSxcbiAgICAgIGhzbE9iai5ibHVlKCksXG4gICAgICBoc2xPYmouYWxwaGEoKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHRvQ29sb3IoKTogQ29sb3Ige1xuICAgIHJldHVybiBDb2xvci5oc2woe1xuICAgICAgaDogdGhpcy5oLFxuICAgICAgbDogdGhpcy5sLFxuICAgICAgczogdGhpcy5zLFxuICAgICAgYWxwaGE6IHRoaXMuYWxwaGEsXG4gICAgfSk7XG4gIH1cblxuICBzZXQocmdiT2JqOiBSR0JDb2xvcik6IHZvaWQge1xuICAgIGNvbnN0IGNvbG9yID0gQ29sb3IucmdiKHJnYk9iaik7XG4gICAgdGhpcy5oID0gY29sb3IuaHVlKCk7XG4gICAgdGhpcy5sID0gY29sb3IubGlnaHRuZXNzKCk7XG4gICAgdGhpcy5zID0gY29sb3Iuc2F0dXJhdGlvbmwoKTtcbiAgICB0aGlzLmFscGhhID0gY29sb3IuYWxwaGEoKTtcbiAgfVxuXG4gIHNldFJHQkEocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgYWxwaGE6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGNvbG9yID0gQ29sb3IucmdiKHsgciwgZywgYiwgYWxwaGEgfSk7XG4gICAgdGhpcy5oID0gY29sb3IuaHVlKCk7XG4gICAgdGhpcy5sID0gY29sb3IubGlnaHRuZXNzKCk7XG4gICAgdGhpcy5zID0gY29sb3Iuc2F0dXJhdGlvbmwoKTtcbiAgICB0aGlzLmFscGhhID0gY29sb3IuYWxwaGEoKTtcbiAgfVxufVxuIiwiaW1wb3J0IENvbG9yIGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHsgSFNMQ29sb3IgfSBmcm9tIFwiLi9IU0xDb2xvclwiO1xuXG5leHBvcnQgY2xhc3MgUkdCQ29sb3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcjogbnVtYmVyID0gMCxcbiAgICBwdWJsaWMgZzogbnVtYmVyID0gMCxcbiAgICBwdWJsaWMgYjogbnVtYmVyID0gMCxcbiAgICBwdWJsaWMgYWxwaGE6IG51bWJlciA9IDEuMFxuICApIHt9XG5cbiAgc3RhdGljIGZyb21Db2xvcihjb2xvcjogQ29sb3IpOiBSR0JDb2xvciB7XG4gICAgcmV0dXJuIG5ldyBSR0JDb2xvcihcbiAgICAgIGNvbG9yLnJlZCgpLFxuICAgICAgY29sb3IuZ3JlZW4oKSxcbiAgICAgIGNvbG9yLmJsdWUoKSxcbiAgICAgIGNvbG9yLmFscGhhKClcbiAgICApO1xuICB9XG5cbiAgc2V0KHJnYmE6IFJHQkNvbG9yKTogdm9pZCB7XG4gICAgdGhpcy5yID0gcmdiYS5yO1xuICAgIHRoaXMuZyA9IHJnYmEuZztcbiAgICB0aGlzLmIgPSByZ2JhLmI7XG4gICAgdGhpcy5hbHBoYSA9IHJnYmEuYWxwaGE7XG4gIH1cblxuICBzZXRSR0JBKHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGFscGhhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMuZyA9IGc7XG4gICAgdGhpcy5iID0gYjtcbiAgICB0aGlzLmFscGhhID0gYWxwaGE7XG4gIH1cbiAgZXF1YWxSR0JBKHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGFscGhhOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5yID09IHIgJiYgdGhpcy5nID09IGcgJiYgdGhpcy5iID09IGIgJiYgdGhpcy5hbHBoYSA9PSBhbHBoYTtcbiAgfVxuICBtaXgoZnJvbTogUkdCQ29sb3IsIHRvOiBSR0JDb2xvciwgdDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgcnQgPSAxIC0gdDtcbiAgICB0aGlzLnIgPSB0by5yICogdCArIGZyb20uciAqIHJ0O1xuICAgIHRoaXMuZyA9IHRvLmcgKiB0ICsgZnJvbS5nICogcnQ7XG4gICAgdGhpcy5iID0gdG8uYiAqIHQgKyBmcm9tLmIgKiBydDtcbiAgICB0aGlzLmFscGhhID0gdG8uYWxwaGEgKiB0ICsgZnJvbS5hbHBoYSAqIHJ0O1xuICB9XG5cbiAgbWl4SFNMKGZyb206IEhTTENvbG9yLCB0bzogSFNMQ29sb3IsIHQ6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHJ0ID0gMSAtIHQ7XG5cbiAgICBjb25zdCBoc2wgPSBuZXcgSFNMQ29sb3IoKTtcbiAgICBoc2wuaCA9IHRvLmggKiB0ICsgZnJvbS5oICogcnQ7XG4gICAgaHNsLnMgPSB0by5zICogdCArIGZyb20ucyAqIHJ0O1xuICAgIGhzbC5sID0gdG8ubCAqIHQgKyBmcm9tLmwgKiBydDtcbiAgICBoc2wuYWxwaGEgPSB0by5hbHBoYSAqIHQgKyBmcm9tLmFscGhhICogcnQ7XG5cbiAgICB0aGlzLnNldChoc2wudG9SR0IoKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEVhc2luZyB9IGZyb20gXCJAdHdlZW5qcy90d2Vlbi5qc1wiO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50ZW1pdHRlcjNcIjtcbmltcG9ydCB7IFR3ZWVuYWJsZUNvbG9yVGlja2VyIH0gZnJvbSBcIi4vVHdlZW5hYmxlQ29sb3JUaWNrZXJcIjtcbmltcG9ydCB7IFJHQkNvbG9yIH0gZnJvbSBcIi4vY29sb3JcIjtcblxuZXhwb3J0IGNsYXNzIFR3ZWVuYWJsZUNvbG9yIGV4dGVuZHMgRXZlbnRFbWl0dGVyPFxuICBcIm9uVXBkYXRlXCIgfCBcIm9uQ29tcGxldGVcIixcbiAgVHdlZW5hYmxlQ29sb3Jcbj4ge1xuICBwcm90ZWN0ZWQgY29sb3I6IFJHQkNvbG9yO1xuXG4gIHByb3RlY3RlZCBmcm9tOiBSR0JDb2xvciA9IG5ldyBSR0JDb2xvcigpO1xuICBwcm90ZWN0ZWQgdG86IFJHQkNvbG9yID0gbmV3IFJHQkNvbG9yKCk7XG4gIHByb3RlY3RlZCBzdGFydFRpbWU6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBkdXJhdGlvbjogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIGVhc2luZzogKGFtb3VudDogbnVtYmVyKSA9PiBudW1iZXIgPSBFYXNpbmcuTGluZWFyLk5vbmU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcjogbnVtYmVyID0gMCxcbiAgICBnOiBudW1iZXIgPSAwLFxuICAgIGI6IG51bWJlciA9IDAsXG4gICAgYWxwaGE6IG51bWJlciA9IDEuMFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY29sb3IgPSBuZXcgUkdCQ29sb3IociwgZywgYiwgYWxwaGEpO1xuICB9XG5cbiAgY2hhbmdlKFxuICAgIHRvUjogbnVtYmVyLFxuICAgIHRvRzogbnVtYmVyLFxuICAgIHRvQjogbnVtYmVyLFxuICAgIHRvQWxwaGE6IG51bWJlcixcbiAgICBkdXJhdGlvbjogbnVtYmVyLFxuICAgIG9wdGlvbj86IENoYW5nZU9wdGlvblxuICApOiB2b2lkIHtcbiAgICBjb25zdCBjaGFuZ2VPcHRpb24gPSBUd2VlbmFibGVDb2xvci5pbml0T3B0aW9uKFxuICAgICAgb3B0aW9uXG4gICAgKSBhcyBSZXF1aXJlZDxDaGFuZ2VPcHRpb24+O1xuXG4gICAgaWYgKHRoaXMuY29sb3IuZXF1YWxSR0JBKHRvUiwgdG9HLCB0b0IsIHRvQWxwaGEpKSByZXR1cm47XG5cbiAgICBUd2VlbmFibGVDb2xvclRpY2tlci50aWNrZXIucmVtb3ZlTGlzdGVuZXIoXCJyYWZcIiwgdGhpcy5vblRpY2spO1xuICAgIHRoaXMuaW5pdEZyb21BbmRUbyh0b1IsIHRvRywgdG9CLCB0b0FscGhhKTtcblxuICAgIHRoaXMuc3RhcnRUaW1lID0gY2hhbmdlT3B0aW9uLnN0YXJ0VGltZSA/PyBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgdGhpcy5lYXNpbmcgPSBjaGFuZ2VPcHRpb24uZWFzaW5nO1xuXG4gICAgVHdlZW5hYmxlQ29sb3JUaWNrZXIudGlja2VyLm9uKFwicmFmXCIsIHRoaXMub25UaWNrKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0RnJvbUFuZFRvKFxuICAgIHRvUjogbnVtYmVyLFxuICAgIHRvRzogbnVtYmVyLFxuICAgIHRvQjogbnVtYmVyLFxuICAgIHRvQWxwaGE6IG51bWJlclxuICApOiB2b2lkIHtcbiAgICB0aGlzLnRvLnNldFJHQkEodG9SLCB0b0csIHRvQiwgdG9BbHBoYSk7XG4gICAgdGhpcy5mcm9tLnNldCh0aGlzLmNvbG9yKTtcbiAgfVxuICBwcm90ZWN0ZWQgb25UaWNrID0gKG1zOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBpc0NvbXBsZXRlID0gdGhpcy5vbkNvbXBsZXRlKG1zKTtcbiAgICBpZiAoaXNDb21wbGV0ZSkgcmV0dXJuO1xuXG4gICAgdGhpcy51cGRhdGVDb2xvcihtcyk7XG4gIH07XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZUNvbG9yKG1zOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB0ID0gdGhpcy5lYXNpbmcoKG1zIC0gdGhpcy5zdGFydFRpbWUpIC8gdGhpcy5kdXJhdGlvbik7XG4gICAgdGhpcy5jb2xvci5taXgodGhpcy5mcm9tLCB0aGlzLnRvLCB0KTtcbiAgICB0aGlzLmVtaXQoXCJvblVwZGF0ZVwiLCB0aGlzKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkNvbXBsZXRlKG1zOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAobXMgPiB0aGlzLnN0YXJ0VGltZSArIHRoaXMuZHVyYXRpb24pIHtcbiAgICAgIHRoaXMuY29sb3Iuc2V0KHRoaXMudG8pO1xuICAgICAgVHdlZW5hYmxlQ29sb3JUaWNrZXIudGlja2VyLnJlbW92ZUxpc3RlbmVyKFwicmFmXCIsIHRoaXMub25UaWNrKTtcbiAgICAgIHRoaXMuZW1pdChcIm9uVXBkYXRlXCIsIHRoaXMpO1xuICAgICAgdGhpcy5lbWl0KFwib25Db21wbGV0ZVwiLCB0aGlzKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3RhdGljIGluaXRPcHRpb24ob3B0aW9uPzogQ2hhbmdlT3B0aW9uKSB7XG4gICAgb3B0aW9uID8/PSB7fTtcbiAgICBvcHRpb24uZWFzaW5nID8/PSBFYXNpbmcuTGluZWFyLk5vbmU7XG4gICAgcmV0dXJuIG9wdGlvbjtcbiAgfVxuICBnZXRBdHRyaWJ1dGUoKTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLmNvbG9yLnIgLyAyNTUsXG4gICAgICB0aGlzLmNvbG9yLmcgLyAyNTUsXG4gICAgICB0aGlzLmNvbG9yLmIgLyAyNTUsXG4gICAgICB0aGlzLmNvbG9yLmFscGhhLFxuICAgIF07XG4gIH1cblxuICBnZXRDU1NTdHlsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgcmdiYSgke01hdGgucm91bmQodGhpcy5jb2xvci5yKX0sJHtNYXRoLnJvdW5kKFxuICAgICAgdGhpcy5jb2xvci5nXG4gICAgKX0sJHtNYXRoLnJvdW5kKHRoaXMuY29sb3IuYil9LCR7dGhpcy5jb2xvci5hbHBoYX0pYDtcbiAgfVxuXG4gIGdldENTU0NvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGByZ2IoJHtNYXRoLnJvdW5kKHRoaXMuY29sb3Iucil9LCR7TWF0aC5yb3VuZChcbiAgICAgIHRoaXMuY29sb3IuZ1xuICAgICl9LCR7TWF0aC5yb3VuZCh0aGlzLmNvbG9yLmIpfSlgO1xuICB9XG4gIGdldEFscGhhKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3IuYWxwaGEudG9TdHJpbmcoKTtcbiAgfVxuXG4gIGNsb25lKCk6IFR3ZWVuYWJsZUNvbG9yIHtcbiAgICByZXR1cm4gbmV3IFR3ZWVuYWJsZUNvbG9yKFxuICAgICAgdGhpcy5jb2xvci5yLFxuICAgICAgdGhpcy5jb2xvci5nLFxuICAgICAgdGhpcy5jb2xvci5iLFxuICAgICAgdGhpcy5jb2xvci5hbHBoYVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VPcHRpb24ge1xuICBlYXNpbmc/OiAoYW1vdW50OiBudW1iZXIpID0+IG51bWJlcjtcbiAgc3RhcnRUaW1lPzogbnVtYmVyO1xufVxuIiwiaW1wb3J0IHsgVHdlZW5hYmxlQ29sb3JUaWNrZXIgfSBmcm9tIFwiLi9Ud2VlbmFibGVDb2xvclRpY2tlclwiO1xuaW1wb3J0IHsgSFNMQ29sb3IgfSBmcm9tIFwiLi9jb2xvclwiO1xuaW1wb3J0IHsgQ2hhbmdlT3B0aW9uLCBUd2VlbmFibGVDb2xvciB9IGZyb20gXCIuL1R3ZWVuYWJsZUNvbG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBUd2VlbmFibGVIU0wgZXh0ZW5kcyBUd2VlbmFibGVDb2xvciB7XG4gIHByb3RlY3RlZCBmcm9tSFNMOiBIU0xDb2xvciA9IG5ldyBIU0xDb2xvcigpO1xuICBwcm90ZWN0ZWQgdG9IU0w6IEhTTENvbG9yID0gbmV3IEhTTENvbG9yKCk7XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGluaXRGcm9tQW5kVG8oXG4gICAgdG9SOiBudW1iZXIsXG4gICAgdG9HOiBudW1iZXIsXG4gICAgdG9COiBudW1iZXIsXG4gICAgdG9BbHBoYTogbnVtYmVyXG4gICkge1xuICAgIHN1cGVyLmluaXRGcm9tQW5kVG8odG9SLCB0b0csIHRvQiwgdG9BbHBoYSk7XG4gICAgdGhpcy5mcm9tSFNMLnNldCh0aGlzLmNvbG9yKTtcbiAgICB0aGlzLnRvSFNMLnNldFJHQkEodG9SLCB0b0csIHRvQiwgdG9BbHBoYSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlQ29sb3IobXM6IG51bWJlcikge1xuICAgIGNvbnN0IHQgPSB0aGlzLmVhc2luZygobXMgLSB0aGlzLnN0YXJ0VGltZSkgLyB0aGlzLmR1cmF0aW9uKTtcbiAgICB0aGlzLmNvbG9yLm1peEhTTCh0aGlzLmZyb21IU0wsIHRoaXMudG9IU0wsIHQpO1xuICAgIHRoaXMuZW1pdChcIm9uVXBkYXRlXCIsIHRoaXMpO1xuICB9XG59XG4iLCJleHBvcnQgKiBmcm9tIFwiLi9Ud2VlbmFibGVDb2xvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vVHdlZW5hYmxlSFNMXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9jb2xvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vVHdlZW5hYmxlQ29sb3JUaWNrZXJcIjtcbiIsImltcG9ydCB7IFR3ZWVuYWJsZUNvbG9yLCBUd2VlbmFibGVIU0wsIFR3ZWVuYWJsZUNvbG9yVGlja2VyIH0gZnJvbSBcIi4uL1wiO1xuaW1wb3J0IHsgRWFzaW5nIH0gZnJvbSBcIkB0d2VlbmpzL3R3ZWVuLmpzXCI7XG5leHBvcnQgY2xhc3MgRGVtbyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIFR3ZWVuYWJsZUNvbG9yVGlja2VyLnN0YXJ0KCk7XG5cbiAgICBjb25zdCBjb2xvciA9IG5ldyBUd2VlbmFibGVDb2xvcigpO1xuICAgIGNvbnN0IHJlY3QgPSBEZW1vLmdldFJlY3QoY29sb3IsIDAsIDApO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVjdCk7XG4gICAgRGVtby5hbmltYXRlQ29sb3IoY29sb3IsIHJlY3QpO1xuXG4gICAgY29uc3QgaHNsID0gbmV3IFR3ZWVuYWJsZUhTTCgpO1xuICAgIGNvbnN0IHJlY3RIU0wgPSBEZW1vLmdldFJlY3QoaHNsLCAwLCAxNjApO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVjdEhTTCk7XG4gICAgRGVtby5hbmltYXRlQ29sb3IoaHNsLCByZWN0SFNMKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldFJlY3QgPSAoY29sb3I6IFR3ZWVuYWJsZUNvbG9yLCB4OiBudW1iZXIsIHk6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHJlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJlY3Quc3R5bGUud2lkdGggPSBcIjEwMHB4XCI7XG4gICAgcmVjdC5zdHlsZS5oZWlnaHQgPSBcIjEwMHB4XCI7XG4gICAgcmVjdC5zdHlsZS50b3AgPSB4ICsgXCJweFwiO1xuICAgIHJlY3Quc3R5bGUubGVmdCA9IHkgKyBcInB4XCI7XG4gICAgcmVjdC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICByZWN0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yLmdldENTU0NvbG9yKCk7XG4gICAgcmVjdC5zdHlsZS5vcGFjaXR5ID0gY29sb3IuZ2V0QWxwaGEoKTtcbiAgICByZXR1cm4gcmVjdDtcbiAgfTtcblxuICBwcml2YXRlIHN0YXRpYyBhbmltYXRlQ29sb3IgPSAoXG4gICAgY29sb3I6IFR3ZWVuYWJsZUNvbG9yLFxuICAgIHJlY3Q6IEhUTUxEaXZFbGVtZW50XG4gICkgPT4ge1xuICAgIGNvbG9yLm9uKFwib25VcGRhdGVcIiwgKGU6IFR3ZWVuYWJsZUNvbG9yKSA9PiB7XG4gICAgICByZWN0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGUuZ2V0Q1NTQ29sb3IoKTtcbiAgICAgIHJlY3Quc3R5bGUub3BhY2l0eSA9IGUuZ2V0QWxwaGEoKTtcbiAgICB9KTtcblxuICAgIGNvbG9yLmNoYW5nZSgyNTUsIDE2LCAxNiwgMSwgODAwMCwgeyBlYXNpbmc6IEVhc2luZy5DdWJpYy5PdXQgfSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb2xvci5jaGFuZ2UoMCwgMjU1LCAyNTUsIDEuMCwgNjAwMCwgeyBlYXNpbmc6IEVhc2luZy5DdWJpYy5PdXQgfSk7XG4gICAgfSwgMTAwMDApO1xuICB9O1xufVxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBuZXcgRGVtbygpO1xufTtcbiJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJUd2VlbmFibGVDb2xvclRpY2tlciIsInJhZklEIiwiX3JhZklEIiwic3RhcnQiLCJub3ciLCJyYWZDYWxsYmFjayIsInBlcmZvcm1hbmNlIiwic3RvcCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwidW5kZWZpbmVkIiwidXBkYXRlIiwibXMiLCJ0aWNrZXIiLCJlbWl0IiwiX2EiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJDb2xvciIsIlJHQkNvbG9yIiwiSFNMQ29sb3IiLCJjb25zdHJ1Y3RvciIsImgiLCJzIiwibCIsImFscGhhIiwidG9SR0IiLCJoc2xPYmoiLCJ0b0NvbG9yIiwicmVkIiwiZ3JlZW4iLCJibHVlIiwiaHNsIiwic2V0IiwicmdiT2JqIiwiY29sb3IiLCJyZ2IiLCJodWUiLCJsaWdodG5lc3MiLCJzYXR1cmF0aW9ubCIsInNldFJHQkEiLCJyIiwiZyIsImIiLCJmcm9tQ29sb3IiLCJyZ2JhIiwiZXF1YWxSR0JBIiwibWl4IiwiZnJvbSIsInRvIiwidCIsInJ0IiwibWl4SFNMIiwiRWFzaW5nIiwiVHdlZW5hYmxlQ29sb3IiLCJMaW5lYXIiLCJOb25lIiwiaXNDb21wbGV0ZSIsIm9uQ29tcGxldGUiLCJ1cGRhdGVDb2xvciIsImNoYW5nZSIsInRvUiIsInRvRyIsInRvQiIsInRvQWxwaGEiLCJkdXJhdGlvbiIsIm9wdGlvbiIsImNoYW5nZU9wdGlvbiIsImluaXRPcHRpb24iLCJyZW1vdmVMaXN0ZW5lciIsIm9uVGljayIsImluaXRGcm9tQW5kVG8iLCJzdGFydFRpbWUiLCJlYXNpbmciLCJvbiIsImdldEF0dHJpYnV0ZSIsImdldENTU1N0eWxlIiwiTWF0aCIsInJvdW5kIiwiZ2V0Q1NTQ29sb3IiLCJnZXRBbHBoYSIsInRvU3RyaW5nIiwiY2xvbmUiLCJUd2VlbmFibGVIU0wiLCJmcm9tSFNMIiwidG9IU0wiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///671\n')}},__webpack_module_cache__={},deferred;function __webpack_require__(Q){var U=__webpack_module_cache__[Q];if(void 0!==U)return U.exports;var F=__webpack_module_cache__[Q]={exports:{}};return __webpack_modules__[Q](F,F.exports,__webpack_require__),F.exports}__webpack_require__.m=__webpack_modules__,deferred=[],__webpack_require__.O=(Q,U,F,B)=>{if(!U){var s=1/0;for(L=0;L<deferred.length;L++){for(var[U,F,B]=deferred[L],I=!0,i=0;i<U.length;i++)(!1&B||s>=B)&&Object.keys(__webpack_require__.O).every((Q=>__webpack_require__.O[Q](U[i])))?U.splice(i--,1):(I=!1,B<s&&(s=B));if(I){deferred.splice(L--,1);var t=F();void 0!==t&&(Q=t)}}return Q}B=B||0;for(var L=deferred.length;L>0&&deferred[L-1][2]>B;L--)deferred[L]=deferred[L-1];deferred[L]=[U,F,B]},__webpack_require__.n=Q=>{var U=Q&&Q.__esModule?()=>Q.default:()=>Q;return __webpack_require__.d(U,{a:U}),U},__webpack_require__.d=(Q,U)=>{for(var F in U)__webpack_require__.o(U,F)&&!__webpack_require__.o(Q,F)&&Object.defineProperty(Q,F,{enumerable:!0,get:U[F]})},__webpack_require__.o=(Q,U)=>Object.prototype.hasOwnProperty.call(Q,U),(()=>{var Q={577:0};__webpack_require__.O.j=U=>0===Q[U];var U=(U,F)=>{var B,s,[I,i,t]=F,L=0;if(I.some((U=>0!==Q[U]))){for(B in i)__webpack_require__.o(i,B)&&(__webpack_require__.m[B]=i[B]);if(t)var x=t(__webpack_require__)}for(U&&U(F);L<I.length;L++)s=I[L],__webpack_require__.o(Q,s)&&Q[s]&&Q[s][0](),Q[s]=0;return __webpack_require__.O(x)},F=self.webpackChunk_masatomakino_tweenable_color=self.webpackChunk_masatomakino_tweenable_color||[];F.forEach(U.bind(null,0)),F.push=U.bind(null,F.push.bind(F))})();var __webpack_exports__=__webpack_require__.O(void 0,[736],(()=>__webpack_require__(671)));__webpack_exports__=__webpack_require__.O(__webpack_exports__)})();