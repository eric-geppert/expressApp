import React, { useState, Fragment } from 'react'; //had Component
import { connect } from 'react-redux';
import Calendar from './Calendar';
import { setPlan, canView } from './../actions/auth';
import { Link } from 'react-router-dom';

export const CalendarLandingPage = ({ setPlan, auth }) => {
  const [formData, setFormData] = useState({
    plan: null,
    //todo set set default to '' and check for this instead?
  });
  console.log('auth from destructuring: ', auth);
  const { plan } = formData;
  const helperFunction = (workoutPlan) => {
    // if(canView(auth.user.email))
    //trying without canView to see if I need it
    if (auth.paid === true) {
      console.log('paid good to see whole workout: ');
      setPlan(workoutPlan, auth.user.email);
      setFormData({ ...formData, plan: workoutPlan });
    } else {
      const workoutTrial = workoutPlan + 'trial';
      console.log('not paid workoutTrial: ', workoutTrial);
      setPlan(workoutTrial, auth.user.email);
      setFormData({ ...formData, plan: workoutTrial });
    }
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
          <button
            className='btn btn-primary'
            onClick={() => helperFunction('MUSCLE')}
          >
            Build Muscle and Size
          </button>
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
    <Fragment>
      <p>
        You must be logged in or registered to see this feature. Register to
        create a free account.
      </p>
      <Link className='btn btn-primary' to='/register'>
        Register
      </Link>
      <Link className='btn btn-primary' to='/login'>
        Login
      </Link>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { setPlan, canView })(
  CalendarLandingPage
);
