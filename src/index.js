import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appReducers from './reducers/reducers';

import './index.css';


let store = createStore(appReducers);

store.subscribe(()=>{
  console.log(store.getState());
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
