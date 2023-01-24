export class RGBColor {
  constructor(
    public r: number = 255,
    public g: number = 255,
    public b: number = 255,
    public alpha: number = 1.0
  ) {}

  clone(): RGBColor {
    return new RGBColor(this.r, this.g, this.b, this.alpha);
  }
}
