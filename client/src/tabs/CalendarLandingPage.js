import React, { useState, Fragment } from 'react'; //had Component
import { connect } from 'react-redux';
import { setPlan, canView } from './../actions/auth';
import { Link } from 'react-router-dom';
import DaysPerWeekForm from './DaysPerWeekForm';

export const CalendarLandingPage = ({ setPlan, auth, canView }) => {
  const [formData, setFormData] = useState({
    plan: null,
    canViewtoday: null
    //todo set set default to '' and check for this instead?
  });
  const { plan } = formData;

  // const helperFunction = (workoutPlan) => {
  async function helperFunction(workoutPlan) {
    console.log('inside CalLanding: auth.paid: ', auth.paid);
    /** must use ==ture here, otherwise will return true even if false */
    if (auth.paid == true) {
      console.log('paid good to see whole workout: ');
      setPlan(workoutPlan, auth.user.email);
      setFormData({ ...formData, plan: workoutPlan });
    }
    if (auth.paid !== true) {
      //todo change to auth.user.paid??
      const temp = await canView(auth.user.email);
      /** canView 1 sees if user is subscribed 2 sets the redux
       * field paid for the furute if it was just purchased */
      //was temp" here if have to use that then call async function
      //so I can call await for it
      if (temp === true) {
        console.log('paid good to see whole workout: ');
        setPlan(workoutPlan, auth.user.email);
        setFormData({ ...formData, plan: workoutPlan });
      } else {
        const workoutTrial = workoutPlan + 'trial';
        console.log('not paid workoutTrial: ', workoutTrial);
        setPlan(workoutTrial, auth.user.email);
        setFormData({ ...formData, plan: workoutTrial });
      }
    }
  }

  // get Uncaught Invariant Violation: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
  // if try to render a promise
  function CheckIfPaidUpToday() {
    // var workoutTrial = ""
    const temp =  canView(auth.user.email);
    if(temp===true)
    //   setFormData({canViewtoday: true})
    // //set redux to true
    // else
    //   setFormData({canViewtoday: false})
    // }


    if(plan == null)
        return <DaysPerWeekForm plan={auth.user.plan} />
      else
        return <DaysPerWeekForm plan={plan} />
    else{
      //make changes here so can change to paid plan later
      if(plan==null){
        return <DaysPerWeekForm plan={auth.user.plan} />
      }
      else{
        return <DaysPerWeekForm plan={plan} />
      }
    }
  }
      // return <p>not today jr</p> 
  // async function checkIfPaidUpToday(workoutPlan) {
  //   const temp = await canView(auth.user.email);
  //   if(temp===true)
  //     return <DaysPerWeekForm plan={plan} />
  //   else
  //     return <p>not today jr</p> 
  // }

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
          <button
            className='btn btn-primary'
            onClick={() => helperFunction('CONDITIONING')}
          >
            Conditioning and Weight Loss
          </button>
          <button
            className='btn btn-primary'
            onClick={() => helperFunction('TOTALBODY')}
          >
            {' '}
            Total Body Transformation{' '}
          </button>
        </div>
      </Fragment>
    ) :
    <CheckIfPaidUpToday/>
    // : plan == null ? (
          
    //         // ---------------
    //         <div>
    //           {/* //check if auth updated render */}
    //           {this.CheckIfPaidUpToday()}

    //           <p></p>
    //         </div>
      /**if sotred in redux not locally */
      // authorized to see it?
      // authorizedToday != undefined ? (

      //   authorizedToday ? <DaysPerWeekForm plan={auth.user.plan} /> :
      //   // if not authorized today
      //   <p>not authorized</p>
      // ):
      // <p>undefined so far</p>
            // ---------------
    // ) : (
    //   /**if stored locally */
    //   <DaysPerWeekForm plan={plan} />
    // )
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
