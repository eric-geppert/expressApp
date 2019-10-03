import React from 'react';
import { Page } from 'react-pdf';
// import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { canView } from '../../actions/auth';

//destructure the auth that we get from props
const renderPages = ({ auth, pages, canView }) => {
  var pageCount = 0;
  var pageElements = [];

  if (auth.user != null) {
    // console.log('(renderPages.js) auth.user.email', auth.user.email);
    // console.log('(renderPages.js) auth', auth);
  }
  // const canViewFullContent = (auth.user.email) => {
  //   return "blah";
  // }
  canView('a19@me.com');
  console.log('on other side');
  // console.log(canView('a19@me.com'));
  // console.log('(renderPages.js) auth.users.email', auth.users.email);

  // console.log('in render pages: auth.paid: ' + auth.paid);

  // if (auth.paid) pageCount = pages;
  if (canView('a19@me.com')) pageCount = pages;
  else pageCount = 2;

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
