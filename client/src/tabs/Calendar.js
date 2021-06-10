import React, { Fragment } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import HIITWorkouts from '../resources/HIITWorkouts.json';
import HIITWorkoutsTrial from '../resources/HIITWorkoutsTrial.json';
import HomeWorkouts from '../resources/AtHomeTotalBody.json';
import HomeWorkoutsTrial from '../resources/AtHomeTotalBodyTrial.json';
import MuscleWorkouts from '../resources/BuildMuscleAndSize.json';
import MuscleWorkoutsTrial from '../resources/BuildMuscleAndSizeTrial.json';
import ConditoningWorkouts from '../resources/ConditioningAndWeightLoss.json';
import ConditoningWorkoutsTrial from '../resources/ConditioningAndWeightLossTrial.json';
import TotalBodyTransformation from '../resources/TotalBodyTransformation.json';
import TotalBodyTransformationTrial from '../resources/TotalBodyTransformationTrial.json';
import { CalculateEventsPerWeek } from '../components/auth/CalculateEventsPerWeek';
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { setSelectedCalendarWorkout } from '../actions/auth';

const localizer = momentLocalizer(moment);

export const MyCalendar = ({ auth, setSelectedCalendarWorkout }) => {
  const renderWorkouts = () => {
    var workoutArr = [];
    var i = 0;
    const workout = auth.user.selectedCalendarWorkout.workout;
    console.log(
      'pre eric_workout title:',
      auth.user.selectedCalendarWorkout.title
    );

    /** NEED TO KEEP LAST LINE OF EVERY WORKOUT AS NULL */
    while (workout[i] != undefined && workout[i].content != null) {
      workoutArr.push(<p key={i}>{workout[i].content}</p>);
      i++;
    }
    return workoutArr;
  };

  const findWorkoutOption = (shortPlan) => {
    switch (shortPlan) {
      case 'HIITtrial':
        return HIITWorkoutsTrial;
      case 'HOMEtrial':
        return HomeWorkoutsTrial;
      case 'MUSCLEtrial':
        return MuscleWorkoutsTrial;
      case 'CONDITIONINGtrial':
        return ConditoningWorkoutsTrial;
      case 'TOTALBODYtrial':
        return TotalBodyTransformationTrial;
      case 'HIIT':
        return HIITWorkouts;
      case 'HOME':
        return HomeWorkouts;
      case 'MUSCLE':
        return MuscleWorkouts;
      case 'CONDITIONING':
        return ConditoningWorkouts;
      case 'TOTALBODY':
        return TotalBodyTransformation;
      case null:
        return null;
      default:
        console.log('WorkoutPlan passed does not exist'); //todo change to HIIT?
    }
  };

  const setEvents = () => {
    var newWorkouts = '';
    if (auth.paid === true) newWorkouts = findWorkoutOption(auth.user.plan);
    else newWorkouts = findWorkoutOption(auth.user.plan + 'trial');

    /** CalculateEventsPerWeek(entireWorkout arrary, date user started program, days per week user is working out) */
    var actuallyReturns = CalculateEventsPerWeek(
      newWorkouts,
      auth.user.date,
      auth.user.days
    );

    return (
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView='month'
        events={actuallyReturns}
        style={{ height: '100vh' }}
        onDoubleClickEvent={(e) => {
          setSelectedCalendarWorkout(e);
        }}
      />
    );
  };
  //else has StartDate and nothing selected
  return auth.user.selectedCalendarWorkout !== null &&
    auth.user.selectedCalendarWorkout !== undefined ? (
    <Fragment>
      <div className='WorkoutParent'>
        <button
          className='btn btn-primary'
          onClick={() => {
            setSelectedCalendarWorkout(null);
          }}
        >
          Back to Calendar view
        </button>
        <h2 style={{ paddingTop: '30px' }}>
          {' '}
          {auth.user.selectedCalendarWorkout.title}
        </h2>
        <hr></hr>
        {renderWorkouts()}
        <p style={{ paddingTop: '30px' }}>
          Note: Choose a weight that is difficult but achievable for the # of
          reps being performed. The goal is to increase weight as the reps
          decrease.
        </p>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <h3 style={{ paddingBottom: '30px' }}>
        Double click on any workout to view it.{' '}
      </h3>
      <div>{setEvents()}</div>
    </Fragment>
  );
};
// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });
const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps, {
  setSelectedCalendarWorkout,
  // renderWorkouts,
})(MyCalendar);
