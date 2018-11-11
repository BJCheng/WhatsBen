import React, {Component} from 'react';

export default class Message extends Component{
  render(){
    return (
      <div className='message'>{this.props.text}</div>
    );
  }
}