import React from 'react';

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.messages.length}</div>;
  }
}