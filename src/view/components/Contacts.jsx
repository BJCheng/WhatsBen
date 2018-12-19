import React from 'react';

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.contacts.map(contact => {
      return <div>{contact}</div>;
    });
  }
}