export default class CanvasContext {
  constructor (drawContext) {
    this.drawContext = drawContext;
  }

  drawGrid () {
    let width = this.drawContext.canvas.width;
    let height = this.drawContext.canvas.height;

    let midX = width / 2;
    let midY = height / 2;

    this.drawContext.beginPath();
    for(let x = midX; x > 0; x -= 10) {
      this.drawContext.moveTo(x, 0);
      this.drawContext.lineTo(x, height);
    }
    for(let x = midX + 10; x < width; x += 10) {
      this.drawContext.moveTo(x, 0);
      this.drawContext.lineTo(x, height);
    }
    for(let y = midY; y > 0; y -= 10) {
      this.drawContext.moveTo(0, y);
      this.drawContext.lineTo(width, y);
    }
    for(let y = midY + 10; y < height; y += 10) {
      this.drawContext.moveTo(0, y);
      this.drawContext.lineTo(width, y);
    }

    this.drawContext.strokeColor = 'lightblue';
    this.drawContext.strokeWidth = 0.5;
    this.drawContext.stroke();
  }
}