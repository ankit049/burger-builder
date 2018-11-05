import React from 'react';
import {connect} from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order';
import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner';
import * as actions from '../../store/actions';

class Orders extends React.Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let order = this.props.orders.map( order => (
      <Order
        key={order.id}
        price={order.price}
        ingredients={order.ingredients}  />
    ));

    if(this.props.loading) {
      order = <Spinner />;
    }

    return (
      <div>
        <h4 style={{textAlign:'center'}}>Totoal no of orders : {this.props.orders.length}</h4>
        {order}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
