import React from 'react';
import {connect} from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar';
import Aux from '../../hoc';
import SideDrawer from '../../components/Navigation/SideDrawer';

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCLoseHandler = () => {
    this.setState({showSideDrawer: false});
  }

  drawerToggleHandler = () => {
    this.setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}));
  }

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.drawerToggleHandler}/>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCLoseHandler}/>
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
