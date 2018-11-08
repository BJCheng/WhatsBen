import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import App from './components/App.jsx';
import './normalize.scss';
import stateLogger from './reducers/middlewares/stateLogger';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGrin } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route } from 'react-router-dom';

library.add(faGrin);

const initialState = {
  recipientHeader: undefined,
  messageBody: undefined,
  inputFooter: undefined
};
const store = createStore(rootReducer, applyMiddleware(stateLogger));
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route path="/" component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);