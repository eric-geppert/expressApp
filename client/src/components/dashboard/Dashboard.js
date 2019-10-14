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

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    // return profile === null ||
    // profile.customer.data[0].delinquent == 'undefined' ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to your profile page
        {user && ' ' + user.name}
      </p>

      <p> email: {profile.customer.data[0].email} </p>
      <p>
        subscription plan nickname:
        {' ' + profile.customer.data[0].subscriptions.data[0].plan.nickname}
      </p>
      <p>
        subscription cost: $
        {profile.customer.data[0].subscriptions.data[0].plan.amount / 100}
      </p>
      <p>
        charge every:
        {' ' + profile.customer.data[0].subscriptions.data[0].plan.interval}
      </p>
      <p>
        subscription status:
        {' ' + profile.customer.data[0].subscriptions.data[0].status}
      </p>
      <p>
        cancel at period end?:
        {String(
          ' ' +
            profile.customer.data[0].subscriptions.data[0].cancel_at_period_end
        )}
      </p>
      <p>
        Payment is delinquent: {String(profile.customer.data[0].delinquent)}
      </p>
      {/* doesn't actually show days until payment due why? */}
      <Fragment>
        <p>
          You have successfully logged in would you like to purchase the full
          version of all our workout plans?
        </p>
        <p>In the mean time view our sample programs here.</p>
        <Link to='/findMyProgram' className='btn btn-primary my-1'>
          Sameple Programs
        </Link>
        <Link to='/CheckoutPage' className='btn btn-primary my-1'>
          Buy Full Programs
        </Link>
        <button
          className='btn btn-primary my-1'
          onClick={
            user !== 'undefined' && user !== null
              ? unsubscribeMe(user.email)
              : console.log('user is undefined or null')
          }
        >
          unsubscribeMe
        </button>
        {/* <button onClick={unsubscribeMe(user.email)}>unsubscribeMe</button> */}
      </Fragment>
      {/* {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )} */}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, unsubscribeMe }
)(Dashboard);
