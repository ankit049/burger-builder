import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from '../BurgerIngredient';

const Burger = (props) => {
  // Return an array of all ingredients
  //......Object.keys(props.ingredients) ...
  // it will create an array of passed object's key eg: ['cheese', 'meat', 'bacon']
  let transformedIngredient = Object.keys(props.ingredients).map(igKey => {
    //.........[...Array(props.ingredients[igKey])]......
    // it will create an array of undefiend elements based on number passed on arg
    // & then create an array of given [<BurgerIngredient />, <BurgerIngredient />, ..] element
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  }).reduce((arr, ele) => {
    return arr.concat(ele);
  }, []);

  // console.log(transformedIngredient);

  //Check if there is no ingredients
  if(transformedIngredient.length === 0) {
    transformedIngredient = <p>Please add ingredients</p>;
  }

  return (
    <div className={classes.burgerWrapper}>
      <div className={classes.burger}>
        <BurgerIngredient type={'bread-top'}/>
        {transformedIngredient}
        <BurgerIngredient type={'bread-bottom'}/>
      </div>
    </div>
  );
};

export default Burger;
