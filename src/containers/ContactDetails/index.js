import React from 'react';
import {connect} from 'react-redux';

import axios from '../../axios-orders';
import Button from '../../components/UI/Button';
import classes from './ContactDetails.css';
import Spinner from '../../components/UI/Spinner';
import Input from '../../components/UI/Input';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions';

// generate an input field with particular configuration
const genericInputConfig = (type, placeholder, required, valid=false) => {
  return {
    elementType: 'input',
    elementConfig: {
      type: type,
      placeholder: placeholder
    },
    value:'',
    validation: {
      required: required
    },
    valid: valid,
    touched: false
  }
}

class ContactDetails extends React.Component {
  state = {
    orderForm: {
      name: genericInputConfig('text', 'Your Name', 'true', false),
      email: genericInputConfig('email', 'Your Email', 'true', false),
      street: genericInputConfig('text', 'Street', 'true', false),
      postalCode: genericInputConfig('text', 'Postal Code', 'true', false),
      country: genericInputConfig('text', 'Country', 'true', false),
      deleveryMode: {
        elementType: 'select',
        elementConfig: {
          options:[
            {value: 'fastest', displayValue: 'Fastest' },
            {value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value:'fastest',
        validation: {},
        valid: true,
        touched: true
      }
    },
    loading: false,
    formIsValid: false
  }

  // Form Validation Handler
  checkValidation(value, rules) {
    let isValid = true;
    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    return isValid;
  }

  // Input Change handler
  inputChangedHandler = (e, inputIdentifier) => {
    // get current orderform
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    // get current input object on the basis of inputIdentifier
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    // update the current input value
    updatedFormElement.value = e.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    // set formIsValid true if all the input elements are valid
    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    console.log(formIsValid);
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  // On form submit handler
  orderHandler = (e) => {
    e.preventDefault();

    // get form contactData
    let formdata = {};
    for(let formElementIndentifier in this.state.orderForm) {
      formdata[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value;
    }
    // console.log(formdata);

    // order data
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formdata,
      userId: this.props.userId
    }

    //make a ajax request through dispatching an action
    this.props.onOrderBurger(order, this.props.token);
  }

  render() {
    // Make an array of input elementType
    // ex:
    // [
    //   {
    //     id: "name",
    //     config: {
    //       elementType: '',
    //       elementConfig: {
    //         type: type,
    //         placeholder: placeholder
    //       },
    //       value:'',
    //       validation: {
    //         required: required
    //       },
    //       valid: valid,
    //       touched: false
    //     }
    //   }
    // ]
    let formElementsArray = [];
    for(let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    // Make an array of Input Components
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            changed={event => this.inputChangedHandler(event, formElement.id)}
            inValid={!formElement.config.valid}
            touched={formElement.config.touched}
            valueType={formElement.id}
            value={formElement.config.value} />
        ))}
        <Button
          disabled={!this.state.formIsValid}
          btnType="success">ORDER</Button>
      </form>
    );

    if(this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.contactData}>
        <h4>Enter your contact details </h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactDetails, axios));
