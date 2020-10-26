import moment from 'moment';

export const ThreeDayPlan = (workoutArray, currentlyOnDay) => {
  //todo adjust for currently on day***************** todo *****************
  //   const currentlyOnDay = this.state.dateStarted;
  var eventArr = [];
  // var workoutArray = this.findWorkoutOption(this.props.plan);

  var x;
  var weekAdjustment;
  workoutArray.forEach(function (element, index) {
    x = index % 3;

    weekAdjustment = Math.floor(index / 3) * 2;
    if (x == 0) {
      if (index < 3) {
        eventArr.push({
          start: new Date(moment().subtract(currentlyOnDay, 'days')),
          end: new Date(moment().subtract(currentlyOnDay, 'days')),
          allDay: true,
          title: workoutArray[index].title,
          workout: workoutArray[index].contentwrapper,
          eventIndex: index,
        });
      } else {
        if (7 * (index - weekAdjustment) - currentlyOnDay > 0) {
          eventArr.push({
            start: new Date(
              moment().add(
                7 * (index - weekAdjustment) - currentlyOnDay,
                'days'
              )
            ),
            end: new Date(
              moment().add(
                7 * (index - weekAdjustment) - currentlyOnDay,
                'days'
              )
            ),
            allDay: true,
            title: workoutArray[index].title,
            workout: workoutArray[index].contentwrapper,
            eventIndex: index,
          });
        } else {
          eventArr.push({
            start: new Date(
              moment().subtract(
                7 * (index - weekAdjustment) + (currentlyOnDay - index),
                'days'
              )
            ),
            end: new Date(
              moment().subtract(
                7 * (index - weekAdjustment) + (currentlyOnDay - index),
                'days'
              )
            ),
            allDay: true,
            title: workoutArray[index].title,
            workout: workoutArray[index].contentwrapper,
            eventIndex: index,
          });
        }
      }
    } else if (x == 1) {
      if (index < 3) {
        if (index + 2 - currentlyOnDay > 0) {
          eventArr.push({
            start: new Date(moment().add(index + 2 - currentlyOnDay, 'days')),
            end: new Date(moment().add(index + 2 - currentlyOnDay, 'days')),
            allDay: true,
            title: workoutArray[index].title,
            workout: workoutArray[index].contentwrapper,
            eventIndex: index,
          });
        } else {
          eventArr.push({
            start: new Date(
              moment().subtract(currentlyOnDay - (index + 2), 'days')
            ),
            end: new Date(
              moment().subtract(currentlyOnDay - (index + 2), 'days')
            ),
            allDay: true,
            title: workoutArray[index].title,
            workout: workoutArray[index].contentwrapper,
            eventIndex: index,
          });
        }
      } else {
        /**  */
        if (7 * (index - 1 - weekAdjustment) + 2 - currentlyOnDay > 0) {
          eventArr.push({
            start: new Date(
              moment().add(
                (index - 1 - weekAdjustment) * 7 + 2 - currentlyOnDay,
                'days'
              )
            ),
            end: new Date(
              moment().add(
                (index - 1 - weekAdjustment) * 7 + 2 - currentlyOnDay,
                'days'
              )
            ),
            allDay: true,
            title: workoutArray[index].title,
            workout: workoutArray[index].contentwrapper,
            eventIndex: index,
          });
        } else {
          eventArr.push({
            start: new Date(
              moment().subtract(
                currentlyOnDay - (index - 1 - weekAdjustment) * 7 + 2,
                'days'
              )
            ),
            end: new Date(
              moment().subtract(
                currentlyOnDay - (index - 1 - weekAdjustment) * 7 + 2,
                'days'
              )
            ),
            allDay: true,
            title: workoutArray[index].title,
            workout: workoutArray[index].contentwrapper,
            eventIndex: index,
          });
        }
      }
    } else if (x == 2) {
      if (index < 3) {
        if (index + 4 - currentlyOnDay > 0) {
          eventArr.push({
            start: new Date(moment().add(index + 4 - currentlyOnDay, 'days')),
            end: new Date(moment().add(index + 4 - currentlyOnDay, 'days')),
            allDay: true,
            title: workoutArray[index].title,
            workout: workoutArray[index].contentwrapper,
            eventIndex: index,
          });
          //day 2 - indx 3=1
        } else {
          eventArr.push({
            start: new Date(
              moment().subtract(currentlyOnDay - (index + 4), 'days')
            ),
            end: new Date(
              moment().subtract(currentlyOnDay - (index + 4), 'days')
            ),
            allDay: true,
            title: workoutArray[index].title,
            workout: workoutArray[index].contentwrapper,
            eventIndex: index,
          });
        }
        // eventArr.push({
        //   start: new Date(moment().add(4, 'days')),
        //   end: new Date(moment().add(4, 'days')),
        //   allDay: true,
        //   title: workoutArray[index].title,
        //   workout: workoutArray[index].contentwrapper,
        //   eventIndex: index,
        // });
      } else {
        /** rest of them */
        if (7 * (index - 1 - weekAdjustment) + 4 - currentlyOnDay > 0) {
          eventArr.push({
            start: new Date(
              moment().add(
                (index - 1 - weekAdjustment) * 7 + 4 - currentlyOnDay,
                'days'
              )
            ),
            end: new Date(
              moment().add(
                (index - 1 - weekAdjustment) * 7 + 4 - currentlyOnDay,
                'days'
              )
            ),
            allDay: true,
            title: workoutArray[index].title,
            workout: workoutArray[index].contentwrapper,
            eventIndex: index,
          });
        } else {
          eventArr.push({
            start: new Date(
              moment().subtract(
                currentlyOnDay - (index - 1 - weekAdjustment) * 7 + 4,
                'days'
              )
            ),
            end: new Date(
              moment().subtract(
                currentlyOnDay - (index - 1 - weekAdjustment) * 7 + 4,
                'days'
              )
            ),
            allDay: true,
            title: workoutArray[index].title,
            workout: workoutArray[index].contentwrapper,
            eventIndex: index,
          });
        }
        // eventArr.push({
        //   start: new Date(
        //     moment().add((index - 2 - weekAdjustment) * 7 + 4, 'days')
        //   ),
        //   end: new Date(
        //     moment().add((index - 2 - weekAdjustment) * 7 + 4, 'days')
        //   ),
        //   allDay: true,
        //   title: workoutArray[index].title,
        //   workout: workoutArray[index].contentwrapper,
        //   eventIndex: index,
        // });
      }
    } else console.log('not possible');
  });
  return eventArr;
};
