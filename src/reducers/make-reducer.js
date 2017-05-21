import fp from 'lodash/fp';

const actionTypeCase = fp.flow(fp.snakeCase, (name) => name.toUpperCase());
const withoutInitialState = fp.omitBy((value, key) => key === 'initialState');
const actionMappedHandlers = fp.flow(withoutInitialState, fp.mapKeys(actionTypeCase));

export default (sourceHandlers) => (
  (initialState) => (handlers) => (state, action) => {
    const handler = handlers[action.type] || ((state) => state);
    const currentState = typeof state === 'undefined'
      ? initialState
      : state;
    return handler(currentState, action);
  }
)(sourceHandlers.initialState)(actionMappedHandlers(sourceHandlers));
