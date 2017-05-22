import fp from 'lodash/fp';
import CanvasContext from './CanvasContext';
import glMatrix from 'gl-matrix';

const {vec2, mat3} = glMatrix;

const renderContext = {
  canvas: null
};

export default render;

export function registerCanvas (state, action) {
  renderContext.canvas = action.payload;
}

export function deregisterCanvas (action) {
  if (renderContext.canvas === action.payload) {
    renderContext.canvas = null;
  }
}

function render (state) {
  if (renderContext.canvas) {
    let {canvas} = renderContext;
    let rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);

    let {width, height} = canvas;
    let drawContext = canvas.getContext('2d');
    let instanceContext = new CanvasContext(drawContext);
    let transform = createLayoutTransform(state, width, height);

    instanceContext.useTransform(transform);

    instanceContext.drawGrid();
  }
}

function createLayoutTransform (state, width, height) {
  const transform = mat3.create();

  // unit scale assumes 96dpi
  const unitScale = (96 / 25.4);
  const unitScaleX = 1/(width/unitScale);
  const unitScaleY = 1/(height/unitScale);

  mat3.translate(transform, transform, vec2.fromValues(0.5, 0.5));
  mat3.scale(transform, transform, vec2.fromValues(unitScaleX, unitScaleY))

  return transform;
}
