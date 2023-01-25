import { Easing, Tween } from "@tweenjs/tween.js";
import { EventEmitter } from "eventemitter3";
import { RGBColor } from "./color";

export class TweenableColor extends EventEmitter {
  protected tween: Tween<any>;
  protected color: RGBColor;

  constructor(
    r: number = 0,
    g: number = 0,
    b: number = 0,
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
    option?: ChangeOption
  ): void {
    const changeOption = TweenableColor.initOption(
      option
    ) as Required<ChangeOption>;
    this.tween.stop();

    const color = this.color;
    const to = new RGBColor(toR, toG, toB, toAlpha);

    this.tween = new Tween(color)
      .to(to, duration)
      .easing(changeOption.easing)
      .onUpdate(() => {
        console.log("update");
        this.emit("onUpdate", this);
      })
      .onComplete(() => {})
      .start(changeOption.startTime);
  }

  protected static initOption(option?: ChangeOption) {
    option ??= {};
    option.easing ??= Easing.Linear.None;
    return option;
  }
  getAttribute(): [number, number, number, number] {
    return [
      this.color.r / 255,
      this.color.g / 255,
      this.color.b / 255,
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

  clone(): TweenableColor {
    return new TweenableColor(
      this.color.r,
      this.color.g,
      this.color.b,
      this.color.alpha
    );
  }
}

export interface ChangeOption {
  easing?: (amount: number) => number;
  startTime?: number;
}
