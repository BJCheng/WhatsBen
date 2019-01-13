import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const baseImgUrl = '/build/view/images/favicon.png';
    const imgUrl = process.env.NODE_ENV === 'production' ? '/WhatsBen' + baseImgUrl : baseImgUrl;
    return (
      <div className='modal-outer'>
        <form onClick={e => e.stopPropagation()} className='modal-inner'>
          <img className='favicon' src={imgUrl} />
          <span>WhatsBen</span>
          <div className='modal-message'>{this.props.modal.message}</div>
          <input type='text' value={this.props.name} ref={this.inputRef} onChange={this.props.onChangeName} />
          <button onClick={this.props.onModalSubmit}>Go</button>
        </form>
      </div>
    );
  }
}