import React from 'react';

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>contacts:
        {
          (this.props.contacts || ['1']).map(contact => {
            return <div>{contact}</div>;
          })
        }
      </div>
    );
  }
}