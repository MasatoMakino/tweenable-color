import { TweenableHSL, TweenableColorTicker } from "../src";

describe("TweenableHSL", () => {
  beforeEach(() => {
    TweenableColorTicker.ticker.removeAllListeners("raf");
    TweenableColorTicker.update(0);
  });

  test("change black to white", () => {
    const color = new TweenableHSL();
    color.change(255, 255, 255, 0.0, 1, { startTime: 0 });

    TweenableColorTicker.update(0.5);
    expect(color.getAttribute()).toEqual([0.5, 0.5, 0.5, 0.5]);

    TweenableColorTicker.update(1);
    expect(color.getAttribute()).toEqual([1, 1, 1, 0.0]);
  });

  test("change h:0 to h:180", () => {
    const color = new TweenableHSL(255, 0, 0);
    color.change(0, 255, 255, 1, 1, { startTime: 0 });

    TweenableColorTicker.update(0.5);
    expect(color.getAttribute()[0]).toBeCloseTo(0.5);
    expect(color.getAttribute()[1]).toBeCloseTo(1.0);
    expect(color.getAttribute()[2]).toBeCloseTo(0);

    TweenableColorTicker.update(1);
    expect(color.getAttribute()[0]).toBeCloseTo(0.0);
    expect(color.getAttribute()[1]).toBeCloseTo(1.0);
    expect(color.getAttribute()[2]).toBeCloseTo(1.0);
    expect(color.getCSSStyle()).toEqual("rgba(0,255,255,1)");
  });
});
