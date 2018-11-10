import React from 'react';
import HeaderContainer from './header/header-container.jsx';
import BodyContainer from './body/body-container.jsx';
import FooterContainer from './footer/footer-container.jsx';
// import './normalize.scss';

export default () => {
  return (
    <div>
      <HeaderContainer />
      <BodyContainer />
      <FooterContainer />
    </div>
  );
};