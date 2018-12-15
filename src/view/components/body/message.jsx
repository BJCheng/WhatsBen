import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    return (
      <div className='message'>{this.props.text}, {this.props.timeString}</div>
    );
  }
}