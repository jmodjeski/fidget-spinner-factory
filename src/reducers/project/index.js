import makeReducer from '../make-reducer';
import * as redux from 'redux';
import * as core from './core';
import * as meta from './meta';

const {combineReducers} = redux;

export default combineReducers({
  core: makeReducer(core),
  meta: makeReducer(meta)
});
