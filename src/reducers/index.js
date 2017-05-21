import makeReducer from './make-reducer';
import * as redux from 'redux';
import * as project from './project';

const {combineReducers} = redux;

export default combineReducers({
  project: makeReducer(project)
});
