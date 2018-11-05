import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/CheckoutSummary';
import ContactDetails from '../ContactDetails';

class Checkout extends React.Component {

  checkoutCancledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/" />;

    if(this.props.ings) {
      const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            checkoutCancled={this.checkoutCancledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={this.props.ings}/>

          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactDetails} />
        </div>
      );
    }

    return summary
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);
