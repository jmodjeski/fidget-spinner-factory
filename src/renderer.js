import fp from 'lodash/fp';
import ContextWrapper from './CanvasContext';

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
    let rect = renderContext.canvas.parentElement.getBoundingClientRect();
    renderContext.canvas.width = rect.width;
    renderContext.canvas.height = rect.height;

    let context = renderContext.canvas.getContext('2d');
    let instanceContext = fp.set(renderContext)('canvas')(new ContextWrapper(context));
    instanceContext.drawGrid();
  }
}
