import makeReducer from './make-reducer';

const sample = {
  initialState: {a: 'defaulted'},
  test: (state, action) => Object.assign({}, state, action.payload),
  testOne: (state, action) => state,
  testTwo: (state, action) => state,
  testThree: (state, action) => state
}

export default makeReducer(sample);
