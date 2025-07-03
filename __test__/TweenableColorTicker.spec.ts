import { afterEach, describe, expect, test } from "vitest";
import { TweenableColorTicker } from "../src/index.js";

describe("TweenableColor", () => {
  afterEach(() => {
    TweenableColorTicker.stop();
    TweenableColorTicker.ticker.removeAllListeners("raf");
    TweenableColorTicker.update(0);
  });

  test("start", () => {
    expect(TweenableColorTicker.rafID).toBeUndefined();
    TweenableColorTicker.start();
    expect(TweenableColorTicker.rafID).toBeTruthy();
  });

  test("stop", () => {
    expect(TweenableColorTicker.rafID).toBeUndefined();
    TweenableColorTicker.stop();
    expect(TweenableColorTicker.rafID).toBeUndefined();
  });
});
