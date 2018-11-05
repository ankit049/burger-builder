import React from 'react';

import classes from './Input.css';

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.inputElement];
  let validationError = null;

  // add invalid class in input value is not valid
  if(props.inValid && props.touched) {
    inputClasses.push(classes.invalid);
  }

  // show an error message if the input in invalid
  if(props.inValid && props.touched) {
    validationError = <p className={classes.validationError}>Please enter a valid {props.valueType} </p>;
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.changed}
        {...props.elementConfig} />
      break;

    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed} >
          {props.elementConfig.options.map(option => (
            <option
              key={option.value}
              value={option.value}> {option.displayValue} </option>
          ))}
        </select>
      );
      break;

    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.changed}
        {...props.elementConfig} />
      break;

    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.changed}
        {...props.elementConfig} />
  }

  return(
    <div className={classes.input}>
      <label className={classes.label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
