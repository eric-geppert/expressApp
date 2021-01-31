import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CalendarLandingPage2 from './CalendarLandingPage2';


export const CalendarLandingPage1 = ({ auth }) => {
  return auth.user != null ? (
    <CalendarLandingPage2/>
  ) : (
    <Fragment>
      <p>
        You must be logged in or registered to see this feature. Register to
        create a free account.
      </p>
      <Link className='btn btn-primary' to='/register'>
        Register
      </Link>
      <Link className='btn btn-primary' to='/login'>
        Login
      </Link>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(
  CalendarLandingPage1
);
