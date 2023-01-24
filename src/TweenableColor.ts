import { Easing, Tween } from "@tweenjs/tween.js";
import { EventEmitter } from "eventemitter3";

export class TweenableColor extends EventEmitter {
  private tween: Tween<TweenableColor>;
  constructor(
    public r: number = 255,
    public g: number = 255,
    public b: number = 255,
    public a: number = 1.0
  ) {
    super();
    this.tween = new Tween<TweenableColor>(this);
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

    this.tween = new Tween<TweenableColor>(this)
      .to({ r: toR, g: toG, b: toB, a: toAlpha }, duration)
      .easing(easing)
      .onUpdate(() => {
        this.emit("onUpdate", this);
      })
      .start();
  }

  getAttribute(): [number, number, number, number] {
    return [this.r, this.g, this.b, this.a];
  }

  getCSSStyle(): string {
    return `rgba(${Math.trunc(this.r)},${Math.trunc(this.g)},${Math.trunc(
      this.b
    )},${this.a})`;
  }

  getCSSColor(): string {
    return `rgb(${Math.trunc(this.r)},${Math.trunc(this.g)},${Math.trunc(
      this.b
    )})`;
  }
  getAlpha(): string {
    return this.a.toString();
  }
}
