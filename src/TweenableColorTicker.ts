import EventEmitter from "eventemitter3";

export class TweenableColorTicker {
  static ticker: EventEmitter<"raf", number> = new EventEmitter();

  static get rafID() {
    return this._rafID;
  }
  static _rafID?: number;
  static start(now?: number): void {
    if (!this._rafID) {
      this.rafCallback(now ?? performance.now());
    }
  }

  static stop(): void {
    if (this._rafID) {
      cancelAnimationFrame(this._rafID);
      this._rafID = undefined;
    }
  }

  static update(ms: number): void {
    this.ticker.emit("raf", ms);
  }

  static rafCallback = (ms: number) => {
    this.update(ms);
    this._rafID = requestAnimationFrame(this.rafCallback);
  };
}
