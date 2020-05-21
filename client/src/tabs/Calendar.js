import React, { Component, Fragment } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import TemplateWorkouts from '../resources/TemplateWorkouts.json';
import HIITWorkouts from '../resources/HIITWorkouts.json';
import HIITWorkoutsTrial from '../resources/HIITWorkoutsTrial.json';
import HomeWorkouts from '../resources/AtHomeTotalBody.json';
import HomeWorkoutsTrial from '../resources/AtHomeTotalBodyTrial.json';
import MuscleWorkouts from '../resources/BuildMuscleAndSize.json';
import MuscleWorkoutsTrial from '../resources/BuildMuscleAndSizeTrial.json';
import ConditoningWorkouts from '../resources/ConditioningAndWeightLoss.json';
import ConditoningWorkoutsTrial from '../resources/ConditioningAndWeightLossTrial.json';

// import { getDateUserStarted } from '../components/gymComponents/GetDateUserStarted';
import { connect } from 'react-redux';
import axios from 'axios';

// import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class MyCalendar extends Component {
  state = {
    selected: null,
    dateStarted: null,
  };

  returnToCalView = () => {
    console.log('inner Button clicked');
    this.setState({ selected: null });
  };

  renderWorkouts = () => {
    var workoutArr = [];
    var i = 0;
    /** NEED TO KEEP LAST LINE OF EVERY WORKOUT AS NULL */
    while (
      this.state.selected.workout[i] != undefined &&
      this.state.selected.workout[i].content != null
    ) {
      workoutArr.push(<p key={i}>{this.state.selected.workout[i].content}</p>);
      i++;
    }
    return workoutArr;
  };

  findWorkoutOption(shortPlan) {
    switch (shortPlan) {
      case 'HIITtrial':
        return HIITWorkoutsTrial;
      case 'HOMEtrial':
        return HomeWorkoutsTrial;
      case 'MUSCLEtrial':
        return MuscleWorkoutsTrial;
      case 'CONDITIONINGtrial':
        return ConditoningWorkoutsTrial;
      case 'HIIT':
        return HIITWorkouts;
      case 'HOME':
        return HomeWorkouts;
      case 'MUSCLE':
        return MuscleWorkouts;
      case 'CONDITIONING':
        return ConditoningWorkouts;
      case null:
        return null;
      default:
        console.log('WorkoutPlan passed does not exist'); //todo change to HIIT?
    }
  }

  setEvents = () => {
    const currentlyOnDay = this.state.dateStarted;
    var eventArr = [];
    var newWorkouts = this.findWorkoutOption(this.props.plan);
    // if (this.props.plan == 'HIIT') {
    //   newWorkouts = HIITWorkouts;
    // }

    newWorkouts.forEach(function (element, index) {
      eventArr.push({
        start:
          index - currentlyOnDay < 0
            ? new Date(moment().subtract(currentlyOnDay - index, 'days'))
            : new Date(moment().add(index - currentlyOnDay, 'days')),
        end:
          index - currentlyOnDay < 0
            ? new Date(moment().subtract(currentlyOnDay - index, 'days'))
            : new Date(moment().add(index - currentlyOnDay, 'days')),
        allDay: true,
        title: newWorkouts[index].title,
        workout: newWorkouts[index].contentwrapper,
        eventIndex: index,
      });
    });
    return (
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView='month'
        events={eventArr}
        style={{ height: '100vh' }}
        onDoubleClickEvent={(e) => {
          this.setState({
            selected: e,
          });
        }}
      />
    );
  };

  helperFunc = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({ email: this.props.auth.user.email });
      const request = await axios
        .post('api/auth/getCustomerDate', body, config)
        .then((response) => {
          var differenceInDays =
            new Date().getTime() - Date.parse(response.data.date);
          differenceInDays = differenceInDays / (1000 * 60 * 60 * 24);
          differenceInDays = Math.floor(differenceInDays);
          console.log('diff in daz: ', differenceInDays);
          this.setState({ dateStarted: differenceInDays });

          return differenceInDays;
        });
    } catch (err) {
      console.error('caught error');
      return err;
    }
    return 'invalid email, you must be logged in to use this feature';
  };

  componentWillMount() {
    console.log('auth before: ', this.props.auth);
    if (this.props.auth.user != undefined) {
      console.log('authz: ', this.props.auth);
      console.log('helper func result: ', this.helperFunc());
    } else {
      console.log('auth is undefined');
    }
  }

  render() {
    return this.state.selected === null || this.state.selected == undefined ? (
      this.state.dateStarted === null || this.state.dateStarted == undefined ? (
        // if no startDate and nothing selected
        <div>
          <p>If you would like to use this feature you need to register.</p>
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView='month'
            events={[]}
            style={{ height: '100vh' }}
            onDoubleClickEvent={(e) => {
              this.setState({
                selected: e,
              });
            }}
          />
        </div>
      ) : (
        /**if nothing selected but Has startDate */
        <Fragment>
          <h3 style={{ paddingBottom: '30px' }}>
            Double click on any event to view it.{' '}
          </h3>
          <div>{this.setEvents()}</div>
        </Fragment>
      )
    ) : (
      /** if something is selected */
      <div className='WorkoutParent'>
        {console.log('selected state: ', this.state.selected)}
        {/** note have to pass onClick reference to a function like I have
         * if just called directly in function wihtout () then it would be
         * calling the function and passing it onClick which results in nothing
         * being done in this case because it just resets the state before it render the below*/}
        <button
          className='btn btn-primary'
          onClick={() => this.returnToCalView()}
        >
          {/* this.setState({ selected: null })> */}
          Back to Calendar view
        </button>
        <h2 style={{ paddingTop: '30px' }}> {this.state.selected.title}</h2>
        {this.renderWorkouts()}
        <p style={{ paddingTop: '30px' }}>
          Note: Choose a weight that is difficult but achievable for the # of
          reps being performed. The goal is to increase weight as the reps
          decrease.
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(MyCalendar);
