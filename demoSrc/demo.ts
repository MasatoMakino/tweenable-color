import { TweenableColor, TweenableHSL } from "../";
import TWEEN, { Easing } from "@tweenjs/tween.js";
export class Demo {
  constructor() {
    const animate = (time: number) => {
      requestAnimationFrame(animate);
      TWEEN.update(time);
    };
    requestAnimationFrame(animate);

    const color = new TweenableColor();
    const rect = Demo.getRect(color, 0, 0);
    document.body.appendChild(rect);
    Demo.animateColor(color, rect);

    const hsl = new TweenableHSL();
    const rectHSL = Demo.getRect(hsl, 0, 160);
    document.body.appendChild(rectHSL);
    Demo.animateColor(hsl, rectHSL);
  }

  private static getRect = (color: TweenableColor, x: number, y: number) => {
    const rect = document.createElement("div");
    rect.style.width = "100px";
    rect.style.height = "100px";
    rect.style.top = x + "px";
    rect.style.left = y + "px";
    rect.style.position = "absolute";
    rect.style.backgroundColor = color.getCSSColor();
    rect.style.opacity = color.getAlpha();
    return rect;
  };

  private static animateColor = (
    color: TweenableColor,
    rect: HTMLDivElement
  ) => {
    color.on("onUpdate", (e: TweenableColor) => {
      rect.style.backgroundColor = e.getCSSColor();
      rect.style.opacity = e.getAlpha();
    });

    color.change(255, 16, 16, 1, 10000, Easing.Cubic.Out);
    setTimeout(() => {
      color.change(0, 255, 255, 1.0, 1500, Easing.Cubic.Out);
    }, 15000);
  };
}

window.onload = () => {
  new Demo();
};
