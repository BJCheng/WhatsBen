import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageList from './message-list.jsx';

class BodyContainer extends Component {
  render() {
    return <MessageList messages={this.props.messages} />;
  }
}

const mapStateToProps = (state) => ({
  messages: state.body.messages
});

export default connect(
  mapStateToProps
)(BodyContainer);