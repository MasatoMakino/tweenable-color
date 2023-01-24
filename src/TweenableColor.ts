import { Easing, Tween } from "@tweenjs/tween.js";
import { EventEmitter } from "eventemitter3";
import { RGBColor } from "./RGBColor";

export class TweenableColor extends EventEmitter implements ITweenableColor {
  protected tween: Tween<any>;
  protected color: RGBColor;

  constructor(
    r: number = 255,
    g: number = 255,
    b: number = 255,
    alpha: number = 1.0
  ) {
    super();
    this.color = new RGBColor(r, g, b, alpha);
    this.tween = new Tween(this.color);
  }

  change(
    toR: number,
    toG: number,
    toB: number,
    toAlpha: number,
    duration: number,
    easing: (amount: number) => number = Easing.Linear.None
  ): void {
    this.tween.stop();

    const color = this.color;
    const to = new RGBColor(toR, toG, toB, toAlpha);

    this.tween = new Tween(color)
      .to(to, duration)
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
    return `rgba(${Math.round(this.color.r)},${Math.round(
      this.color.g
    )},${Math.round(this.color.b)},${this.color.alpha})`;
  }

  getCSSColor(): string {
    return `rgb(${Math.round(this.color.r)},${Math.round(
      this.color.g
    )},${Math.round(this.color.b)})`;
  }
  getAlpha(): string {
    return this.color.alpha.toString();
  }
}
