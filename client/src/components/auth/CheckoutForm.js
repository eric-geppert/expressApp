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
        console.log('Purchase Complete!');
        this.setState({ complete: true });
        this.props.setAlert('Purchase complete!', 'success');
        // alert('payment success!');

        /**setting paid to true in db */
        // const config = {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // };
        // const body = 'a26@me.com';
        // const res = await axios.put('/api/users/paid');

        // const body = 'a27@me.com';
        // const body = JSON.stringify({ email });
        const body = JSON.stringify({ email: 'a25@me.com' });
        const res2 = await fetch('api/users/paid', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body //: { email: 'a25@me.com' }
        });
        // console.log('body: ' + body);
        //, body, config);
        //hardcoded email for now
        if (res2.status === 200) {
          console.log('paid set');
        } else {
          console.log('there was a problem with calling paid endpoint');
        }
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
export default connect(
  null,
  { setAlert }
)(injectStripe(CheckoutForm));
