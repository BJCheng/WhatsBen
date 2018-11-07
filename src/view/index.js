import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import App from './components/App.jsx';
import './normalize.scss';
import stateLogger from './reducers/middlewares/stateLogger';

const initialState = {
  recipientHeader: undefined,
  messageBody: undefined,
  inputFooter: undefined
};
const store = createStore(rootReducer, initialState, applyMiddleware(stateLogger));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);