import EventEmitter from "eventemitter3";

export class TweenableColorTicker {
  static ticker: EventEmitter<"raf", number> = new EventEmitter();
  static isStart: boolean = false;
  static start(): void {
    if (!this.isStart) {
      this.rafCallback(performance.now());
      this.isStart = true;
    }
  }

  static update(ms: number): void {
    this.ticker.emit("raf", ms);
  }

  static rafCallback = (ms: number) => {
    this.update(ms);
    requestAnimationFrame(this.rafCallback);
  };
}
