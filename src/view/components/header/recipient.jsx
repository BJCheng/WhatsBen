import React from 'react';
import { connect } from 'react-redux';

class Recipient extends React.Component {
  render() {
    return (
      <div className='recipient'>
        <div>
          <span>First Name Last Name</span>
        </div>
        <div className='timestamp'>
          <span>timestamp</span>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  const { userId, firstName, lastName, timestamp } = state.header;
  return {
    userId,
    firstName,
    lastName,
    timestamp
  };
};

export default connect(
  mapStateToProps
)(Recipient);