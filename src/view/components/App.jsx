import React from 'react';
import Recipient from './header/recipient.jsx';
import MessageList from './body/message-list.jsx';
import FooterContainer from './footer/footer-container.jsx';
// import './normalize.scss';

export default () => {
  return (
    <div>
      <Recipient />
      <MessageList />
      <FooterContainer />
    </div>
  );
};