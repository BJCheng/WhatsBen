import React from 'react';
import { connect } from 'react-redux';
import { fetchContacts } from '../../actions/contacts';
import Contact from './contact.jsx';
import LocalStorage from '../../utils/local-storage';
import { setFromUser, setToId, fetchToUser, fetchMessagesBetween } from '../../actions/index';
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
    return (
      <div className='contacts-container'>
        {
          this.props.contacts.map(contact => (
            <Contact key={contact.id} contact={contact} onContactClick={this.props.onContactClick} />
          ))
        }
      </div>
    );
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
  },
  onContactClick: (selectedToId) => {
    dispatch(setToId(selectedToId));
    dispatch(fetchToUser());
    dispatch(fetchMessagesBetween);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);