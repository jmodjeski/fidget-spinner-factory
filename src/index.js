import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as redux from 'redux';
import reducer from './reducers';
import * as reduxLogger from 'redux-logger';
import designerMiddleware from './middleware/designer';
import renderer, * as renderConfig from './renderer/index';

const {createStore, applyMiddleware} = redux;
const {createLogger} = reduxLogger;
const middlewares = []
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed: true
  });
  middlewares.push(logger);  
}
middlewares.push(designerMiddleware);

const store = applyMiddleware(...middlewares)(createStore)(reducer);
renderConfig.registerDispatcher(store.dispatch);
store.subscribe(() => {
  renderer(store.getState());
});
ReactDOM.render(<App store={store} />, document.getElementById('root'));
// registerServiceWorker();

window.addEventListener('resize', () => renderer(store.getState()));
