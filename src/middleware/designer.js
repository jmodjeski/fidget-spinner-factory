import * as renderer from '../renderer';

export default (store) => (next) => (action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case 'REGISTER_DESIGNER':
      renderer.registerCanvas(store.getState(), action);
      break;
    case 'DEREGISTER_DESIGNER':
      renderer.deregisterCanvas(action);
      break;
  }

  return next(action);
}