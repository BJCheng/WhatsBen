import React from 'react';
import Recipient from './header/recipient.jsx';
import MessageList from './body/messag-list.jsx';
import Input from './footer/input.jsx';
// import './normalize.scss';

export default () => {
  return (
    <div>
      <Recipient />
      <MessageList />
      <Input />
    </div>
  );
};