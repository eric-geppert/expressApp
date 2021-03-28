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
import { ExploreOffOutlined } from '@material-ui/icons';

export const PRtracker = ({ auth, addWeightElement }) => {
  const [formData, setFormData] = useState({
    weight: '',
    dateRecorded: '',
    stateChanged: false,
    // smallestWeight: 500,
    // biggestWeight: 0,
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
    var bigTemp = 0;
    var smallTemp = 500;

    /** need to have 2 for loops for bubble sort, but only need one to find biggest/smallest weights */
    for (i = 0; i < arr.length; i++) {
      if (arr[i].weight > bigTemp) bigTemp = arr[i].weight;
      if (arr[i].weight < smallTemp) smallTemp = arr[i].weight;
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
    return [arr, smallTemp, bigTemp];
  };

  const renderChart = () => {
    var data = [];
    var values = bubbleSort(auth.user.weightTracker);
    var biggestWeight = Number(values[2]) + 10;
    var smallestWeight = Number(values[1]) - 10;
    var inOrderArr = values[0];

    inOrderArr.forEach(function (value, index) {
      //   data.push({ x: value.dateRecorded, y: value.weight });
      data.push({ x: new Date(value.dateRecorded), y: value.weight });
    });

    return (
      <Fragment>
        <XYPlot
          xType='time'
          xDomain={[data[0].x, data[inOrderArr.length - 1].x]}
          yDomain={[smallestWeight, biggestWeight]}
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

  const checkIfUserHasWeights = () => {
    if (auth.user.weightTracker.length === 0)
      return <div>user has no Weights yet</div>;
    else if (auth.user.weightTracker.length === 1)
      return (
        <div>
          You only have one weight, add another on a different date to start
          your graph
        </div>
      );
    else return renderChart();
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
      {auth.user == undefined ? <p>loading</p> : checkIfUserHasWeights()}
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  /** must have return here for component to update on redux state change*/
  return { auth: state.auth };
};
export default connect(mapStateToProps, { addWeightElement })(PRtracker);
