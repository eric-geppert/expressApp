//seperating out all components, don't need state anymore. Will just set everything in Redux

import React, { useState, Fragment } from 'react'; //had Component
import { connect } from 'react-redux';
import { setPlan, canView } from './../actions/auth';
import { Link } from 'react-router-dom';
import DaysPerWeekForm from './DaysPerWeekForm';

export const CalendarOptions = ({ setPlan, auth, canView }) => {

  return (
  <Fragment>
    <h1>
        The Calendar view will show all your workout's day by day. Chose a
        plan
    </h1>
    <div className='cal-landing-page-section'>
        {/* add in flexbox styling from recomendations page */}
        <button
        className='btn btn-primary'
        onClick={() => setPlan('HIIT', auth.user.email)}
        // is this bad idea? will it continually be setting plan?
        >
        HIIT
        {/* <p>Super cool description text here</p>
            <p>will definitely add some color here later</p> */}
        </button>
        <button
        className='btn btn-primary'
        onClick={() => setPlan('HOME', auth.user.email)}
        >
        At Home Total Body
        </button>
        <button
        className='btn btn-primary'
        onClick={() => setPlan('MUSCLE', auth.user.email)}
        >
        Build Muscle and Size
        </button>
        <button
        className='btn btn-primary'
        onClick={() => setPlan('CONDITIONING', auth.user.email)}
        >
        Conditioning and Weight Loss
        </button>
        <button
        className='btn btn-primary'
        onClick={() => setPlan('TOTALBODY', auth.user.email)}
        >
        {' '}
        Total Body Transformation{' '}
        </button>
    </div>
  </Fragment>
)};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { setPlan, canView })(
  CalendarOptions
);
