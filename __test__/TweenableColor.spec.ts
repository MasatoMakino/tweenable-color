import { TweenableColor, TweenableColorTicker } from "../src/index.js";

describe("TweenableColor", () => {
  let updateCallback = jest.fn();
  let completeCallback = jest.fn();

  beforeEach(() => {
    updateCallback = jest.fn();
    completeCallback = jest.fn();
    TweenableColorTicker.ticker.removeAllListeners("raf");
    TweenableColorTicker.update(0);
  });

  test("new TweenableColor", () => {
    const color = new TweenableColor();
    expect(color).toBeTruthy();
  });

  test("tween", () => {
    const color = new TweenableColor();
    expect(color.getAttribute()).toEqual([0, 0, 0, 1]);
    color.on("onUpdate", updateCallback);
    color.change(255, 255, 255, 1.0, 1, { startTime: 0 });
    TweenableColorTicker.update(1);
    expect(color.getAttribute()).toEqual([1, 1, 1, 1]);
    expect(updateCallback).toBeCalled();
  });

  test("skip tween", () => {
    const color = new TweenableColor(0, 0, 0, 1);
    color.on("onUpdate", updateCallback);
    color.change(0, 0, 0, 1.0, 1, { startTime: 0 });
    TweenableColorTicker.update(1);
    expect(color.getAttribute()).toEqual([0, 0, 0, 1]);
    expect(updateCallback).not.toBeCalled();
  });

  test("complete", () => {
    const color = new TweenableColor();
    color.on("onUpdate", updateCallback);
    color.on("onComplete", completeCallback);
    color.change(255, 255, 255, 1.0, 1, { startTime: 0 });

    TweenableColorTicker.update(1);
    expect(color.getAttribute()).toEqual([1, 1, 1, 1]);
    expect(updateCallback).toBeCalledTimes(1);
    expect(completeCallback).toBeCalledTimes(0);

    TweenableColorTicker.update(1.000001);
    expect(color.getAttribute()).toEqual([1, 1, 1, 1]);
    expect(updateCallback).toBeCalledTimes(2);
    expect(completeCallback).toBeCalledTimes(1);

    TweenableColorTicker.update(1000);
    expect(updateCallback).toBeCalledTimes(2);
    expect(completeCallback).toBeCalledTimes(1);
  });

  test("clone", () => {
    const color = new TweenableColor();
    const clone = color.clone();

    expect(clone).toBeTruthy();
    expect(clone.getAttribute()).toEqual([0, 0, 0, 1]);

    color.change(255, 255, 255, 1.0, 1, { startTime: 0 });
    TweenableColorTicker.update(1);
    expect(clone.getAttribute()).toEqual([0, 0, 0, 1]);
  });

  test("getAlpha", () => {
    const color = new TweenableColor();
    expect(color.getAlpha()).toEqual("1");

    color.change(255, 255, 255, 0.0, 1, { startTime: 0 });
    TweenableColorTicker.update(0.5);
    expect(color.getAlpha()).toEqual("0.5");

    TweenableColorTicker.update(1.0);
    expect(color.getAlpha()).toEqual("0");
  });

  test("getCSSStyle and CSSColor", () => {
    const color = new TweenableColor();
    expect(color.getCSSStyle()).toEqual("rgba(0,0,0,1)");
    expect(color.getCSSColor()).toEqual("rgb(0,0,0)");

    const white = new TweenableColor(255, 255, 255);
    expect(white.getCSSStyle()).toEqual("rgba(255,255,255,1)");
    expect(white.getCSSColor()).toEqual("rgb(255,255,255)");

    const half = new TweenableColor(200.4, 200.5, 200.6);
    expect(half.getCSSStyle()).toEqual("rgba(200,201,201,1)");
    expect(half.getCSSColor()).toEqual("rgb(200,201,201)");
  });
});
