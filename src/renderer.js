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
    let transform = createLayoutTransform(width, height);

    instanceContext.useTransform(transform);

    renderGrid(instanceContext, transform, state);
  }
}

function renderGrid (context, transform) {
  let {width, height} = context.drawContext.canvas;
  const size = 10;
  let cellCounts = computeCellCounts(size, width, height);
  context.drawGrid(cellCounts[0], cellCounts[1], size);
}

function computeCellCounts (size, width, height) {
  let unitScale = computeUnitScaleTransform(width, height);
  let vec = vec2.fromValues(size, size);
  vec2.mul(vec, vec, unitScale);
  return [
    (width / vec[0]) >> 0,
    (height / vec[1]) >> 0,
  ];
}

function computeUnitScaleTransform (width, height) {
  // unit scale assumes 96dpi
  const unitScale = ((96 * window.devicePixelRatio) / 25.4);
  const unitScaleX = 1/(width/unitScale);
  const unitScaleY = 1/(height/unitScale);
  return vec2.fromValues(unitScaleX, unitScaleY)
}

function createLayoutTransform (width, height) {
  const transform = mat3.create();
  const unitScale = computeUnitScaleTransform(width, height);

  mat3.translate(transform, transform, vec2.fromValues(0.5, 0.5));
  mat3.scale(transform, transform, unitScale);

  return transform;
}
