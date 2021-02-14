import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { addWeightElement } from '../actions/auth';
import moment from 'moment';
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  LineSeries,
} from 'react-vis';
import 'react-vis/dist/style.css';

export const PRtracker = ({ auth, addWeightElement }) => {
  const [formData, setFormData] = useState({
    weight: '',
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
    var i;
    var j;
    var temp;
    for (i = 0; i < arr.length; i++) {
      for (j = 0; j < arr.length - i - 1; j++) {
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
        }
      }
    }
    return arr;
  };

  const renderWeights = () => {
    var weightArr = [];
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

  const renderChart = () => {
    var data = [];
    var inOrderArr = bubbleSort(auth.user.weightTracker);
    console.log('date:', inOrderArr);

    inOrderArr.forEach(function (value, index) {
      //   data.push({ x: value.dateRecorded, y: value.weight });
      data.push({ x: new Date(value.dateRecorded), y: value.weight });
    });
    console.log('data[0]:', data[0]);
    console.log('data[0]:', data[inOrderArr.length - 1].x);

    return (
      <Fragment>
        <XYPlot
          xType='time'
          xDomain={[data[0].x, data[inOrderArr.length - 1].x]}
          yDomain={[170, 200]}
          height={500}
          width={1000}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries data={data} />
        </XYPlot>
      </Fragment>
    );
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
      {auth.user == undefined ? <p>loading</p> : renderChart()}
      {/* <div className='displayChart'>
        <XYPlot height={400} width={400}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries data={data} />
        </XYPlot>
      </div> */}
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  /** must have return here for component to update on redux state change*/
  return { auth: state.auth };
};
export default connect(mapStateToProps, { addWeightElement })(PRtracker);
