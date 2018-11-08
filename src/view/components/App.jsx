import React from 'react';
import Recipient from './recipient/recipient.jsx';
import MessageList from './message-list/message-list.jsx';
import InputContainer from './input/input-container.jsx';
// import './normalize.scss';

export default () => {
  return (
    <div>
      <Recipient />
      <MessageList />
      <InputContainer />
    </div>
  );
};