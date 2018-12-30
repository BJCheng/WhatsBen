import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import LocalStorage from '../utils/local-storage';
import { setAuth } from '../actions/auth';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (Object.keys(this.props.auth).length === 0 && this.props.auth.constructor === Object)
      return <Redirect to='/login'/>;
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