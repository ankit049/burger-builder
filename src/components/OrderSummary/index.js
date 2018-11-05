import React from 'react';
import Aux from '../../hoc';
import Button from '../UI/Button';

class OrderSummary extends React.Component {
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(key => {
      return (
        <li key={key}>
         <span style={{textTransfrom: 'capitalize'}}>{key}</span>
         : {this.props.ingredients[key]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p> A delicious burger with followings ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p> <strong>Total price : {this.props.price} $</strong> </p>
        <p> Continue to checkout </p>
        <Button btnType={'danger'} clicked={this.props.purchaseCancled}>Cancle</Button>
        <Button btnType={'success'} clicked={this.props.purchaseContinued}>Continue</Button>
      </Aux>
    );
  }
};

export default OrderSummary;
