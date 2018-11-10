import React from 'react';

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage(messages){
    return messages.map((message)=>{
      return (
        <div>{message}</div>
      );
    });
  }

  render() {
    return this.renderMessage(this.props.messages);
  }
}