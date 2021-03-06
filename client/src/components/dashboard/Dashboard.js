import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
// import DashboardActions from './DashboardActions';
// import Experience from './Experience';
// import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { unsubscribeMe } from '../../actions/auth';
import CheckoutPage from '../auth/CheckoutPage';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  unsubscribeMe,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading || profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile.customer.data.length > 0 ? (
        <Fragment>
          <h1 className='large text-primary'>Dashboard</h1>
          <p className='lead'>
            <i className='fas fa-user' /> Welcome to your profile page
            {user && ' ' + user.name}
          </p>

          <p> email: {profile.customer.data[0].email} </p>
          {console.log(
            'profile.customer.data[0].subscriptions: ',
            profile.customer.data[0].subscriptions
          )}
          {console.log(
            'profile.customer.data[0].subscriptions.length: ',
            profile.customer.data[0].subscriptions.length
          )}

          {profile.customer.data[0].subscriptions.data.length > 0 ? (
            <Fragment>
              <p>
                subscription plan nickname:
                {' ' +
                  profile.customer.data[0].subscriptions.data[0].plan.nickname}
              </p>
              <p>
                subscription cost: $
                {profile.customer.data[0].subscriptions.data[0].plan.amount /
                  100}
              </p>
              <p>
                charge every:
                {' ' +
                  profile.customer.data[0].subscriptions.data[0].plan.interval}
              </p>
              <p>
                subscription status:
                {' ' + profile.customer.data[0].subscriptions.data[0].status}
              </p>
              <p>
                cancel at period end?:
                {String(
                  ' ' +
                    profile.customer.data[0].subscriptions.data[0]
                      .cancel_at_period_end
                )}
              </p>
            </Fragment>
          ) : (
            <p>subscriptions: customer has no subscriptions</p>
          )}

          <p>
            Payment is delinquent: {String(profile.customer.data[0].delinquent)}
          </p>
          <Fragment>
            {/* <p>
              You have successfully logged in would you like to purchase the
              full version of all our workout plans?
            </p> */}
            <Link to='/CheckoutPage' className='btn btn-primary my-1'>
              Buy Full Programs
            </Link>
            <button
              className='btn btn-primary my-1'
              onClick={() =>
                user !== 'undefined' && user !== null
                  ? unsubscribeMe(user.email)
                  : // console.log('calling unsub with: ', user)
                    console.log('user is undefined or null')
              }
            >
              unsubscribeMe
            </button>
            {/* {user !== 'undefined' && user !== null ? (
              <Fragment>
                <button onClick={() => unsubscribeMe(user.email)}>
                  unsubscribe Me
                </button>
              </Fragment>
            ) : (
              <Fragment> user undefined</Fragment>
            )} */}
          </Fragment>
        </Fragment>
      ) : (
        <Fragment>
          <h3 style={{ paddingBottom: '30px' }}>
            {' '}
            Subscribe to unlock all workouts, and see your profile!
          </h3>
          <CheckoutPage />
          <p style={{ paddingTop: '30px' }}>
            In the mean time you can view our sample programs here.
          </p>
          <Link to='/findMyProgram' className='btn btn-primary my-1'>
            Sameple Programs (pdfs)
          </Link>
          <Link to='/Calendar' className='btn btn-primary my-1'>
            Sameple Programs (in Calendar format)
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  unsubscribeMe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  unsubscribeMe,
})(Dashboard);
