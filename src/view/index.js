import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import App from './components/App.jsx';
import './normalize.scss';
import stateLogger from './reducers/middlewares/state-logger';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGrin, faUser, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route } from 'react-router-dom';
import './images/background.png';
import setupSocket from './utils/setup-socket';
import thunk from 'redux-thunk';
import LocalStorage from './utils/local-storage';

const loadFromLocalStorage = () => {
  const user = LocalStorage.getObj('from');
  return { from: user };
};

library.add(faGrin, faUser, faChevronCircleRight);
setupSocket(); // TODO: after set from & to
const initialState = loadFromLocalStorage();

const Login = () => {
  return <div>login page</div>;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/:toName" component={App} />
      </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);