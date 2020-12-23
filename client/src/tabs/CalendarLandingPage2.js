import React, { useState, Fragment } from 'react'; //had Component
import { connect } from 'react-redux';
import { setPlan, canView } from '../actions/auth';
import { Link } from 'react-router-dom';
import DaysPerWeekForm from './DaysPerWeekForm';
import CalendarOptions from './CalendarOptions';

// export const CalendarLandingPage2 = ({ setPlan, auth, canView }) => {
export const CalendarLandingPage2 = ({ auth }) => {

//   const [formData, setFormData] = useState({
//     plan: null,
//     canViewtoday: null
//     //todo set set default to '' and check for this instead?
//   });
//   const { plan } = formData;


  return ( auth.user.plan == null ? (
      <CalendarOptions/>
    ) 
    //add check for trial vs regular?
    : <DaysPerWeekForm plan={auth.user.plan} />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { setPlan, canView })(
  CalendarLandingPage2
);
