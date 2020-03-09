import React from 'react';
// import propTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

//destructure the aa that we get from props
export const getDateUserStarted = async aa => {
  console.log('a is: ', aa);
  if (aa.user !== undefined && aa.user !== null) {
    console.log('aa.user', aa.user);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      console.log('aa.user.email is: ', aa.user.email);

      const body = JSON.stringify({ email: aa.user.email });
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
  console.log('aa.user is undefined or null');
  return 'invalid email, you must be logged in to use this feature'; //??? what do I want to return here??
  // return null; //???
};
// any.propTypes = {
//   aa: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  aa: state.aa
});

connect(mapStateToProps)(getDateUserStarted);
