import React, { Component, Fragment } from 'react';
import { Document, Page } from 'react-pdf';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import RenderPages from './RenderPages';

// class MyPDFDocument extends Component {
// ({
//   getProfileById,
//   profile: { profile, loading },
//   auth,
//   match
// })
// props
// var count = 0;
const hardcodedFilePath = '../../img/workouts/AtHomeTotalBody5V1.pdf';
const MyPDFDocument = ({ auth, pages, file }) => {
  // constructor(props) {
  //   super(props);

  // this.state = {
  //   isAuthenticated: false
  // };
  // }

  var rednerWorkout = param => {
    switch (param) {
      case '../../img/workouts/ConditioningWeightLoss5V1.pdf':
        return require('../../img/workouts/ConditioningWeightLoss5V1.pdf');
      case '../../img/workouts/ConditioningWeightLoss4V1.pdf':
        return require('../../img/workouts/ConditioningWeightLoss4V1.pdf');
      case '../../img/workouts/ConditioningWeightLoss3V1.pdf':
        return require('../../img/workouts/ConditioningWeightLoss3V1.pdf');
      case '../../img/workouts/AtHomeTotalBody5V1.pdf':
        return require('../../img/workouts/AtHomeTotalBody5V1.pdf');
      case '../../img/workouts/AtHomeTotalBody4V1.pdf':
        return require('../../img/workouts/AtHomeTotalBody4V1.pdf');
      case '../../img/workouts/AtHomeTotalBody3V1.pdf':
        return require('../../img/workouts/AtHomeTotalBody3V1.pdf');
      case '../../img/workouts/FunctionalFitnessHIIT5V1.pdf':
        return require('../../img/workouts/FunctionalFitnessHIIT5V1.pdf');
      case '../../img/workouts/FunctionalFitnessHIIT4V1.pdf':
        return require('../../img/workouts/FunctionalFitnessHIIT4V1.pdf');
      case '../../img/workouts/FunctionalFitnessHIIT3V1.pdf':
        return require('../../img/workouts/FunctionalFitnessHIIT3V1.pdf');
      case '../../img/workouts/TotalBodyTransformation5V1.pdf':
        return require('../../img/workouts/TotalBodyTransformation5V1.pdf');
      case '../../img/workouts/TotalBodyTransformation4V1.pdf':
        return require('../../img/workouts/TotalBodyTransformation4V1.pdf');
      case '../../img/workouts/TotalBodyTransformation3V1.pdf':
        return require('../../img/workouts/TotalBodyTransformation3V1.pdf');
      default:
        console.log('workout Not found in PDFdocument switch statement');
    }
  };

  return (
    <Document file={rednerWorkout(file)}>
      <RenderPages pages={pages} />
    </Document>
  );
};

// MyPDFDocument.propTypes = {
//   isAuthenticated: propTypes.any.isRequired //what to put instead of any
// };
//todo fix above^

const mapStateToProps = state => ({
  // isAuthenticated: state.isAuthenticatedReducer
  auth: state.auth
});

//need to send an action??
export default connect(mapStateToProps)(MyPDFDocument);

//if have problems with pages out of order visit link later
//https://stackoverflow.com/questions/16480469/how-to-display-whole-pdf-not-only-one-page-with-pdf-js
