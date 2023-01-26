import { TweenableColorTicker } from "./TweenableColorTicker";
import { HSLColor } from "./color";
import { ChangeOption, TweenableColor } from "./TweenableColor";

export class TweenableHSL extends TweenableColor {
  protected fromHSL: HSLColor = new HSLColor();
  protected toHSL: HSLColor = new HSLColor();
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

    this.to.setRGBA(toR, toG, toB, toAlpha);
    if (this.to.equal(this.color)) return;

    TweenableColorTicker.ticker.removeListener("raf", this.onTick);
    this.fromHSL.set(this.color);
    this.toHSL.setRGBA(toR, toG, toB, toAlpha);

    this.startTime = changeOption.startTime ?? performance.now();
    this.duration = duration;
    this.easing = changeOption.easing;

    TweenableColorTicker.ticker.on("raf", this.onTick);
  }

  protected onTick = (ms: number) => {
    if (ms > this.startTime + this.duration) {
      this.color.set(this.to);
      TweenableColorTicker.ticker.removeListener("raf", this.onTick);
      this.emit("onUpdate", this);
      // TODO : emit "onComplete"
      return;
    }

    const t = this.easing((ms - this.startTime) / this.duration);
    this.color.mixHSL(this.fromHSL, this.toHSL, t);
    this.emit("onUpdate", this);
  };
}
