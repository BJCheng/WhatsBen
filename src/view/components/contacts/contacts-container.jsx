import React from 'react';
import { connect } from 'react-redux';
import { fetchContacts } from '../../actions/contacts';
import Contact from './contact.jsx';
import LocalStorage from '../../utils/local-storage';
import { setFromUser } from '../../actions/index';
import { setAuth } from '../../actions/auth';

class ContactsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initiateContacts();
    // this.props.fetchContacts();
  }

  render() {
    return this.props.contacts.map(contact => (
      <Contact key={contact.id} contact={contact} />
    ));
  }
}

const mapStateToProps = (state) => ({
  contacts: state.contacts
});

const mapDispatchToProps = (dispatch) => ({
  initiateContacts: () => {
    const auth = LocalStorage.getObj('auth') || {};
    dispatch(setAuth(auth));
    const from = LocalStorage.getObj('from') || {};
    dispatch(setFromUser(from));
    dispatch(fetchContacts(from.id));
    // console.log('!!!!!!!!!!!end of contacts container!!!!!!!!!!!');
    // console.log(`!!!!!!!!!!!from id in local storage: ${from.id}!!!!!!!!!!!`);
  },
  fetchContacts: () => {
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);