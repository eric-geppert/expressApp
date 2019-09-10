import React, { Fragment } from 'react';

const WOD = () => {
  return (
    //if want to make this an authenicated page only either put in auth navbar or look at
    //Profiles.js for example
    <Fragment>
      <h1 className='large text-primary'>Workout of the Day:</h1>
      <p className='lead'>
        One workout everyday of the week so you can get a taste of each plan
      </p>
    </Fragment>
  );
};
export default WOD;
