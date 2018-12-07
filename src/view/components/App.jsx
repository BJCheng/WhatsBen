import React from 'react';
import HeaderContainer from './header/header-container.jsx';
import BodyContainer from './body/body-container.jsx';
import FooterContainer from './footer/footer-container.jsx';
import { connect } from 'react-redux';
import './styles/app.scss';
import LocalStorage from '../utils/local-storage';
import { fetchToUser, redirectToLogin } from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setFromUser = this.setFromUser.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  componentWillMount() {
    const { toName } = this.props.match.params;
    this.props.fetchUsers(toName);
  }

  componentDidMount() {
    alert(`from user: ${this.props.from}`);
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

  setFromUser() {
  }

  renderModal() {
    if (this.props.from)
      return;
    return (
      <div>modal</div>
    );
  }
}

const mapStateToProps = (state) => ({
  from: state.from,
  to: state.to
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (id) => {
    dispatch(fetchToUser(id));
  }
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(App);