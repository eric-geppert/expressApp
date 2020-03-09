import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import newWorkouts from '../resources/newWorkouts.json';
import { getDateUserStarted } from '../components/gymComponents/GetDateUserStarted';
import { connect } from 'react-redux';

// import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Fragment } from 'react';

const localizer = momentLocalizer(moment);

class MyCalendar extends Component {
  // const MyCalendar = async ({ auth }) => {
  state = {
    selected: null,
    events: [], //dont need now that we return a calendar object
    //with events rather than updating the state of this
    //it was breaking the component
    dateStarted: null
    // getDateUserStarted()
  };

  renderWorkouts = () => {
    var workoutArr = [];

    var i = 0;
    while (this.state.selected.workout[i].content != null) {
      workoutArr.push(<p key={i}>{this.state.selected.workout[i].content}</p>);
      i++;
    }
    return workoutArr;
  };

  setEvents = () => {
    console.log('zzz: ', this.state.dateStarted);
    const currentlyOnDay = this.state.dateStarted;
    var eventArr = [];
    newWorkouts.forEach(function(element, index) {
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
        eventIndex: index
      });
    });
    return (
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView='month'
        events={eventArr}
        style={{ height: '100vh' }}
        onDoubleClickEvent={e => {
          this.setState({
            selected: e
          });
        }}
      />
    );
  };

  helperFunc = async () => {
    var res = await getDateUserStarted(this.props.auth);
    return res.;
  };

  componentWillMount() {
    // setTimeout(function() {
    //   console.log('called helper');
    //   // console.log('auth in loop: ', this.props.auth);
    // }, 4000);

    // while (this.props.auth == undefined) {
    //   setTimeout(function() {
    //     console.log('waited 1 second');
    //   }, 1000);
    // }
    // initialCall() {
    // this.props.getDateUserStarted();
    console.log('auth before: ', this.props.auth);
    // console.log('auth.user: ', this.props.auth.user.email);
    if (this.props.auth.user != undefined) {
      console.log('authz: ', this.props.auth);
      console.log('helper func result: ', this.helperFunc());
      // console.log('getDateUserStarted: ', getDateUserStarted(this.props.auth));
      this.setState({ dateStarted: getDateUserStarted(this.props.auth) });
    } else {
      console.log('auth is undefined');
    }
  }

  render() {
    // return <div>nice </div>;
    // this.initialCall();

    return (
      // <div>
      // {
      this.state.selected === null || this.state.selected == undefined ? (
        this.state.dateStarted === null ||
        this.state.dateStarted == undefined ? (
          // if no startDate and nothing selected
          <div>
            {/* {initialCall()} */}
            <p>If you would like to use this feature you need to register.</p>
            <Calendar
              localizer={localizer}
              defaultDate={new Date()}
              defaultView='month'
              events={this.state.events}
              style={{ height: '100vh' }}
              onDoubleClickEvent={e => {
                this.setState({
                  selected: e
                });
              }}
            />
          </div>
        ) : (
          /**if nothing selected but Has startDate */
          <div>{this.setEvents()}</div>
          // <div>{setEvents()}</div>
        )
      ) : (
        /** if something is selected */
        <div className='WorkoutParent'>
          <h2> {this.state.selected.title}</h2>
          {this.renderWorkouts()}
          {/* {renderWorkouts()} */}
        </div>
      )
      // }
      // </div>
    );
  }
}
// export default MyCalendar;

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(MyCalendar);

// MyCalendarconnect(mapStateToProps);

//todo: fix get email
// getEmail() {
//   return 'a@2.com';
// }

// async getDateUserStarted(emailInput) {
//   emailInput = 'a@2.com';

//   if (emailInput !== null || emailInput != undefined) {
//     //----
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       };
//       const body = JSON.stringify({ email: emailInput });
//       const request = await axios
//         .post('api/auth/getCustomerDate', body, config)
//         .then(response => {
//           var differenceInDays =
//             new Date().getTime() - Date.parse(response.data.date);
//           differenceInDays = differenceInDays / (1000 * 60 * 60 * 24);
//           differenceInDays = Math.floor(differenceInDays);
//           this.setState({ dateStarted: differenceInDays });
//           return differenceInDays;
//         });
//     } catch (err) {
//       return err;
//     }
//   } else return 'invalid email, you must be logged in to use this feature';
// }
