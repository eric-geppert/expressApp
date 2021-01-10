import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';


export const SelectedWorkout = ({ setDaysPerWeek, auth, plan }) => {
// class SelectedWorkout extends Component {
  // state = {
  //   selected: null,
  //   dateStarted: null,
  // };

  
  const renderWorkouts = () => {
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


  return (
      <div className='WorkoutParent'>
      {console.log('selected state: ', this.state.selected)}
      {/** note have to pass onClick reference to a function like I have
       * if just called directly in function wihtout () then it would be
       * calling the function and passing it onClick which results in nothing
       * being done in this case because it just resets the state before it render the below*/}
      <button
        className='btn btn-primary'
        onClick={() => this.setState({ selected: null })}
        // use redux action creater here^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      >
        Back to Calendar view
      </button>
      <h2 style={{ paddingTop: '30px' }}> {this.state.selected.title}</h2>
      {this.renderWorkouts()}
      <p style={{ paddingTop: '30px' }}>
        Note: Choose a weight that is difficult but achievable for the # of
        reps being performed. The goal is to increase weight as the reps
        decrease.
      </p>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(SelectedWorkout);
// export default connect(mapStateToProps, { setDaysPerWeek })(DaysPerWeekForm);
