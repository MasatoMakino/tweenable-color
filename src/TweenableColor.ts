import { Easing, Tween } from "@tweenjs/tween.js";
import { EventEmitter } from "eventemitter3";
import { RGBColor } from "./RGBColor";

export class TweenableColor extends EventEmitter implements ITweenableColor {
  private tween: Tween<RGBColor>;
  private color: RGBColor;

  constructor(
    r: number = 255,
    g: number = 255,
    b: number = 255,
    alpha: number = 1.0
  ) {
    super();

    this.color = new RGBColor(r, g, b, alpha);
    this.tween = new Tween<RGBColor>(this.color);
  }

  changeRGBA(
    toR: number,
    toG: number,
    toB: number,
    toAlpha: number,
    duration: number,
    easing: (amount: number) => number = Easing.Linear.None
  ): void {
    this.tween.stop();

    const fromColor = this.color;
    const toColor = new RGBColor(toR, toG, toB, toAlpha);

    this.tween = new Tween(fromColor)
      .to(toColor, duration)
      .easing(easing)
      .onUpdate(() => {
        this.emit("onUpdate", this);
      })
      .start();
  }

  getAttribute(): [number, number, number, number] {
    return [
      this.color.r / 256,
      this.color.g / 256,
      this.color.b / 256,
      this.color.alpha,
    ];
  }

  getCSSStyle(): string {
    return `rgba(${Math.trunc(this.color.r)},${Math.trunc(
      this.color.g
    )},${Math.trunc(this.color.b)},${this.color.alpha})`;
  }

  getCSSColor(): string {
    return `rgb(${Math.trunc(this.color.r)},${Math.trunc(
      this.color.g
    )},${Math.trunc(this.color.b)})`;
  }
  getAlpha(): string {
    return this.color.alpha.toString();
  }
}
