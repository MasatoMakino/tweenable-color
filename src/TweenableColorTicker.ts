import EventEmitter from "eventemitter3";

const ticker: EventEmitter<"raf", number> = new EventEmitter();
let _rafID: number | undefined;

function getRafID(): number | undefined {
  return _rafID;
}

function start(now?: number): void {
  if (!_rafID) {
    rafCallback(now ?? performance.now());
  }
}

function stop(): void {
  if (_rafID) {
    cancelAnimationFrame(_rafID);
    _rafID = undefined;
  }
}

function update(ms: number): void {
  ticker.emit("raf", ms);
}

function rafCallback(ms: number): void {
  update(ms);
  _rafID = requestAnimationFrame(rafCallback);
}

export const TweenableColorTicker = {
  ticker,
  get rafID() {
    return getRafID();
  },
  start,
  stop,
  update,
  rafCallback,
};
