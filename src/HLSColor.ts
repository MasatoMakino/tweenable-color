import Color from "color";
import { RGBColor } from "./RGBColor";

export class HLSColor {
  h: number = 0;
  l: number = 0;
  s: number = 0;
  a: number = 1.0;

  fromColor(color: Color): HLSColor {
    this.h = color.hue();
    this.l = color.lightness();
    this.s = color.saturationl();
    this.a = color.alpha();
    return this;
  }

  toRGB(): RGBColor {
    const hslObj = Color.hsl({
      h: this.h,
      l: this.l,
      s: this.s,
      alpha: this.a,
    });
    return new RGBColor(
      hslObj.red(),
      hslObj.green(),
      hslObj.blue(),
      hslObj.alpha()
    );
  }
}
