import React from 'react';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>{this.props.contact.name}</div>
        {this.renderLastSeen()}
      </div>
    );
  }

  renderLastSeen = () => {
    if (this.props.contact.lastSeen)
      return <div>{new Date(parseInt(this.props.contact.lastSeen)).toLocaleDateString()}</div>;
  }
}