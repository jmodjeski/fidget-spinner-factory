import glMatrix from 'gl-matrix';

const {vec2, mat3} = glMatrix;

export default class CanvasContext {
  constructor (drawContext) {
    this.width = drawContext.canvas.width;
    this.height = drawContext.canvas.height;
    this.transform = mat3.create();
    this.drawContext = drawContext;

    this.scalerTransform = mat3.create();
    this.unitTransform = mat3.create();
    this.viewTransform = mat3.create();

    mat3.fromScaling(this.scalerTransform, vec2.fromValues(this.width, this.height));
  }

  useTransforms (viewMatrix, unitMatrix) {
    mat3.multiply(this.unitTransform, unitMatrix, this.scalerTransform);
    mat3.multiply(this.viewTransform, viewMatrix, unitMatrix);
    mat3.multiply(this.viewTransform, this.scalerTransform, this.viewTransform);
  }

  transformToNative (x, y) {
    let vec = vec2.fromValues(x, y);
    return vec2.transformMat3(vec, vec, this.viewTransform);
  }

  transformUnitToNative (x, y) {
    let vec = vec2.fromValues(x, y);
    return vec2.transformMat3(vec, vec, this.unitTransform);
  }

  drawGrid (rows, columns, size) {
    const {height, width} = this;
    const mid = this.transformToNative(0, 0);

    this.drawContext.beginPath();
    this.drawContext.moveTo(mid[0], 0);
    this.drawContext.lineTo(mid[0], height);

    this.drawContext.moveTo(0, mid[1]);
    this.drawContext.lineTo(width, mid[1]);

    this.drawContext.strokeStyle = 'blue';
    this.drawContext.lineWidth = 0.25;
    this.drawContext.stroke();

    this.drawContext.beginPath();
    for (let r = 0; r < rows; r++) {
      let p1 = this.transformToNative(size * r, 0);
      let p2 = this.transformToNative(-size * r, 0);
      this.drawContext.moveTo(p1[0], 0);
      this.drawContext.lineTo(p1[0], height);
      this.drawContext.moveTo(p2[0], 0);
      this.drawContext.lineTo(p2[0], height);
    }
    for (let c = 0; c < columns; c++) {
      let p1 = this.transformToNative(0, size * c);
      let p2 = this.transformToNative(0, -size * c);
      this.drawContext.moveTo(0, p1[1]);
      this.drawContext.lineTo(width, p1[1]);
      this.drawContext.moveTo(0, p2[1]);
      this.drawContext.lineTo(width, p2[1]);
    }

    this.drawContext.strokeStyle = 'green';
    this.drawContext.lineWidth = 0.25;
    this.drawContext.stroke();
  }

  beginPath () {
    this.drawContext.beginPath();
  }

  stroke (color, width) {
    this.drawContext.strokeStyle = color;
    this.drawContext.lineWidth = width;
    this.drawContext.stroke();
  }

  fill (color, fillRule) {
    this.drawContext.fillStyle = color;
    this.drawContext.fill(fillRule);
  }

  drawEllipse(x, y, radiusX, radiusY) {
    let radii = this.transformUnitToNative(radiusX, radiusY);
    let center = this.transformToNative(x, y);
    this.drawContext.ellipse(center[0], center[1], radii[0], radii[1], 360 * Math.PI/180, 0, 360 * Math.PI/180);
  }
}