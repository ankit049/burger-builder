import React from 'react';
import {connect} from 'react-redux';

import Burger from '../../components/Burger';
import BuildControls from '../../components/BuildControls';
import Aux from '../../hoc';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/OrderSummary';
import classes from './BurgerBuilder.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions';

class BurgerBuilder extends React.Component {
  // State of BurgerBuilder Component
  state = {
    purchaseble: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  // make an ajax request to get ingredients from firebase server
  componentDidMount() {
    // console.log(this.props);
    this.props.onInitIngredients();
  }

  // Update purchasing
  updatePurchasing = () => {
    if(this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  // Close modal
  purchaseCancleHandler = () => {
    this.setState({purchasing: false});
  }

  // Purchasre Continue
  purchaseContinueHandler = () => {
    // const queryParams = [];
    // for(let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price=' + this.props.totalPrice);
    //
    // const queryString = queryParams.join('&');

    // this.props.history.push({
    //   pathname:'/checkout',
    //   search:'?' + queryString
    // });
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  // Update purchaseble if ingredients are added on burger
  updatePurchaseable = (ingredients) => {
    const sum = Object.keys(ingredients).map(key => {
      return ingredients[key];
    }).reduce((sum, ele) => {
      return sum + ele;
    }, 0);
    return sum > 0;
  }

  render() {
    const disabledInfo = { ...this.props.ings };

    // Update disabledInfo as based on no. of count of particular
    // ingredients like as {'salad': true, 'cheese': false, ...}
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p> Ingredients can't be loaded</p> : <Spinner />;

  if(this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchaseble={this.updatePurchaseable(this.props.ings)}
            isAuth={this.props.isAuthenticated}
            ordered={this.updatePurchasing} />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          purchaseCancled={this.purchaseCancleHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice.toFixed(2)}
          ingredients={this.props.ings}/>
      );
    }

    if(this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <div className={classes.mainLayout}>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancleHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
