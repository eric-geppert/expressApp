import moment from 'moment';

//todo change name daysOfTheWeek -> daysOfWeek
export const CalculateEventsPerWeek = (
  workoutArray,
  dateStarted,
  daysOfTheWeek
) => {
  if (
    daysOfTheWeek === undefined ||
    daysOfTheWeek === null ||
    daysOfTheWeek.length === 0
  )
    console.error('daysOfTheWeek is null, undefined, or 0');
  if (dateStarted === undefined || dateStarted === null)
    console.error('dateStarted is null or undefined');

  //todo: ADD ERROR CATCHES IF INIITY OR ZERO HERE
  const totalWeeks = Math.ceil(workoutArray.length / daysOfTheWeek.length);
  const daysToAdjustForStartingDay = moment().isoWeekday();
  var eventArr = [];
  var finalDate;
  var totalIndex = 0;

  var currentWeek;
  var currentDayOfTheWeek;
  /**start at day 1 being monday 7 being sunday*/
  /**add 7 for each week */
  for (currentWeek = 0; currentWeek < totalWeeks; currentWeek++) {
    /**plus the number for the particular day(s) the user selcted to workout wednesday +3 */
    for (
      currentDayOfTheWeek = 0;
      currentDayOfTheWeek < daysOfTheWeek.length;
      currentDayOfTheWeek++
    ) {
      /**if not at the end of the total list of workouts */
      if (totalIndex < workoutArray.length) {
        /**create a day starting in reference to date user started not today! */
        finalDate = new Date(
          moment(dateStarted).add(
            currentWeek * 7 +
              daysOfTheWeek[currentDayOfTheWeek] -
              daysToAdjustForStartingDay,
            'days'
          )
        );
        /** and not before the first day user started */
        if (moment(finalDate) >= moment(dateStarted)) {
          /**add it to event array to be rendered */
          eventArr.push({
            start: finalDate,
            end: finalDate,
            allDay: true,
            title: workoutArray[totalIndex].title,
            workout: workoutArray[totalIndex].contentwrapper,
            eventIndex: totalIndex,
          });
          totalIndex++;
        }
      }
    }
  }

  return eventArr;
};
