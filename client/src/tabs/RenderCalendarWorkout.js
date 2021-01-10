//auth and any redux action creater is undefined in this file and I can't figure out why
// this file is unused but keeping to figure out why it didn't work






import { relativeTimeRounding } from 'moment';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setSelectedCalendarWorkout } from './../actions/auth'
// '../actions/auth';
import { SET_SELECTED_WORKOUT } from '../actions/types';


//make state for selected calendar workout in redux
// 1 make action for dispatch selected state
export const RenderCalendarWorkout = ({ auth, setSelectedCalendarWorkout, seclectedPropPassed }) => {

// export const RenderCalendarWorkout = ({ auth, setSelectedCalendarWorkout, seclectedPropPassed }) => {
// export const RenderCalendarWorkout = ({ auth, seclectedPropPassed }) => {
    // const [formData, setFormData] = useState({
    //     currentlySelected: ''
    //     //todo set set default to '' and check for this instead?
    //   });
    //   const { currentlySelected } = formData;
    //   setFormData({ ...formData, plan: workoutPlan });


    const renderWorkouts = () => {
        console.log("in renerworkouts")

        var workoutArr = [];
        var i = 0;
        /** NEED TO KEEP LAST LINE OF EVERY WORKOUT AS NULL */
        console.log("zz seclectedPropPassed:", seclectedPropPassed)
        var seclectedProp = seclectedPropPassed.workout
        // auth.user.selectedCalendarWorkout.workout
        // currentlySelected
        while (
            seclectedProp[i]!== undefined &&
            seclectedProp[i].content !== null
        ) {
          workoutArr.push(<p key={i}>{seclectedProp[i].content}</p>);
          i++;
        }
        return workoutArr;
      };

      const localsetSelectedCalendarWorkout = (selected) => async dispatch => {
        console.log("in actions auth, calling setSelectedCalendarWorkout selected is:", selected)
      
        dispatch({
          type: SET_SELECTED_WORKOUT,
          payload: selected,
        });
        return ""
      };
      const testme = (pp) =>  {
        console.log("testing:", pp)
        // var variable=  
        return setSelectedCalendarWorkout(pp)
        // console.log("variable:", variable)
      }

        
    return ( 
        // auth !== undefined ?(
        // currentlySelected!==undefined && currentlySelected !== null ?(

            <div className='WorkoutParent'>
            {/** note have to pass onClick reference to a function like I have
             * if just called directly in function wihtout () then it would be
             * calling the function and passing it onClick which results in nothing
             * being done in this case because it just resets the state before it render the below*/}
            <button
                className='btn btn-primary'
                onClick={() => {testme(null)}}
                // onClick={() => {               localsetSelectedCalendarWorkout(null);}}
                // onClick={(e) => {               setSelectedCalendarWorkout(null);}}
                // onClick= {setSelectedCalendarWorkout(null)}
            >
                Back to Calendar view
            </button>
            {/* <h2 style={{ paddingTop: '30px' }}> {currentlySelected.title}</h2> */}
            {/* <h2 style={{ paddingTop: '30px' }}> {seclectedProp.title}</h2> */}
            {renderWorkouts()}
            <p style={{ paddingTop: '30px' }}>
                Note: Choose a weight that is difficult but achievable for the # of
                reps being performed. The goal is to increase weight as the reps
                decrease.
            </p>
            </div>
        // ):
        // (
        //     <p>loading </p>
        //     // <p>{reloadme()}</p>
        // )
    )
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
    
// const mapDispatchToProps = dispatch => {
//     return {
//       addItem: () => {
//         dispatch(addItem())
//       }
//     };
//   };
export default connect(mapStateToProps, { setSelectedCalendarWorkout })(RenderCalendarWorkout);

// FIND OUT WHY AUTH IS INITUALLY NULL HERE BUT NOT OTHER FILES
// WHY WON'T COMPONENT UPDATE AFTER THAT CHANGES?
// I have map state to props, and am setting correctly in the reducer