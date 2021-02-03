import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import { setExactDaysWorkingOut } from './../actions/aut``h';

export const DaysPerWeekForm = ({ setExactDaysWorkingOut, auth, plan }) => {
  
  return auth.user.workoutDays == null ? (
      /**if no local and no redux state for days */
      <Fragment>
        {/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
        <label for="vehicle1"> I have a bike</label><br>
        <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
        <label for="vehicle2"> I have a car</label><br>
        <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
        <label for="vehicle3"> I have a boat</label><br></br>
        https://reactjs.org/docs/forms.html */}



        <h1>Choose the days/week you want to workout</h1>
        <div className='cal-landing-page-section'>
          <button
            className='btn btn-primary'
            onClick={() => setExactDaysWorkingOut(3, auth.user.email)}
          >
            3 days per week
          </button>
          <button
            className='btn btn-primary'
            onClick={() => setExactDaysWorkingOut(4, auth.user.email)}
              >
            4 days per week
          </button>
          <button
            className='btn btn-primary'
            onClick={() => setExactDaysWorkingOut(5, auth.user.email)}
          >
            5 days per week
          </button>
        </div>
      </Fragment>
    ) : (
      /**if no local, but there is a redux state for days */
      <Calendar plan={plan} days={auth.user.days}></Calendar>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { setExactDaysWorkingOut })(DaysPerWeekForm);
