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
import { ThreeDayPlan } from '../components/auth/ThreeDayPlan';
import { FourDayPlan } from '../components/auth/FourDayPlan';
import { FiveDayPlan } from '../components/auth/FiveDayPlan';
// import { getDateUserStarted } from '../components/gymComponents/GetDateUserStarted';
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { setSelectedCalendarWorkout } from '../actions/auth';


const localizer = momentLocalizer(moment);

export const MyCalendar = ({ auth, setSelectedCalendarWorkout }) => {

  const renderWorkouts = () => {
    var workoutArr = [];
    var i = 0;
    const workout = auth.user.selectedCalendarWorkout.workout

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
    //adjust for currently on day***************** todo
    // const currentlyOnDay = this.state.dateStarted;
    var newWorkouts = findWorkoutOption(auth.user.plan);

    var actuallyReturns;
    switch (auth.user.days) {
      case 3:
        actuallyReturns = ThreeDayPlan(newWorkouts, 0);
        // this.state.dateStarted;
        //dateStarted is diff in days
        break;
      case 4:
        actuallyReturns = FourDayPlan(newWorkouts);
        break;
      case 5:
        actuallyReturns = FiveDayPlan(newWorkouts);
        break;
      case null:
        console.log('auth.user.days is null');
        break;
      default:
        console.log('workout days passed does not exist');
    };
    
    //now adjust actually returns days
    // actuallyReturns.forEach(element) {
    //   console.log('element.start: ', element.start);
    //   // element.start
    // });

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
  return  auth.user.selectedCalendarWorkout !== null && auth.user.selectedCalendarWorkout !== undefined ? 
        <Fragment>
          <div className='WorkoutParent'>
          <button
              className='btn btn-primary'
              onClick={() => {setSelectedCalendarWorkout(null)}}
          >
              Back to Calendar view
          </button>
          <h2 style={{ paddingTop: '30px' }}> title</h2>
          {renderWorkouts()}
          <p style={{ paddingTop: '30px' }}>
              Note: Choose a weight that is difficult but achievable for the # of
              reps being performed. The goal is to increase weight as the reps
              decrease.
          </p>
          </div>
        </Fragment>
      :
      <Fragment>
        <h3 style={{ paddingBottom: '30px' }}>
          Double click on any event to view it.{' '}
        </h3>
        <div>{setEvents()}</div>
      </Fragment>      
        
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { setSelectedCalendarWorkout })(MyCalendar);