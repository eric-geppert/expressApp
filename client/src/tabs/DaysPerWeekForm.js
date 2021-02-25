import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import { setDaysPerWeek } from './../actions/auth';
import { SelectDaysOfWeek } from './SelectDaysOfWeek';

export const DaysPerWeekForm = ({ setDaysPerWeek, auth, plan }) => {
  // or some other condition??
  return auth.user.days == null || auth.user.days.length === 0 ? (
    <SelectDaysOfWeek
      email={auth.user.email}
      setDaysPerWeekFucntion={setDaysPerWeek}
    />
  ) : (
    <Calendar plan={plan} days={auth.user.days}></Calendar>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { setDaysPerWeek })(DaysPerWeekForm);
