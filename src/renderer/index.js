import fp from 'lodash/fp';
import CanvasContext from '../CanvasContext';
import glMatrix from 'gl-matrix';
import * as globalEvents from '../global-events';

const {mat3, vec2} = glMatrix;

const renderContext = {
  canvas: null,
  subscriptions: []
};

export default render;

export function registerCanvas (state, action) {
  let subscriptions = [];
  let canvas = action.payload;

  renderContext.canvas = canvas;

  subscribePan(renderContext.subscriptions);

  renderContext.canvas.addEventListener('onwheel', (e) => e.preventDefault());
  renderContext.canvas.addEventListener('oncontextmenu', (e) => e.preventDefault());
}

export function deregisterCanvas (action) {
  if (renderContext.canvas === action.payload) {
    renderContext.canvas = null;
    renderContext.unsubscribe();
  }
}

export function registerDispatcher (dispatcher) {
  renderContext.dispatcher = {
    panX: (payload) => dispatcher({type: 'PAN_X', payload}),
    panY: (payload) => dispatcher({type: 'PAN_Y', payload})
  };
}

function subscribePan (subscriptions) {
  let {canvas} = renderContext;
  let leftDrag = globalEvents.leftDrag(canvas);
  subscriptions.push(leftDrag.subscribe(pan));
  subscriptions.push(leftDrag.last().subscribe(endPan));
}

function computePan (state, e) {
  const panX = (e.destX - e.srcX) / renderContext.canvas.width;
  const panY = (e.destY - e.srcY) / renderContext.canvas.height;

  return [
    (state.panX || 0) + panX,
    (state.panY || 0) + panY
  ];
}

function pan (e) {
  let [panX, panY] = computePan(renderContext.lastState, e);
  let nextState = renderContext.lastState;
  nextState = fp.set('panX', panX, nextState);
  nextState = fp.set('panY', panY, nextState);
  uncheckedRender(nextState);
}

function endPan (e) {
  let [panX, panY] = computePan(renderContext.lastState, e);
  renderContext.dispatcher.panX(panX);
  renderContext.dispatcher.panY(panY);
  subscribePan(renderContext.subscriptions);
}

function render (state) {
  renderContext.lastState = state;
  if (renderContext.canvas) {
    uncheckedRender(state);
  }
}

function uncheckedRender (state) {
  let {canvas} = renderContext;
  let rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * (window.devicePixelRatio || 1);
  canvas.height = rect.height * (window.devicePixelRatio || 1);

  let {width, height} = canvas;
  let drawContext = canvas.getContext('2d');
  let instanceContext = new CanvasContext(drawContext);
  let transform = createLayoutTransform(width, height);
  let viewTransform = computeViewTransform(state.panX || 0, state.panY || 0);

  mat3.multiply(transform, viewTransform, transform);

  instanceContext.useTransform(transform);

  renderGrid(instanceContext, transform, state);
}

function computeViewTransform (panX, panY) {
  let viewMatrix = mat3.create();
  let pan = vec2.fromValues(panX, panY);

  mat3.translate(viewMatrix, viewMatrix, pan);

  return viewMatrix;
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
