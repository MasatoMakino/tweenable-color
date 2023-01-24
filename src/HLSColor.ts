import Color from "color";
import { RGBColor } from "./RGBColor";

export class HLSColor {
  h: number = 0;
  l: number = 0;
  s: number = 0;
  a: number = 1.0;

  static fromColor(color: Color): HLSColor {
    const hls = new HLSColor();
    hls.h = color.hue();
    hls.l = color.lightness();
    hls.s = color.saturationl();
    hls.a = color.alpha();
    return hls;
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
