import EventEmitter from "eventemitter3";

export class TweenableColorTicker {
  static readonly ticker: EventEmitter<"raf", number> = new EventEmitter();

  static get rafID() {
    return TweenableColorTicker._rafID;
  }
  static _rafID?: number;
  static start(now?: number): void {
    if (!TweenableColorTicker._rafID) {
      TweenableColorTicker.rafCallback(now ?? performance.now());
    }
  }

  static stop(): void {
    if (TweenableColorTicker._rafID) {
      cancelAnimationFrame(TweenableColorTicker._rafID);
      TweenableColorTicker._rafID = undefined;
    }
  }

  static update(ms: number): void {
    TweenableColorTicker.ticker.emit("raf", ms);
  }

  static rafCallback = (ms: number) => {
    this.update(ms);
    this._rafID = requestAnimationFrame(this.rafCallback);
  };
}
