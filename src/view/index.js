import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import Chat from './components/Chat.jsx';
import Login from './components/Login.jsx';
import App from './components/App.jsx';
import './normalize.scss';
import stateLogger from './reducers/middlewares/state-logger';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGrin, faUser, faChevronCircleRight, faSmile } from '@fortawesome/free-solid-svg-icons';
import { HashRouter, Route } from 'react-router-dom';
import './images/background.png';
import thunk from 'redux-thunk';

library.add(faGrin, faUser, faChevronCircleRight, faSmile);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const store = createStore(rootReducer, applyMiddleware(thunk, stateLogger));

ReactDOM.render(
  <HashRouter >
    <Provider store={store}>
      <div style={{ height: '100%' }}>
        <Route exact path="/" component={App} />
        <Route exact path="/user/:toId" component={Chat} />
        <Route exact path="/login" component={Login} />
      </div>
    </Provider>
  </HashRouter >,
  document.getElementById('root')
);