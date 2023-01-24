import Color from "color";
import { RGBColor } from "./RGBColor";

export class HSLColor {
  h: number = 0;
  l: number = 0;
  s: number = 0;
  a: number = 1.0;

  static fromColor(color: Color): HSLColor {
    const hls = new HSLColor();
    hls.h = color.hue();
    hls.l = color.lightness();
    hls.s = color.saturationl();
    hls.a = color.alpha();
    return hls;
  }

  static fromRGBA(rgba: RGBColor): HSLColor {
    const color = Color.rgb(rgba);
    return this.fromColor(color);
  }

  toRGB(): RGBColor {
    const hslObj = this.toColor();
    return new RGBColor(
      hslObj.red(),
      hslObj.green(),
      hslObj.blue(),
      hslObj.alpha()
    );
  }

  private toColor(): Color {
    return Color.hsl({
      h: this.h,
      l: this.l,
      s: this.s,
      alpha: this.a,
    });
  }
  copyToRGB(rgbObj: RGBColor): void {
    const hslObj = this.toColor();
    rgbObj.r = hslObj.red();
    rgbObj.g = hslObj.green();
    rgbObj.b = hslObj.blue();
    rgbObj.alpha = hslObj.alpha();
  }
}
