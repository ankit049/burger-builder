import React from 'react';
import logo from '../../assests/img/logo.png';
import classes from './Logo.css';

const Logo = (props) => {
  return (
    <div className={classes.logo}>
      <img src={logo} alt="logo"/>
    </div>
  );
}

export default Logo;
