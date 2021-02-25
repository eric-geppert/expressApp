import React, { useState } from 'react';
import MultiSelect from 'react-multi-select-component';
import { connect } from 'react-redux';
import { setDaysPerWeek } from './../actions/auth';
import './SelectDaysOfWeek.css';

export const SelectDaysOfWeek = ({ setDaysPerWeekFucntion, auth, email }) => {
  const [selected, setSelected] = useState([]);

  const options = [
    { label: 'Monday', value: 1 },
    { label: 'Tuesday', value: 2 },
    { label: 'Wednesday', value: 3 },
    { label: 'Thursday', value: 4 },
    { label: 'Friday', value: 5 },
    { label: 'Saturday', value: 6 },
    { label: 'Sunday', value: 7 },
  ];

  const handleSubmit = () => {
    console.log('this.selected', selected);
    var newArr = [];
    selected.forEach((element) => newArr.push(element.value));
    /** need to put days array in order for rendering workouts in order later */
    newArr.sort(function (a, b) {
      return a - b;
    });
    console.log('in SelectDaysOfWeek auth:', auth);
    setDaysPerWeekFucntion(newArr, email);
  };

  return (
    <div className='daysForm'>
      <h1>Select Days of the week you want to workout</h1>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={'Select'}
      />
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
};
const mapStateToProps = (state) => {
  /** must have return here for component to update on redux state change*/
  return { auth: state.auth };
};
export default connect(mapStateToProps)(SelectDaysOfWeek);
