import Color from "color";

export class RGBColor {
  constructor(
    public r: number = 0,
    public g: number = 0,
    public b: number = 0,
    public alpha: number = 1.0
  ) {}

  static fromColor(color: Color): RGBColor {
    const rgb = new RGBColor();
    rgb.r = color.red();
    rgb.g = color.green();
    rgb.b = color.blue();
    rgb.alpha = color.alpha();
    return rgb;
  }
  clone(): RGBColor {
    return new RGBColor(this.r, this.g, this.b, this.alpha);
  }
}