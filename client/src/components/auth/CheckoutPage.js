import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CheckoutPage = ({ paid }) => {
  //above destructures paid variable
  return paid === true ? (
    // <Spinner />
    <div> payment Workded!</div>
  ) : (
    /**this apiKey is public and ok to have here it gets sent unencryped in initial request to stripe  */
    <StripeProvider apiKey='pk_test_nq8dRX7XeBaTNauxj2CLOHLd00zAKf36m9'>
      <Elements>
        <CheckoutForm />
      </Elements>
    </StripeProvider>
  );
};

CheckoutPage.propTypes = {
  paid: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  paid: state.auth.paid,
});

export default connect(
  mapStateToProps
  //   { register function here???? }
)(CheckoutPage);
