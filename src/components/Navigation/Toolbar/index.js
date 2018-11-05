import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import DrowerToggle from '../DrowerToggle';

const Toolbar = (props) => {
  return (
    <header className={classes.toolbar}>
      <Logo />
      <DrowerToggle clicked={props.drawerToggleClicked}/>
      <nav className={classes.desktopOnly}>
        <NavigationItems isAuth={props.isAuth}/>
      </nav>
    </header>
  );
};

export default Toolbar;
