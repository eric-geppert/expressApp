import React, { Component, Fragment } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { BUY_SUCCESS, BUY_FAIL } from '../../actions/types';
// import { payStripe } from '../../actions/auth';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
    //todo: add failure alerts
  }

  async submit(ev) {
    ev.preventDefault();

    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    let response = await fetch('api/auth/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: token.id
    });

    if (response.ok) {
      console.log('Purchase Complete!');
      this.setState({ complete: true });
      this.props.setAlert('Purchase complete!', 'success');
      // setAlert('Purchase complete!', 'success');
      // setAlert('Purchase complete (danger)!', 'danger');
      alert('payment success!');
    }
  }

  render() {
    if (this.state.complete)
      return (
        <Fragment>
          <Redirect to='/FindMyProgram' />
        </Fragment>
      );

    return (
      <div className='checkout'>
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </div>
    );
  }
}
// export default injectStripe(CheckoutForm);
//need injectStripe

// CheckoutForm.propTypes = {
//   setAlert: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool,
//   paid: PropTypes.bool
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   //adding
//   paid: state.auth.paid
// });

// export default connect(
//   mapStateToProps,
//   { setAlert }
// )(injectStripe(CheckoutForm));

export default connect(
  null,
  { setAlert }
)(injectStripe(CheckoutForm));

//--------
// export default connect(
//   mapStateToProps,
//   { setAlert }
// )(CheckoutForm);
// )(injectStripe(CheckoutForm)); //works for stripe but not alerts

//connect state to props paid instead of complete
//todo include response function when connecting to props???

//------
// console.log('calling paystripe');
// payStripe(this.props);
//problems:
//1.didnt' know what to pass,
//2. wouldn't print conosle.log in action function payStripe

//todo: remove dispatches

//----

// payStripe();
//   async dispatch => ({
//     type: BUY_SUCCESS,
//     payload: response.data
//   });
// } else {
//   dispatch({
//     type: BUY_FAIL,
//     payload: response.data
//   });
// }
// else if(response.status===500){
//   dispatch({
//     type: BUY_FAIL,
//     payload: res.data
//     //todo: add payload of status??
//   });
// }
// else if(response.status===400){
//   dispatch({
//     type: BUY_FAIL,
//     payload: res.data
//   });
// }
