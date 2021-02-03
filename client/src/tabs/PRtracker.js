import React, { useState, Fragment } from 'react'; //had Component
import { connect } from 'react-redux';
// import { addWeightElement } from '../../actions/auth';
import { addWeightElement } from '../actions/auth';
import moment from 'moment';

export const PRtracker = ({ auth, addWeightElement }) => {
  const [formData, setFormData] = useState({
    weight: 0,
    dateRecorded: '',
    stateChanged: false,
    /** input format mm/dd/yyyy */
    /** sent to backend as yyyy/dd/mm */
  });

  const { weight, dateRecorded } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    addWeightElement(auth.user.email, formData);
  };

  //todo swap to reverse for more effecient search if people put dates in in reverse order over time????
  const bubbleSort = (arr) => {
    //todo first case everything as a moment then sort that arrary?
    console.log('array pre swap:', arr);

    var i;
    var j;
    var temp;
    for (i = 0; i < arr.length; i++) {
      for (j = 0; j < arr.length - i - 1; j++) {
        // console.log('moment: ', moment(arr[j].dateRecorded));
        /** casts to a date type compares to see if j is later date then j+1 */
        if (
          moment(arr[j].dateRecorded).diff(
            moment(arr[j + 1].dateRecorded),
            'days'
          ) > 0
        ) {
          /** if so swap */
          temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          console.log('array post swap:', arr);
        }
      }
    }
    return arr;
  };

  const renderWeights = () => {
    var weightArr = [];
    // todo put in order!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //test by adding a new one

    // todo use better sort algorithm? won't matter until later
    var inOrderArr = bubbleSort(auth.user.weightTracker);
    inOrderArr.forEach(function (value, index) {
      weightArr.push(
        <p key={index}>
          weight: {value.weight}, date: {value.dateRecorded}
        </p>
      );
    });
    return weightArr;
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <p>Note: can only input 1 weight per day</p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Current Weight (lbs)'
            name='weight'
            value={weight}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='date'
            placeholder='date recorded'
            name='dateRecorded'
            value={dateRecorded}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Submit' />
      </form>
      {auth.user == undefined ? <p>loading</p> : renderWeights()}
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  /** must have return here for component to update on redux state change*/
  return { auth: state.auth };
};
export default connect(mapStateToProps, { addWeightElement })(PRtracker);
