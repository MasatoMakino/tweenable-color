import { Tween } from "@tweenjs/tween.js";
import { RGBColor, HSLColor } from "./color";
import { ChangeOption, TweenableColor } from "./TweenableColor";

export class TweenableHSL extends TweenableColor {
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

    const fromColor = HSLColor.fromRGBA(this.color);
    const to = HSLColor.fromRGBA(new RGBColor(toR, toG, toB, toAlpha));

    this.tween = new Tween(fromColor)
      .to(to, duration)
      .easing(changeOption.easing)
      .onUpdate(() => {
        fromColor.copyToRGB(this.color);
        this.emit("onUpdate", this);
      })
      .start(changeOption.startTime);
  }
}
