import moment from 'moment';

export const CalculateEventsPerWeek = (workoutArray, dateStarted, daysPerWeek) => {
  if(daysPerWeek === undefined || daysPerWeek === null)
    console.error("daysPerWeek is null or undefined")
  if(dateStarted === undefined || dateStarted === null)
    console.error("dateStarted is null or undefined")
  var eventArr = [];
  var indexModDaysPerWeek;
  var weekAdjustment;
  var dayOfTheWeekAdjustment;
  var currentWeek;
  var unadjustedForDayUserStarted;
  var finalDate;

  const now = moment();
  const dateStartedMoment = moment(dateStarted);
  const differenceInDaysFromBeginning = dateStartedMoment.diff(now, 'days') //will be a negative number

  
// 1 figure out what week were on (adjusted to have x workouts/week)
// 2 adjust the day to 4(days working out per week) different days that week
// 3 subtract by number of days user has been working on this program
  workoutArray.forEach(function (element, index) {
    indexModDaysPerWeek = index % daysPerWeek;
    weekAdjustment = Math.floor(index / daysPerWeek) * (daysPerWeek-1);
    if(daysPerWeek<5)
        dayOfTheWeekAdjustment = 2 * indexModDaysPerWeek
    else
        dayOfTheWeekAdjustment = indexModDaysPerWeek
    currentWeek = index - indexModDaysPerWeek - weekAdjustment
    unadjustedForDayUserStarted = 7 * currentWeek + dayOfTheWeekAdjustment

    if (unadjustedForDayUserStarted + differenceInDaysFromBeginning >= 0){
                                          // differenceInDaysFromBeginning is negative
        finalDate =new Date(moment().add( unadjustedForDayUserStarted + differenceInDaysFromBeginning, 'days'))
    }
    else{
        finalDate = new Date(moment().subtract( -1* (unadjustedForDayUserStarted + differenceInDaysFromBeginning), 'days'))
    }

    eventArr.push({
        start: finalDate,
        end: finalDate,
        allDay: true,
        title: workoutArray[index].title,
        workout: workoutArray[index].contentwrapper,
        eventIndex: index,
      });
  });

  return eventArr;
};
