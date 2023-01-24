import { TweenableColor } from "../";
import TWEEN, { Easing } from "@tweenjs/tween.js";
export class Demo {
  constructor() {
    const animate = (time: number) => {
      requestAnimationFrame(animate);
      TWEEN.update(time);
    };
    requestAnimationFrame(animate);

    const color = new TweenableColor();
    const rect = document.createElement("div");
    rect.style.width = "100px";
    rect.style.height = "100px";
    rect.style.position = "absolute";
    rect.style.backgroundColor = color.getCSSColor();
    rect.style.opacity = color.getAlpha();

    document.body.appendChild(rect);
    color.on("onUpdate", (e: TweenableColor) => {
      rect.style.backgroundColor = e.getCSSColor();
      rect.style.opacity = e.getAlpha();
    });

    color.changeRGBA(255, 16, 16, 1, 1000, Easing.Cubic.Out);
    setTimeout(() => {
      color.changeRGBA(0, 255, 255, 1.0, 1500, Easing.Cubic.Out);
    }, 3000);
  }
}

window.onload = () => {
  new Demo();
};
