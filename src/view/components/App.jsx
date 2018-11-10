import React from 'react';
import Recipient from './header/recipient.jsx';
import BodyContainer from './body/body-container.jsx';
import FooterContainer from './footer/footer-container.jsx';
// import './normalize.scss';

export default () => {
  return (
    <div>
      <Recipient />
      <BodyContainer />
      <FooterContainer />
    </div>
  );
};