import React from 'react';
import Aux from '../';
import Modal from '../../components/UI/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  // return a class with passed react children ex: WrappedComponent
  return class extends React.Component {
    state = {
      error: null
    }

    componentWillMount() {
      // unset error during request
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });

      // set error if error occured during response
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
    }

    // remove old interceptors to prevent memory leak
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    // handle Modal show and hide on the basis of error
    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render() {
      return(
        <Aux>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}>
            { this.state.error ? this.state.error.message : null }
          </Modal>
          <WrappedComponent  {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler;
