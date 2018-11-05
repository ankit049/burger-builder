 import React from 'react';

 import classes from './Order.css';

 const Order = (props) => {
  const ingredients = [];

  for(let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientsOutput = ingredients.map(ig => (
    <span key={ig.name}
      style={{
        textTransform: 'capitalize',
        border: '1px solid silver',
        borderRadius: '4px',
        margin: '0px 5px',
        padding: '2px 8px'
      }}> {ig.name} ({ig.amount}) </span>
  ));
  return (
    <div className={classes.order}>
      <p>Ingredients: {ingredientsOutput} </p>
      <p>Price : <strong>{Number.parseFloat(props.price).toFixed(2)}$</strong> </p>
    </div>
  );
 };

 export default Order;
