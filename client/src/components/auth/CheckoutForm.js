import React, { Component, Fragment } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { setPaidToTrue, canView } from '../../actions/auth';
import { connect } from 'react-redux';

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
      let idToBePassed = token.id;
      const body = JSON.stringify({
        email: this.props.user.email,
        source: idToBePassed,
      });

      let response = await fetch('api/auth/createCustomer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }).then((response) => response.json());

      const res2 = await fetch('api/auth/createSubscription', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: response.customer.id,
      });
      if (res2.status === 200) {
        this.props.canView();
        this.setState({ complete: true });
        this.props.setAlert('Purchase complete!', 'success');
      }
      // else
      //   console.log(
      //     'there was a problem with creating subscription with that customer'
      //   );
    } catch (err) {
      console.log('payment err:', err);
      this.props.setAlert('There was a problem with your payment', 'danger');
    }
  }

  render() {
    if (this.state.complete)
      return (
        <Fragment>
          <Redirect to='/Calendar' />
        </Fragment>
      );

    return (
      <div className='checkout'>
        <p>
          Would you like to complete your subscription purchase for $20/month?
        </p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { setAlert, setPaidToTrue, canView })(
  injectStripe(CheckoutForm)
);
