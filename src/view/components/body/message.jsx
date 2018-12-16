import React from 'react';

export default class Message extends React.Component {
  render() {
    const timeString = this.props.serverReceiveTime ? new Date(this.props.serverReceiveTime).toLocaleTimeString() : '';
    const className = `message ${this.props.from === this.props.loginUser.id ? 'from': 'to'}`;
    return (
      <div className={className}>{this.props.text}, {timeString}</div>
    );
  }
}