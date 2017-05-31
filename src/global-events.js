import Rx from 'rxjs';

const [leftMousedown, rightMousedown] =
  mouseButtonPartition(Rx.Observable.fromEvent(document, 'mousedown'));
const [leftMouseup, rightMouseup] =
  mouseButtonPartition(Rx.Observable.fromEvent(document, 'mouseup'));
const mousemove = Rx.Observable.fromEvent(document, 'mousemove');
const wheel = Rx.Observable.fromEvent(document, 'wheel', {passive: true});

class DragEvent {
  constructor (srcX, srcY, destX, destY) {
    this.srcX = srcX;
    this.srcY = srcY;
    this.destX = destX;
    this.destY = destY;
  }
}

class ScrollEvent {
  constructor (srcX, srcY, delta) {
    this.srcX = srcX;
    this.srcY = srcY;
    this.delta = delta;
  }
}

function mouseButtonPartition (observable) {
  return observable
    .filter((e) => e.button === 0 || e.button === 2)
    .partition((e) => e.button === 0);
}

function dragEvents (target, downObservable, upObservable) {
  const xyTranslator = targetXY(target);
  return downObservable
    .filter((e) => e.target === target)
    .flatMap((e) => {
      const {x: srcX, y: srcY} = xyTranslator(e);
      return mousemove.map((e) => {
        const {x: destX, y: destY} = xyTranslator(e);
        return new DragEvent(srcX, srcY, destX, destY);
      });
    }).takeUntil(upObservable);
}

function targetXY (target) {
  const {left, top} = target.getBoundingClientRect();
  return (e) => {
    const {pageX, pageY} = e;
    return {
      x: pageX - left,
      y: pageY - top
    };
  }
}

export function leftDrag (target) {
  return dragEvents(target, leftMousedown, leftMouseup);
}

export function rightDrag (target) {
  return dragEvents(target, rightMousedown, rightMouseup);
}

export function scrollY (target) {
  const xyTranslator = targetXY(target);
  return wheel
    .filter((e) => e.target === target)
    .bufferTime(16) // 16ms 60fps
    .filter((set) => set.length)
    .map((set) => set.reduce((e1, e2) => ({
      pageX: e1.pageX,
      pageY: e1.pageY,
      deltaY: e1.deltaY + e2.deltaY
    })))
    .map((e) => {
      const {deltaY} = e;
      const {x, y} = xyTranslator(e);
      return new ScrollEvent(x, y, deltaY);
    });
}
