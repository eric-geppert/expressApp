import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { payStripe } from '../../actions/auth';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
    //todo: add failure alerts
  }

  async submit(ev) {
    ev.preventDefault();
    // console.log('calling paystripe');
    // payStripe(this.props);
    //problems:
    //1.didnt' know what to pass,
    //2. wouldn't print conosle.log in action function payStripe

    //todo: remove dispatches

    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    // let response = await fetch('/chargetest', {
    let response = await fetch('api/auth/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: token.id
    });

    if (response.ok) {
      console.log('Purchase Complete!');
      this.setState({ complete: true });
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className='checkout'>
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);

//connect state to props paid instead of complete
//todo include response function when connecting to props???
