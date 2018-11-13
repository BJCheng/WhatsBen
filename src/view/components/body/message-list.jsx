import React from 'react';
import Message from './Message.jsx';

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.lastMessageRef = React.createRef();
    this.renderMessage = this.renderMessage.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom('instant');
  }

  componentDidUpdate() {
    this.scrollToBottom('smooth');
  }

  scrollToBottom(behavior) {
    this.lastMessageRef.current.scrollIntoView({ behavior });
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
        <div ref={this.lastMessageRef}></div>
      </div>
    );
  }
}