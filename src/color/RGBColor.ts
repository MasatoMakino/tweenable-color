import Color from "color";
import { HSLColor } from "./HSLColor";

export class RGBColor {
  constructor(
    public r: number = 0,
    public g: number = 0,
    public b: number = 0,
    public alpha: number = 1.0
  ) {}

  static fromColor(color: Color): RGBColor {
    return new RGBColor(
      color.red(),
      color.green(),
      color.blue(),
      color.alpha()
    );
  }
  clone(): RGBColor {
    return new RGBColor(this.r, this.g, this.b, this.alpha);
  }

  set(rgba: RGBColor): void {
    this.r = rgba.r;
    this.g = rgba.g;
    this.b = rgba.b;
    this.alpha = rgba.alpha;
  }

  setRGBA(r: number, g: number, b: number, alpha: number): void {
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = alpha;
  }

  mix(from: RGBColor, to: RGBColor, t: number): void {
    const rt = 1 - t;
    this.r = to.r * t + from.r * rt;
    this.g = to.g * t + from.g * rt;
    this.b = to.b * t + from.b * rt;
    this.alpha = to.alpha * t + from.alpha * rt;
  }

  equal(rgba: RGBColor): boolean {
    return (
      this.r == rgba.r &&
      this.g == rgba.g &&
      this.b == rgba.b &&
      this.alpha == rgba.alpha
    );
  }

  mixHSL(from: HSLColor, to: HSLColor, t: number): void {
    const rt = 1 - t;

    const hsl = new HSLColor();
    hsl.h = to.h * t + from.h * rt;
    hsl.s = to.s * t + from.s * rt;
    hsl.l = to.l * t + from.l * rt;
    hsl.a = to.a * t + from.a * rt;

    this.set(hsl.toRGB());
  }
}
