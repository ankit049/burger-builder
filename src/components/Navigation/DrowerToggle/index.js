import React from 'react';
import classes from './DrowerToggle.css';

const DrowerToggle = (props) => {
  return (
    <div onClick={props.clicked} className={classes.drawerToggle}> 
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrowerToggle;
