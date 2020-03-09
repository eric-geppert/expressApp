import React from 'react';
// import propTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

//destructure the auth that we get from props
const getDateUserStarted = async ({ auth }) => {
  console.log('auth is: ', auth);
  if (auth.user !== undefined && auth.user !== null) {
    console.log('auth.user', auth.user);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      console.log('auth.user.email is: ', auth.user.email);

      const body = JSON.stringify({ email: auth.user.email });
      const request = await axios
        .post('api/auth/getCustomerDate', body, config)
        .then(response => {
          var differenceInDays =
            new Date().getTime() - Date.parse(response.data.date);
          differenceInDays = differenceInDays / (1000 * 60 * 60 * 24);
          differenceInDays = Math.floor(differenceInDays);
          this.setState({ dateStarted: differenceInDays });
          return differenceInDays;
        });
    } catch (err) {
      return err;
    }
  }
  console.log('auth.user is undefined or null');
  return 'invalid email, you must be logged in to use this feature'; //??? what do I want to return here??
  // return null; //???
};
// any.propTypes = {
//   auth: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(getDateUserStarted);
