import React from 'react';

import classes from './CheckoutSummary.css';
import Burger from '../Burger';
import Button from '../UI/Button';

const CheckoutSummary = (props) => {
  let disabled = true;
  if(Object.keys(props.ingredients).length) {
    disabled = false;
  }
  console.log(disabled);

  return (
    <div className={classes.checkoutSummary}>
      <h1>We hope it test well! </h1>
      <div>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        clicked={props.checkoutCancled}
        btnType="danger"> CANCLE </Button>
      <Button
        clicked={props.checkoutContinued}
        disabled={disabled}
        btnType="success"> CONTINUE </Button>
    </div>
  )
};

export default CheckoutSummary;
