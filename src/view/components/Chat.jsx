import React from 'react';
import { connect } from 'react-redux';
import HeaderContainer from './header/header-container.jsx';
import BodyContainer from './body/body-container.jsx';
import FooterContainer from './footer/footer-container.jsx';
import Modal from './Modal.jsx';
import './styles/app.scss';
import {
  fetchToUser, setFromUser, renderModalWithMsg,
  closeModal, modalChangeName, modalSubmit, setToId, setupClientSocketAction
} from '../actions';
import LocalStorage from '../utils/local-storage';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // toId came from react-router or preset by ContactsContainer
    if (this.props.match) {
      const toId = this.props.match.params.toId;
      this.props.setToId(toId);
    }
    this.props.initiateChat();
  }

  render() {
    return (
      <div className='chat-container'>
        {this.renderChat()}
        {this.renderModal()}
        {this.renderLoading()}
      </div>
    );
  }

  renderModal = () => {
    if (!this.props.modal.render)
      return;
    return (
      <Modal
        modal={{ ...this.props.modal }}
        closeModal={this.props.closeModal}
        onChangeName={this.props.onChangeName}
        onModalSubmit={this.props.onModalSubmit}
      />
    );
  }

  renderChat = () => {
    if (!this.props.chatReady || !this.props.fromReady)
      return;
    return (
      <div className='chat'>
        <HeaderContainer />
        <BodyContainer />
        <FooterContainer />
      </div>
    );
  }

  renderLoading = () => {
    if (this.props.chatReady && this.props.fromReady)
      return;
    return (
      <div className="lds-heart"><div></div></div>
    );
  }
}

const mapStateToProps = (state) => ({
  from: state.from,
  to: state.to,
  modal: state.modal,
  chatReady: state.chatReady,
  fromReady: state.fromReady,
  registeredUser: state.registeredUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initiateChat: () => {
    const fromUserObj = LocalStorage.getObj('from');
    if (!fromUserObj) {
      dispatch(renderModalWithMsg('It seems to be your first time visiting, please enter your name.'));
      return;
    }
    // only when Chat is render by App will have auth being passed
    if (!ownProps.auth) {
      dispatch(setFromUser(fromUserObj));
      dispatch(setupClientSocketAction(fromUserObj.id));
    }
    dispatch(fetchToUser());
  },
  setToId: (id) => {
    dispatch(setToId(id));
  },
  closeModal: () => {
    dispatch(closeModal());
  },
  onChangeName: (event) => {
    dispatch(modalChangeName(event.target.value));
  },
  onModalSubmit: () => {
    dispatch(modalSubmit());
  }
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Chat);