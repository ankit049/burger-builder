import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItems.css';

const NavigationItems = (props) => {
  return (
    <ul className={classes.navigationItems}>
      <li className={classes.navigationItem}>
        <NavLink
          exact
          activeClassName={classes.active}
          to="/" >Burger Builder</NavLink>
      </li>

      {props.isAuth
        ?
        (
          <li className={classes.navigationItem}>
            <NavLink
              activeClassName={classes.active}
              to="/orders" >Orders</NavLink>
          </li>
        )
        : null
      }

      {props.isAuth
        ?
        (
          <li className={classes.navigationItem}>
            <NavLink
              activeClassName={classes.active}
              to="/logout" >Logout</NavLink>
          </li>
        )
        :
        (
          <li className={classes.navigationItem}>
            <NavLink
              activeClassName={classes.active}
              to="/auth" >Authenticate</NavLink>
          </li>
        )
      }

    </ul>
  );
}

export default NavigationItems;
