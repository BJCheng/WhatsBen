import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageList from './message-list.jsx';

class BodyContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='body-container' ref={this.bodyContainerRef}>
        <MessageList messages={this.props.messages} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.body.messages
});

export default connect(
  mapStateToProps
)(BodyContainer);