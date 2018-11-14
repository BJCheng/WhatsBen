import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SendButton extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <FontAwesomeIcon icon="chevron-circle-right" className='send-button' />
      </div>

    );
  }
}