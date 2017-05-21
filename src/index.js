import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as redux from 'redux';
import reducer from './reducers';
import * as reduxLogger from 'redux-logger'

const {createStore, applyMiddleware} = redux;
const {createLogger} = reduxLogger;
const middlewares = []
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed: true
  });
  middlewares.push(logger);  
}
const store = applyMiddleware(...middlewares)(createStore)(reducer);
ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
