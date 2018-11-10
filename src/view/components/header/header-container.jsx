import React, { Component } from 'react';
import { connect } from 'react-redux';
import Recipient from './recipient.jsx';

class HeaderContainer extends Component {
  render() {
    return <Recipient />;
  }
}

const mapStateToProps = (state) => ({

});

export default connect(
  mapStateToProps
)(HeaderContainer);