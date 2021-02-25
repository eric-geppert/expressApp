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
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={'Select'}
      />
      <button onClick={() => handleSubmit()}>Submit</button>
      {/* {String(auth.user.email)} */}
    </div>
  );
};
const mapStateToProps = (state) => {
  /** must have return here for component to update on redux state change*/
  return { auth: state.auth };
};
export default connect(mapStateToProps)(SelectDaysOfWeek);
// export default connect(mapStateToProps, { setDaysPerWeek })(SelectDaysOfWeek);

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// import React from 'react';
// import FormatBoldIcon from '@material-ui/icons/FormatBold';
// import FormatItalicIcon from '@material-ui/icons/FormatItalic';
// import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
// import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import ToggleButton from '@material-ui/lab/ToggleButton';
// import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

// export default function ToggleButtonsMultiple() {
//   const [formats, setFormats] = React.useState(() => ['bold', 'italic']);

//   const handleFormat = (event, newFormats) => {
//     setFormats(newFormats);
//   };

//   return (
//     <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting">
//       <ToggleButton value="bold" aria-label="bold">
//         <FormatBoldIcon />
//       </ToggleButton>
//       <ToggleButton value="italic" aria-label="italic">
//         <FormatItalicIcon />
//       </ToggleButton>
//       <ToggleButton value="underlined" aria-label="underlined">
//         <FormatUnderlinedIcon />
//       </ToggleButton>
//       <ToggleButton value="color" aria-label="color" disabled>
//         <FormatColorFillIcon />
//         <ArrowDropDownIcon />
//       </ToggleButton>
//     </ToggleButtonGroup>
//   );
// }
