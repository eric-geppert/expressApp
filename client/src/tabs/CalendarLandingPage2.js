import React from 'react';
import { connect } from 'react-redux';
import { setPlan, canView } from '../actions/auth';
import DaysPerWeekForm from './DaysPerWeekForm';
import CalendarOptions from './CalendarOptions';

export const CalendarLandingPage2 = ({ auth }) => {

  return ( auth.user.plan == null ? (
      <CalendarOptions/>
    ) 
    : <DaysPerWeekForm plan={auth.user.plan} />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { setPlan, canView })(
  CalendarLandingPage2
);
