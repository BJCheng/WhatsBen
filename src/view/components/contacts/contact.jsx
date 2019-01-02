import React from 'react';
import Thumbnail from '../header/thumbnail.jsx';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const capsName = this.props.contact.name.charAt(0).toUpperCase() + this.props.contact.name.slice(1);
    return (
      <div className='contact' onClick={this.handleOnContactClick}>
        <Thumbnail icon='smile' />
        <div className='name'>{capsName}</div>
        {this.renderLastSeen()}
      </div>
    );
  }

  handleOnContactClick = (event) => {
    this.props.onContactClick(this.props.contact.id);
  }

  renderLastSeen = () => {
    if (this.props.contact.lastSeen)
      return <div className='last-seen'>{new Date(parseInt(this.props.contact.lastSeen)).toLocaleDateString()}</div>;
  }
}