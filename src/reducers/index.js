import * as redux from 'redux';
import makeReducer from './make-reducer';
import project from './project/index';
import * as panX from './pan-x';
import * as panY from './pan-y';

const {combineReducers} = redux;

export default combineReducers({
  panX: makeReducer(panX),
  panY: makeReducer(panY),
  project
});
