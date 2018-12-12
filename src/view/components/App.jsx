import React from 'react';
import { connect } from 'react-redux';
import HeaderContainer from './header/header-container.jsx';
import BodyContainer from './body/body-container.jsx';
import FooterContainer from './footer/footer-container.jsx';
import './styles/app.scss';
import { fetchToUser, setFromUser } from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderModal = this.renderModal.bind(this);
  }

  componentWillMount() {
    const { toName } = this.props.match.params;
    this.props.initiateApp(toName);
  }

  componentDidMount() {

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
      <div>{this.props.modal.message}</div>
    );
  }

  renderChat = () => {
    if (!this.props.chatReady || !this.props.to.id)
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
  initiateApp: (toId) => {
    dispatch(fetchToUser(toId));
    dispatch(setFromUser());
  }
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(App);