import React from 'react';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop';
import Aux from '../../../hoc';

const SideDrawer = (props) => {
  let attachedClasses = [classes.sideDrawer, classes.close];
  if(props.open) {
    attachedClasses = [classes.sideDrawer, classes.open];
  }

  return (
    <Aux>
      <Backdrop
        clicked={props.closed}
        show={props.open} />
      <div className={attachedClasses.join(' ')}>
        <Logo />
        <nav>
          <NavigationItems isAuth={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  );
}

export default SideDrawer;
