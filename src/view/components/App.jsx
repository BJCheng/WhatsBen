import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import LocalStorage from '../utils/local-storage';
import { setAuth } from '../actions/auth';
import { isObjectEmpty } from '../utils/helpers';
import ContactsContainer from './contacts/contacts-container.jsx';
import { setFromUser, setupClientSocketAction } from '../actions';
import { loginReady } from '../actions/login';
import Chat from './Chat.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initiateApp();
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        {this.renderLogin()}
        {this.renderApp()}
      </div>
    );
  }

  renderLogin = () => {
    if (isObjectEmpty(this.props.auth))
      return <Redirect to='/login' />;
  }

  renderApp = () => {
    if (this.props.loginReady && this.props.to.id.length > 0) {
      return (
        <div className='app'>
          <ContactsContainer />
          <Chat auth={this.props.auth} />
        </div>
      );
    } else if (this.props.loginReady) {
      return (
        <div className='app'>
          <ContactsContainer />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  contacts: state.contacts,
  loginReady: state.login.ready,
  to: state.to
});

const mapDispatchToProps = (dispatch) => ({
  initiateApp: () => {
    const auth = LocalStorage.getObj('auth');
    dispatch(setAuth(auth));
    dispatch(loginReady(!isObjectEmpty(auth)));
    if (!isObjectEmpty(auth)) {
      dispatch(setupClientSocketAction(auth.id));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);