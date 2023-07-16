import { HSLColor, TweenableColor } from "./index.js";

export class TweenableHSL extends TweenableColor {
  protected fromHSL: HSLColor = new HSLColor();
  protected toHSL: HSLColor = new HSLColor();

  protected override initFromAndTo(
    toR: number,
    toG: number,
    toB: number,
    toAlpha: number
  ) {
    super.initFromAndTo(toR, toG, toB, toAlpha);
    this.fromHSL.set(this.color);
    this.toHSL.setRGBA(toR, toG, toB, toAlpha);
  }

  protected override updateColor(ms: number) {
    const t = this.easing((ms - this.startTime) / this.duration);
    this.color.mixHSL(this.fromHSL, this.toHSL, t);
    this.emit("onUpdate", this);
  }
}
