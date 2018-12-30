import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import LocalStorage from '../utils/local-storage';
import { setAuth } from '../actions/auth';
import { isObjectEmpty } from '../utils/helpers';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (isObjectEmpty(this.props.auth))
      return <Redirect to='/login' />;
    return <div>app</div>;
  }

  componentDidMount() {
    this.props.initiateApp();
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  contacts: state.contacts
});

const mapDispatchToProps = (dispatch) => ({
  initiateApp: () => {
    const auth = LocalStorage.getObj('auth') || {};
    dispatch(setAuth(auth));
  },

  fetchContacts: () => { }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);