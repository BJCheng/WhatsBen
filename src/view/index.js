import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import './normalize.scss';
import stateLogger from './reducers/middlewares/state-logger';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGrin, faUser, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route } from 'react-router-dom';
import './images/background.png';
import thunk from 'redux-thunk';

library.add(faGrin, faUser, faChevronCircleRight);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const store = createStore(rootReducer, applyMiddleware(thunk, stateLogger));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <div style={{ height: '100%' }}>
        <Route exact path="/" component={Login} />
        <Route exact path="/:toName" component={App} />
      </div>
    </Provider>
  </BrowserRouter >,
  document.getElementById('root')
);