import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import { setDaysPerWeek } from './../actions/auth';

export const DaysPerWeekForm = ({ setDaysPerWeek, auth, plan }) => {
  const [formData, setFormData] = useState({
    // plan: null,
    daysState: null,
    //todo set set default to '' and check for this instead?
  });
  const { daysState } = formData;
  const helperFunction = (daysPerWeekInput) => {
    setFormData({ ...formData, daysState: daysPerWeekInput });
    setDaysPerWeek(daysPerWeekInput, auth.user.email);
  };

  return daysState === undefined || daysState === null ? (
    <Fragment>
      {auth.user.days == null ? (
        /**if no local and no redux state for days */
        <Fragment>
          <h1>Choose the days/week you want to workout</h1>
          <div className='cal-landing-page-section'>
            <button
              className='btn btn-primary'
              onClick={() => helperFunction(3)}
            >
              3 days per week
            </button>
            <button
              className='btn btn-primary'
              onClick={() => helperFunction(4)}
            >
              4 days per week
            </button>
            <button
              className='btn btn-primary'
              onClick={() => helperFunction(5)}
            >
              5 days per week
            </button>
          </div>
        </Fragment>
      ) : (
        /**if no local, but there is a redux state for days */
        <Calendar plan={plan} days={auth.user.days}></Calendar>
      )}
    </Fragment>
  ) : (
    <Calendar plan={plan} days={daysState}></Calendar>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { setDaysPerWeek })(DaysPerWeekForm);
