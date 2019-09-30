import React, { Component, Fragment } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { setPaidToTrue } from '../../actions/auth';
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
    // console.log('this.props.email: ' + this.props.email);
    // console.log('this.props: ' + this.props.user);
    // console.log('this.props.user.email: ' + this.props.user.email);
    console.log('this.props.user: before buy '); // + this.props.user);
    console.log(this.props.user);
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
        console.log(
          'this.props.isAuthenticated: ' + this.props.isAuthenticated
        );
        // console.log('this.props.user.email: ' + this.props.user.email);
        console.log('this.props.user after buy success before /paid: '); // + this.props.user);
        console.log(this.props.user);
        // console.log('this.props.body: ' + this.props.body);

        if (this.props.user != null) {
          const emailToBePassed = this.props.user.email;
          const body = JSON.stringify({ email: emailToBePassed });
          const res2 = await fetch('api/users/paid', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body
          });
          //hardcoded email for now
          if (res2.status === 200) {
            console.log('paid set for: ' + emailToBePassed);
            this.props.setPaidToTrue();
          } else {
            console.log('there was a problem with calling paid endpoint');
          }
        } else {
          console.log('user is currently null');
          console.log(
            'inside null user: this.props.isAuthenticated: ' +
              this.props.isAuthenticated
          );
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  // email: state.auth.user.email, //under users????
  user: state.auth.user
  // paid: state.auth.paid
});

export default connect(
  mapStateToProps,
  { setAlert, setPaidToTrue }
)(injectStripe(CheckoutForm));
