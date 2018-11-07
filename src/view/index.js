import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import App from './components/App.jsx';
import './normalize.scss';

const initialState = {
  recipientHeader: undefined,
  messageBody: undefined,
  inputFooter: undefined
};
const store = createStore(rootReducer, initialState);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);