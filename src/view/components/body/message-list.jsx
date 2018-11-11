import React from 'react';
import Message from './Message.jsx';

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage(messages) {
    return messages.map((message) => {
      return (
        <Message text={message} />
      );
    });
  }

  render() {
    return (
      <div className='message-list'>
        {this.renderMessage(this.props.messages)}
      </div>
    );
  }
}