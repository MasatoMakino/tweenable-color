import TWEEN from "@tweenjs/tween.js";
import { TweenableColor } from "../src";
import * as FakeTimers from "@sinonjs/fake-timers";

describe("TweenableColor", () => {
  const clock = FakeTimers.install();

  beforeEach(() => {
    TWEEN.removeAll();
    TWEEN.update(0);
  });

  test("new TweenableColor", () => {
    const color = new TweenableColor();
    expect(color).toBeTruthy();
  });

  test("clone", () => {
    const color = new TweenableColor();
    const clone = color.clone();

    expect(clone).toBeTruthy();
    expect(clone.getAttribute()).toEqual([0, 0, 0, 1]);

    color.change(255, 255, 255, 1.0, 1, { startTime: 0 });
    TWEEN.update(1);

    expect(color.getAttribute()).toEqual([1, 1, 1, 1]);
    expect(clone.getAttribute()).toEqual([0, 0, 0, 1]);
  });
});
