import React, { Component, Fragment } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { HasPaidSuccessfully } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { BUY_SUCCESS, BUY_FAIL } from '../../actions/types';
// import { payStripe } from '../../actions/auth';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault();

    try {
      let { token } = await this.props.stripe.createToken({ name: 'Name' });
      let response = await fetch('api/auth/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: token.id
      });

      if (response.ok) {
        // HasPaidSuccessfully(this.props.email);
        console.log('Purchase Complete!');
        this.setState({ complete: true });
        this.props.setAlert('Purchase complete!', 'success');
        alert('payment success!');

        try {
          console.log('sending paid reqest');
          let response2 = await fetch('api/users/paid', {
            method: 'PUT',
            headers: { 'Content-Type': 'text/plain' },
            body: 'a13@me.com' //hardcoded for now get from redux later
            //the email
            //token.id
          });
          if (response2.ok) {
            console.log('paid update Complete!');
          }
        } catch (err2) {}
      }
    } catch (err) {
      console.log('error caught by parent error : ' + err);
      this.props.setAlert('There was a problem with your payment', 'danger');
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

//need map state to props for haspaidSuccessfull?
export default connect(
  null,
  { setAlert, HasPaidSuccessfully }
)(injectStripe(CheckoutForm));
