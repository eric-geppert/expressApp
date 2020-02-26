import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import newWorkouts from '../resources/newWorkouts.json';

// import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const currentlyOnDay = 2; //starts from day 0

class MyCalendar extends Component {
  state = {
    selected: null,
    events: []
  };

  renderWorkouts() {
    var workoutArr = [];

    console.log('this.state:', this.state);
    var i = 0;
    while (this.state.selected.workout[i].content != null) {
      workoutArr.push(<p key={i}>{this.state.selected.workout[i].content}</p>);
      i++;
    }
    return workoutArr;
  }

  componentWillMount() {
    var eventArr = [];
    newWorkouts.forEach(function(element, index) {
      // if (index - currentlyOnDay < 0)
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
      // else
      //   eventArr.push({
      //     start: new Date(moment().add(index - currentlyOnDay, 'days')),
      //     end: new Date(moment().add(index - currentlyOnDay, 'days')),
      //     allDay: true,
      //     title: newWorkouts[index].title,
      //     workout: newWorkouts[index].contentwrapper
      //   });
    });
    this.setState({ events: eventArr });
  }

  render() {
    return this.state.selected === null || this.state.selected == undefined ? (
      <div className='App'>
        {console.log('state: ', this.state)}
        {console.log(
          'newWorkouts[currentlyOnDay].contentwrapper: ',
          newWorkouts[currentlyOnDay]
        )}

        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView='month'
          events={this.state.events}
          // events={this.state.events}
          style={{ height: '100vh' }}
          onDoubleClickEvent={e => {
            //   console.log('e: ', e);
            // }
            this.setState({
              selected: e
            });
            // this.setState({ selected: e.workout })
          }}
        />
      </div>
    ) : (
      <div className='WorkoutParent'>
        {/* {console.log('ee: ', this.state.selected.title)} */}
        <h2> {this.state.selected.title}</h2>
        {this.renderWorkouts()}
      </div>
    );
  }
}

export default MyCalendar;
