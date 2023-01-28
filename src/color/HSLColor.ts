import Color from "color";
import { RGBColor } from "./RGBColor";

export class HSLColor {
  constructor(
    public h: number = 0,
    public s: number = 0,
    public l: number = 0,
    public alpha: number = 1.0
  ) {}

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
      alpha: this.alpha,
    });
  }

  set(rgbObj: RGBColor): void {
    const color = Color.rgb(rgbObj);
    this.h = color.hue();
    this.l = color.lightness();
    this.s = color.saturationl();
    this.alpha = color.alpha();
  }

  setRGBA(r: number, g: number, b: number, alpha: number): void {
    const color = Color.rgb({ r, g, b, alpha });
    this.h = color.hue();
    this.l = color.lightness();
    this.s = color.saturationl();
    this.alpha = color.alpha();
  }
}
