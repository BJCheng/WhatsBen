import React, { Component } from 'react';
import { connect } from 'react-redux';
import Recipient from './recipient.jsx';
import Thumbnail from './thumbnail.jsx';

class HeaderContainer extends Component {
  render() {
    return (
      <div className='header-container'>
        <Thumbnail />
        <Recipient />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(
  mapStateToProps
)(HeaderContainer);