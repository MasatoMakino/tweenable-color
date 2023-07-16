import { Easing } from "@tweenjs/tween.js";
import { EventEmitter } from "eventemitter3";
import { TweenableColorTicker, RGBColor } from "./index.js";

export class TweenableColor extends EventEmitter<
  "onUpdate" | "onComplete",
  TweenableColor
> {
  protected color: RGBColor;

  protected from: RGBColor = new RGBColor();
  protected to: RGBColor = new RGBColor();
  protected startTime: number = 0;
  protected duration: number = 0;
  protected easing: (amount: number) => number = Easing.Linear.None;

  constructor(
    r: number = 0,
    g: number = 0,
    b: number = 0,
    alpha: number = 1.0
  ) {
    super();
    this.color = new RGBColor(r, g, b, alpha);
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

    if (this.color.equalRGBA(toR, toG, toB, toAlpha)) return;

    TweenableColorTicker.ticker.removeListener("raf", this.onTick);
    this.initFromAndTo(toR, toG, toB, toAlpha);

    this.startTime = changeOption.startTime ?? performance.now();
    this.duration = duration;
    this.easing = changeOption.easing;

    TweenableColorTicker.ticker.on("raf", this.onTick);
  }

  protected initFromAndTo(
    toR: number,
    toG: number,
    toB: number,
    toAlpha: number
  ): void {
    this.to.setRGBA(toR, toG, toB, toAlpha);
    this.from.set(this.color);
  }
  protected onTick = (ms: number) => {
    const isComplete = this.onComplete(ms);
    if (isComplete) return;

    this.updateColor(ms);
  };

  protected updateColor(ms: number): void {
    const t = this.easing((ms - this.startTime) / this.duration);
    this.color.mix(this.from, this.to, t);
    this.emit("onUpdate", this);
  }

  protected onComplete(ms: number): boolean {
    if (ms > this.startTime + this.duration) {
      this.color.set(this.to);
      TweenableColorTicker.ticker.removeListener("raf", this.onTick);
      this.emit("onUpdate", this);
      this.emit("onComplete", this);
      return true;
    }
    return false;
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
