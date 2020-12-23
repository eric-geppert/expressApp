import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import { setDaysPerWeek } from './../actions/auth';

export const DaysPerWeekForm = ({ setDaysPerWeek, auth, plan }) => {
  
  return (
    auth.user.days == null ? (
      /**if no local and no redux state for days */
      <Fragment>
        <h1>Choose the days/week you want to workout</h1>
        <div className='cal-landing-page-section'>
          <button
            className='btn btn-primary'
            onClick={() => setDaysPerWeek(3, auth.user.email)}
          >
            3 days per week
          </button>
          <button
            className='btn btn-primary'
            onClick={() => setDaysPerWeek(4, auth.user.email)}
              >
            4 days per week
          </button>
          <button
            className='btn btn-primary'
            onClick={() => setDaysPerWeek(5, auth.user.email)}
          >
            5 days per week
          </button>
        </div>
      </Fragment>
    ) : (
      /**if no local, but there is a redux state for days */
      <Calendar plan={plan} days={auth.user.days}></Calendar>
    )
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { setDaysPerWeek })(DaysPerWeekForm);
