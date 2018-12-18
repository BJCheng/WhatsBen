import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='modal-outer'>
        <div onClick={e => e.stopPropagation()} className='modal-inner'>
          <div className='modal-message'>{this.props.modal.message}</div>
          <input onChange={this.props.onChangeName} value={this.props.name} type='text'/>
          <button onClick={this.props.onModalSubmit}>Go</button>
        </div>
      </div>
    );
  }
}