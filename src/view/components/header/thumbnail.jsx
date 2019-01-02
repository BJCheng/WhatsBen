import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class thumbnail extends React.Component {
  render() {
    return <FontAwesomeIcon icon={this.props.icon} className='thumbnail' />;
  }
}