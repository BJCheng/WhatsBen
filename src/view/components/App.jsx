import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import LocalStorage from '../utils/local-storage';
import { setAuth } from '../actions/auth';
import { isObjectEmpty } from '../utils/helpers';
import ContactsContainer from './contacts/contacts-container.jsx';
import { setFromUser } from '../actions';
import { loginReady } from '../actions/login';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.initiateApp();
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
    if (this.props.loginReady) {
      return (
        <div className='app'>
          <ContactsContainer />
          <div className='chatContainer'>chat</div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  contacts: state.contacts,
  loginReady: state.login.ready
});

const mapDispatchToProps = (dispatch) => ({
  initiateApp: () => {
    const auth = LocalStorage.getObj('auth');
    dispatch(setAuth(auth));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);