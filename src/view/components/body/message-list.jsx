import React from 'react';
import { connect } from 'react-redux';

class MessageList extends React.Component {
  render() {
    return <div>{this.props.messages.length}</div>;
  }
}

const mapStateToProps = (state) => {
  return ({
    messages: state.messageList.messages
  });
};

export default connect(
  mapStateToProps
)(MessageList);