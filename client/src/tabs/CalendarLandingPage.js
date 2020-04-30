import React, { useState, Fragment } from 'react'; //had Component
import { connect } from 'react-redux';
import axios from 'axios';
import Calendar from './Calendar';
import { SET_PLAN } from './../actions/types';
import { setPlan } from './../actions/auth';
// import { setPlan } from '../actions/auth';

export const CalendarLandingPage = ({ setPlan, auth }) => {
  const [formData, setFormData] = useState({
    plan: null,
    //todo set set default to '' and check for this instead?
  });
  console.log('auth from destructuring: ', auth);
  const { plan } = formData;
  const helperFunction = (workoutPlan) => {
    setPlan('HIIT', auth.user.email);
    setFormData({ ...formData, plan: workoutPlan });
  };

  // render() {
  return auth.user != null ? (
    plan == null && auth.user.plan == null ? (
      <Fragment>
        <h1>
          The Calendar view will show all your workout's day by day. Chose a
          plan
        </h1>
        <div className='cal-landing-page-section'>
          {/* add in flexbox styling from recomendations page */}
          <button
            className='btn btn-primary'
            onClick={() => helperFunction('HIIT')}
          >
            Option 1
            {/* <p>Super cool description text here</p>
              <p>will definitely add some color here later</p> */}
          </button>
          <button> Option 2 </button>
          <button> Option 3 </button>
          <button> Option 4 </button>
          <button> Option 5 </button>
        </div>
      </Fragment>
    ) : plan == null ? (
      <Calendar plan={auth.user.plan} />
    ) : (
      <Calendar plan={plan} />
    )
  ) : (
    <p>user is null</p>
    // auth.user.plan == null? console.log("error, user is non null")
  );
  // }
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { setPlan })(CalendarLandingPage);
