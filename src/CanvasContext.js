import glMatrix from 'gl-matrix';

const {vec2, mat3} = glMatrix;

export default class CanvasContext {
  constructor (drawContext) {
    this.width = drawContext.canvas.width;
    this.height = drawContext.canvas.height;
    this.transform = mat3.create();
    this.drawContext = drawContext;

    this.scaler = mat3.create();
    mat3.fromScaling(this.scaler, vec2.fromValues(this.width, this.height));
  }

  useTransform (matrix) {
    mat3.multiply(this.transform, this.scaler, matrix);
  }

  transformToNative (x, y) {
    let vec = vec2.fromValues(x, y);
    return vec2.transformMat3(vec, vec, this.transform);
  }

  drawGrid () {
    const {height, width} = this;
    const mid = this.transformToNative(0, 0);

    this.drawContext.beginPath();
    this.drawContext.moveTo(mid[0], 0);
    this.drawContext.lineTo(mid[0], height);

    this.drawContext.moveTo(0, mid[1]);
    this.drawContext.lineTo(width, mid[1]);

    this.drawContext.strokeStyle = 'blue';
    this.drawContext.strokeWidth = 0.5;
    this.drawContext.stroke();
  }
}