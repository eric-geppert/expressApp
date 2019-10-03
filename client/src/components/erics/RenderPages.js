import React from 'react';
import { Page } from 'react-pdf';
// import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { canView } from '../../actions/auth';

//destructure the auth that we get from props
const renderPages = ({ auth, pages, canView }) => {
  var pageCount = 0;
  var pageElements = [];

  // componentWillMount() ???
  // const canViewFullContent = (auth.user.email) => {
  //   return "blah";
  // }
  // canView('a19@me.com');
  // console.log('on other side');
  // console.log(canView('a19@me.com'));
  // console.log('(renderPages.js) auth.users.email', auth.users.email);

  // console.log('in render pages: auth.paid: ' + auth.paid);

  // if (auth.paid) pageCount = pages;

  // if (canView(auth.users.email)) pageCount = pages;
  // console.log('value going into pageCount: ', canView('a18@me.com'));
  // if (auth.user != null) {
  //   console.log('(renderPages.js) auth.user.email', auth.user.email);
  // const output = canView(auth.user.email); //make async??
  // console.log('outputtttttttttttt: ', output);
  // if (canView(auth.user.email) === true) pageCount = pages;
  // if (output === true) pageCount = pages;

  canView(auth.user.email);
  if (auth.paid === true) pageCount = pages;
  else pageCount = 2;
  // }
  // else {
  //   pageCount = 2;
  //   console.log('auth.user is null: auth.user: ', auth.user);
  // }

  for (var i = 1; i < pageCount; i++)
    pageElements.push(
      <Page key={i} pageNumber={i} onLoadError={console.error} />
    );
  return pageElements;
};
// export const renderPages;

// any.propTypes = {
//   auth: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { canView }
)(renderPages);
