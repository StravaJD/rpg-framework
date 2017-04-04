import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import appReducers from './reducers';
import tileTrigger from './middleware/tileTrigger';

import './index.css';


let store = createStore(appReducers, applyMiddleware(tileTrigger));

store.subscribe(()=>{
  console.log(store.getState());
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
