import React from 'react';
import Message from './Message.jsx';

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.lastMessageRef = React.createRef();
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.props.fetchMessages();
    this.scrollToBottom('instant');
  }

  componentDidUpdate() {
    this.scrollToBottom('smooth');
  }

  renderMessage = messages => {
    return messages.map(message => {
      return <Message key={message.sendTime} {...message} loginUser={this.props.from} />;
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

  scrollToBottom(behavior) {
    this.lastMessageRef.current.scrollIntoView({ behavior });
  }
}