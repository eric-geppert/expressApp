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

  // const renderPage = () => {
  //   console.log('inside renderPage');
  //   count++;
  //   console.error('iteration: ', count);
  //   var pageCount = 0;
  //   console.log(
  //     'this.props.isAutheenticated in PDF renderPage: ',
  //     this.props.isAuthenticated
  //   );
  //   var pageElements = [];
  //   var auth = this.props.isAuthenticated;
  //   console.log('auth: ', auth);
  //   console.log('this.props.pages: ', this.props.pages);
  //   if (auth.isAuthenticated == true) {
  //     pageCount = this.props.pages;
  //     console.log('true: setting pageCount to: ', pageCount);
  //   }
  //   {
  //     pageCount = 2;
  //     console.log('false: setting pageCount to: ', pageCount);
  //   }

  //   console.log('pages', pageCount);
  //   for (var i = 1; i < pageCount; i++)
  //     pageElements.push(
  //       <Page key={i} pageNumber={i} onLoadError={console.error} />
  //     );
  //   return pageElements;
  // };

  // render() {
  return (
    console.log(hardcodedFilePath),
    (
      // <Document file={this.rednerWorkout(this.props.file)}>
      <Document file={rednerWorkout(hardcodedFilePath)}>
        {/* file={this.rednerWorkout(hardcodedFilePath)}> */}
        {/* {this.renderPage()} */}
        {console.log('inside doc object')}
        {/* {testPage} */}
        <RenderPages />
        {/* <Page key={1} pageNumber={1} onLoadError={console.error} />; */}
        {/* {renderPage} */}
      </Document>
    )
  );
  // }
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
