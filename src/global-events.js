import Rx from 'rxjs';

const [leftMousedown, rightMousedown] =
  mouseButtonPartition(Rx.Observable.fromEvent(document, 'mousedown'));
const [leftMouseup, rightMouseup] =
  mouseButtonPartition(Rx.Observable.fromEvent(document, 'mouseup'));
const mousemove = Rx.Observable.fromEvent(document, 'mousemove');

class DragEvent {
  constructor (srcX, srcY, destX, destY) {
    this.srcX = srcX;
    this.srcY = srcY;
    this.destX = destX;
    this.destY = destY;
  }
}

function mouseButtonPartition (observable) {
  return observable
    .filter((e) => e.button === 0 || e.button === 2)
    .partition((e) => e.button === 0);
}

function dragEvents (target, downObservable, upObservable) {
  return downObservable
    .filter((e) => e.target === target)
    .flatMap((e) => {
      const {pageX, pageY, target} = e;
      const {top, left} = target.getBoundingClientRect();
      let srcX = pageX - left;
      let srcY = pageY - top;
      return mousemove.map((e) => {
        const {pageX, pageY} = e;
        let destX = pageX - left;
        let destY = pageY - top;
        return new DragEvent(srcX, srcY, destX, destY);
      });
    }).takeUntil(upObservable);
}

export function leftDrag (target) {
  return dragEvents(target, leftMousedown, leftMouseup);
}

export function rightDrag (target) {
  return dragEvents(target, rightMousedown, rightMouseup);
}
