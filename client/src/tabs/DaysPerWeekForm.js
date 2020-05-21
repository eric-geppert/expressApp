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
    setDaysPerWeek(daysState, auth.user.email);
    setFormData({ ...formData, daysState: daysPerWeekInput });
  };

  return daysState === undefined || daysState === null ? (
    <Fragment>
      <h1>Choose the days/week you want to workout</h1>
      <div className='cal-landing-page-section'>
        <button className='btn btn-primary' onClick={() => helperFunction(3)}>
          3 days per week
        </button>
        <button className='btn btn-primary' onClick={() => helperFunction(4)}>
          4 days per week
        </button>
        <button className='btn btn-primary' onClick={() => helperFunction(5)}>
          5 days per week
        </button>
      </div>
    </Fragment>
  ) : (
    <Calendar plan={plan} days={daysState}></Calendar>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { setDaysPerWeek })(DaysPerWeekForm);
