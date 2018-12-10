import React from 'react';
import HeaderContainer from './header/header-container.jsx';
import BodyContainer from './body/body-container.jsx';
import FooterContainer from './footer/footer-container.jsx';
import { connect } from 'react-redux';
import './styles/app.scss';
import { fetchToUser, setFromUser, redirectToLogin } from '../actions';
import localStorage from '../utils/local-storage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderModal = this.renderModal.bind(this);
  }

  componentWillMount() {
    const { toName } = this.props.match.params;
    this.props.fetchUsers(toName);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className='app'>
        <HeaderContainer />
        <BodyContainer />
        <FooterContainer />
        {this.renderModal()}
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
}

const mapStateToProps = (state) => ({
  from: state.from,
  to: state.to, 
  modal: state.modal
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (id) => {
    dispatch(fetchToUser(id));
    dispatch(setFromUser());
  }
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(App);