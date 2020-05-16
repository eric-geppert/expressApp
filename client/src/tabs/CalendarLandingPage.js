import React, { useState, Fragment } from 'react'; //had Component
import { connect } from 'react-redux';
import Calendar from './Calendar';
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
    setPlan(workoutPlan, auth.user.email);
    setFormData({ ...formData, plan: workoutPlan });
  };

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
            HIIT
            {/* <p>Super cool description text here</p>
              <p>will definitely add some color here later</p> */}
          </button>
          <button
            className='btn btn-primary'
            onClick={() => helperFunction('HOME')}
          >
            At Home Total Body
          </button>
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
    <p>You must be logged in or registered to see this feature.</p>
    // todo: add reg and login buttons here?
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { setPlan })(CalendarLandingPage);