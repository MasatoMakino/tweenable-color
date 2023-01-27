import EventEmitter from "eventemitter3";

export class TweenableColorTicker {
  static ticker: EventEmitter<"raf", number> = new EventEmitter();
  static rafID?: number;
  static start(now?: number): void {
    if (!this.rafID) {
      this.rafCallback(now ?? performance.now());
    }
  }

  static stop(): void {
    if (this.rafID) {
      cancelAnimationFrame(this.rafID);
      this.rafID = undefined;
    }
  }

  static update(ms: number): void {
    this.ticker.emit("raf", ms);
  }

  static rafCallback = (ms: number) => {
    this.update(ms);
    this.rafID = requestAnimationFrame(this.rafCallback);
  };
}
