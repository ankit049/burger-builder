import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc';
import Backdrop from '../Backdrop';

class Modal extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.show !== this.props.show || nextProps.children !== this.props.children);
  }

  render() {
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalClosed} />
        <div
          className={classes.modal}
          style={{
            transform: this.props.show ? 'scaleY(1)' : 'scaleY(0)',
          }}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
};

export default Modal;
