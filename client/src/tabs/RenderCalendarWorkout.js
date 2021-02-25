//auth and any redux action creater is undefined in this file and I can't figure out why
// this file is unused but keeping to figure out why it didn't work
import { relativeTimeRounding } from 'moment';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setSelectedCalendarWorkout } from './../actions/auth';
// '../actions/auth';
import { SET_SELECTED_WORKOUT } from '../actions/types';
import { Fragment } from 'react';

export const renderWorkouts = ({ auth }) => {
  var workoutArr = [];
  var i = 0;
  const workout = auth.user.selectedCalendarWorkout.workout;

  /** NEED TO KEEP LAST LINE OF EVERY WORKOUT AS NULL */
  while (workout[i] != undefined && workout[i].content != null) {
    workoutArr.push(<p key={i}>{workout[i].content}</p>);
    i++;
  }
  return workoutArr;
};
// const mapStateToProps = (state) => {
//   return { auth: state.auth };
// };
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(renderWorkouts);
