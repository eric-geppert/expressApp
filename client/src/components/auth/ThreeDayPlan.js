import moment from 'moment';

export const ThreeDayPlan = (workoutArray) => {
  //todo adjust for currently on day***************** todo *****************
  //   const currentlyOnDay = this.state.dateStarted;
  var eventArr = [];
  console.log('initial eventArr: ', eventArr);
  // var workoutArray = this.findWorkoutOption(this.props.plan);

  var x;
  var weekAdjustment;
  workoutArray.forEach(function (element, index) {
    x = index % 3;

    weekAdjustment = Math.floor(index / 3) * 2;
    console.log('index/3: ', Math.floor(index / 3));
    if (x == 0) {
      if (index < 3) {
        eventArr.push({
          start: new Date(),
          end: new Date(),
          allDay: true,
          title: workoutArray[index].title,
          workout: workoutArray[index].contentwrapper,
          eventIndex: index,
        });
      } else {
        eventArr.push({
          start: new Date(moment().add(7 * (index - weekAdjustment), 'days')),
          end: new Date(moment().add(7 * (index - weekAdjustment), 'days')),
          allDay: true,
          title: workoutArray[index].title,
          workout: workoutArray[index].contentwrapper,
          eventIndex: index,
        });
      }
    } else if (x == 1) {
      if (index < 3) {
        eventArr.push({
          start: new Date(moment().add(2, 'days')),
          end: new Date(moment().add(2, 'days')),
          allDay: true,
          title: workoutArray[index].title,
          workout: workoutArray[index].contentwrapper,
          eventIndex: index,
        });
      } else {
        eventArr.push({
          start: new Date(
            moment().add((index - 1 - weekAdjustment) * 7 + 2, 'days')
          ),
          end: new Date(
            moment().add((index - 1 - weekAdjustment) * 7 + 2, 'days')
          ),
          allDay: true,
          title: workoutArray[index].title,
          workout: workoutArray[index].contentwrapper,
          eventIndex: index,
        });
      }
    } else if (x == 2) {
      if (index < 3) {
        eventArr.push({
          start: new Date(moment().add(4, 'days')),
          end: new Date(moment().add(4, 'days')),
          allDay: true,
          title: workoutArray[index].title,
          workout: workoutArray[index].contentwrapper,
          eventIndex: index,
        });
      } else {
        eventArr.push({
          start: new Date(
            moment().add((index - 2 - weekAdjustment) * 7 + 4, 'days')
          ),
          end: new Date(
            moment().add((index - 2 - weekAdjustment) * 7 + 4, 'days')
          ),
          allDay: true,
          title: workoutArray[index].title,
          workout: workoutArray[index].contentwrapper,
          eventIndex: index,
        });
      }
    } else console.log('not possible');
  });
  return eventArr;
};
