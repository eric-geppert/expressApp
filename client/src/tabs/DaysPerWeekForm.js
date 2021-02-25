import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import { setDaysPerWeek } from './../actions/auth';
import { SelectDaysOfWeek } from './SelectDaysOfWeek';

export const DaysPerWeekForm = ({ setDaysPerWeek, auth, plan }) => {
  // or some other condition??
  return auth.user.days == null || auth.user.days.length === 0 ? (
    /**if no local and no redux state for days */
    // <Fragment>
    //   <h1>Choose the days/week you want to workout</h1>
    //   <div className='cal-landing-page-section'>
    //     <button
    //       className='btn btn-primary'
    //       onClick={() => setDaysPerWeek(3, auth.user.email)}
    //     >
    //       3 days per week
    //     </button>
    //     <button
    //       className='btn btn-primary'
    //       onClick={() => setDaysPerWeek(4, auth.user.email)}
    //         >
    //       4 days per week
    //     </button>
    //     <button
    //       className='btn btn-primary'
    //       onClick={() => setDaysPerWeek(5, auth.user.email)}
    //     >
    //       5 days per week
    //     </button>
    //   </div>
    // </Fragment>
    <div>
      {console.log('auth.user.days select:', auth.user.days)}
      <SelectDaysOfWeek
        email={auth.user.email}
        setDaysPerWeekFucntion={setDaysPerWeek}
      />
    </div>
  ) : (
    /**if no local, but there is a redux state for days */
    <div>
      {console.log('auth.user.days calendar:', auth.user.days)}
      <Calendar plan={plan} days={auth.user.days}></Calendar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { setDaysPerWeek })(DaysPerWeekForm);
