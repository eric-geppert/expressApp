import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import newWorkouts from '../resources/newWorkouts.json';

// import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class MyCalendar extends Component {
  state = {
    selected: null,
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, 'days')),
        title: 'Some title',
        workout: 'coolworkout'
      },
      {
        start: new Date(moment().add(2, 'days')),
        end: new Date(moment().add(2, 'days')),
        title: 'workout2',
        workout: '1000 pushups, 2000 sit ups, 10 miles'
      }
    ]
  };

  render() {
    {
      console.log('newWorkouts', newWorkouts);
    }
    return this.state.selected === null || this.state.selected == undefined ? (
      <div className='App'>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView='month'
          events={this.state.events}
          style={{ height: '100vh' }}
          onDoubleClickEvent={
            e =>
              this.setState({
                selected: newWorkouts[0].contentwrapper.content1
              })
            // this.setState({ selected: e.workout })
          }
        />
      </div>
    ) : (
      <p>{this.state.selected}</p>
    );
  }
}

export default MyCalendar;
