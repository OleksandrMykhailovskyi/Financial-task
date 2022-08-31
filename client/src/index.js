import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from 'redux'
import rootReducer from "./redux/reducers/reducers";
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
