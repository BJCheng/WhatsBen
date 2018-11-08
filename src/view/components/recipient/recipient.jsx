import React from 'react';
import { connect } from 'react-redux';

class Recipient extends React.Component {
  render() {
    return <div>Recipient</div>;
  }
}

const mapStateToProps = (state) => {
  const { userId, firstName, lastName, thumbnailUrl, timestamp } = state.recipientHeader;
  return {
    userId,
    firstName,
    lastName,
    thumbnailUrl,
    timestamp
  };
};

export default connect(
  mapStateToProps
)(Recipient);