import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner';

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

class Auth extends React.Component {
  state = {
    controls: {
      email: genericInputConfig('email', 'Email', 'true', false),
      password: genericInputConfig('password', 'Password', 'true', false),
    },
    isSignup: true
  }

  componentDidMount() {
    if(!this.props.burgerBuilding && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
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
  inputChangedHandler = (e, controlName) => {
    // get current orderform
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: this.checkValidation(e.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };

    this.setState({controls: updatedControls});

  }

  // On form Submit
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  // On switch btn handler
  onSwitchHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup};
    })
  }

  render() {
    let authRedirect = null;

    if(this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    let formElementsArray = [];
    for(let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        changed={event => this.inputChangedHandler(event, formElement.id)}
        inValid={!formElement.config.valid}
        touched={formElement.config.touched}
        valueType={formElement.id}
        value={formElement.config.value} />
    ));

    if(this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if(this.props.error) {
      errorMessage = (
        <p> {this.props.error}</p>
      );
    }

    return (
      <div className={classes.authData}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button
            btnType="success">{this.state.isSignup ? 'Signup' : 'Login'}</Button>
        </form>
        <Button
          clicked={this.onSwitchHandler}
          btnType="danger">Switch to {this.state.isSignup ? 'Login' : 'Signup'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    burgerBuilding: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, pass, isSignup) => dispatch(actions.auth(email, pass, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
