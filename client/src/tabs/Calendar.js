import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import newWorkouts from '../resources/newWorkouts.json';
// import { getDateUserStarted } from '../components/gymComponents/GetDateUserStarted';
import { connect } from 'react-redux';
import axios from 'axios';

// import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Fragment } from 'react';

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

  setEvents = () => {
    console.log('zzz: ', this.state.dateStarted);
    const currentlyOnDay = this.state.dateStarted;
    var eventArr = [];
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
    console.log('this.props.auth.user is undefined or null');
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
        <div>{this.setEvents()}</div>
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
        <h2> {this.state.selected.title}</h2>
        {this.renderWorkouts()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(MyCalendar);
