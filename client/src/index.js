import "core-js";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleWare from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./reducers/index";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleWare,
  ReduxThunk
)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
  <Router>
    <App />
  </Router>
  </Provider>,
  document.getElementById('root')
);
