import React from 'react';
import { connect } from 'react-redux';
import HeaderContainer from './header/header-container.jsx';
import BodyContainer from './body/body-container.jsx';
import FooterContainer from './footer/footer-container.jsx';
import Modal from './Modal.jsx';
import './styles/app.scss';
import {
  fetchToUser, setFromUser, renderModalWithMsg,
  closeModal, modalChangeName, modalSubmit, setToId
} from '../actions';
import LocalStorage from '../utils/local-storage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderModal = this.renderModal.bind(this);
  }

  componentDidMount() {
    const { toName } = this.props.match.params;
    this.props.setToId(toName);
    this.props.initiateApp();
  }

  render() {
    return (
      <div style={{ height: '100%', backgroundColor: '#F2F2F2' }}>
        {this.renderChat()}
        {this.renderModal()}
        {this.renderLoading()}
      </div>
    );
  }

  renderModal() {
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
    if (!this.props.chatReady)
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
    if (this.props.chatReady)
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
  chatReady: state.chatReady
});

const mapDispatchToProps = (dispatch) => ({
  initiateApp: () => {
    const fromUserObj = LocalStorage.getObj('from');
    if (!fromUserObj) {
      dispatch(renderModalWithMsg('It seems to be your first time here, please tell us your preferrable way to be called.'));
      return;
    }
    dispatch(setFromUser(fromUserObj));
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
    dispatch(modalSubmit())
  }
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(App);