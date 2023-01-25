import TWEEN from "@tweenjs/tween.js";
import { TweenableColor } from "../src";

describe("TweenableColor", () => {
  beforeEach(() => {
    TWEEN.removeAll();
    TWEEN.update(0);
  });

  test("new TweenableColor", () => {
    const color = new TweenableColor();
    expect(color).toBeTruthy();
  });

  test("tween", () => {
    const color = new TweenableColor();
    expect(color.getAttribute()).toEqual([0, 0, 0, 1]);

    color.change(255, 255, 255, 1.0, 1, { startTime: 0 });
    TWEEN.update(1);
    expect(color.getAttribute()).toEqual([1, 1, 1, 1]);
  });

  test("clone", () => {
    const color = new TweenableColor();
    const clone = color.clone();

    expect(clone).toBeTruthy();
    expect(clone.getAttribute()).toEqual([0, 0, 0, 1]);

    color.change(255, 255, 255, 1.0, 1, { startTime: 0 });
    TWEEN.update(1);
    expect(clone.getAttribute()).toEqual([0, 0, 0, 1]);
  });

  test("getAlpha", () => {
    const color = new TweenableColor();
    expect(color.getAlpha()).toEqual("1");

    color.change(255, 255, 255, 0.0, 1, { startTime: 0 });
    TWEEN.update(0.5);
    expect(color.getAlpha()).toEqual("0.5");

    TWEEN.update(1.0);
    expect(color.getAlpha()).toEqual("0");
  });

  test("getCSSStyle", () => {
    const color = new TweenableColor();
    expect(color.getCSSStyle()).toEqual("rgba(0,0,0,1)");

    const white = new TweenableColor(255, 255, 255);
    expect(white.getCSSStyle()).toEqual("rgba(255,255,255,1)");

    const half = new TweenableColor(200.4, 200.5, 200.6);
    expect(half.getCSSStyle()).toEqual("rgba(200,201,201,1)");
  });

  test("getCSSColor", () => {
    const color = new TweenableColor();
    expect(color.getCSSColor()).toEqual("rgb(0,0,0)");

    const white = new TweenableColor(255, 255, 255);
    expect(white.getCSSColor()).toEqual("rgb(255,255,255)");

    const half = new TweenableColor(200.4, 200.5, 200.6);
    expect(half.getCSSColor()).toEqual("rgb(200,201,201)");
  });
});
