import React from 'react';
import HeaderContainer from './header/header-container.jsx';
import BodyContainer from './body/body-container.jsx';
import FooterContainer from './footer/footer-container.jsx';
import './styles/app.scss';

export default () => {
  return (
    <div className='app'>
      <HeaderContainer />
      <BodyContainer />
      <FooterContainer />
    </div>
  );
};