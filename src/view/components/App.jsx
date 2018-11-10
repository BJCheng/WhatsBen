import React from 'react';
import Recipient from './header/recipient.jsx';
import MessageList from './body/message-list.jsx';
import InputContainer from './footer/input-container.jsx';
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