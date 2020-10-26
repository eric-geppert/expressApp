import moment from 'moment';

export const FourDayPlan = (workoutArray) => {
  var eventArr = [];
  var x;
  var weekAdjustment;
  workoutArray.forEach(function (element, index) {
    x = index % 4;
    weekAdjustment = Math.floor(index / 4) * 3;
    if (x == 0) {
      if (index < 4) {
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
          // 8-3=5*7=35
          // 14+1=15
          start: new Date(moment().add(7 * (index - weekAdjustment), 'days')),
          end: new Date(moment().add(7 * (index - weekAdjustment), 'days')),
          allDay: true,
          title: workoutArray[index].title,
          workout: workoutArray[index].contentwrapper,
          eventIndex: index,
        });
      }
    } else if (x == 1) {
      if (index < 4) {
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
      if (index < 4) {
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
    } else if (x == 3) {
      if (index < 4) {
        eventArr.push({
          start: new Date(moment().add(5, 'days')),
          end: new Date(moment().add(5, 'days')),
          allDay: true,
          title: workoutArray[index].title,
          workout: workoutArray[index].contentwrapper,
          eventIndex: index,
        });
      } else {
        eventArr.push({
          start: new Date(
            moment().add((index - 3 - weekAdjustment) * 7 + 5, 'days')
          ),
          end: new Date(
            moment().add((index - 3 - weekAdjustment) * 7 + 5, 'days')
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
