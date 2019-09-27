import React from 'react';
import { Page } from 'react-pdf';
// import propTypes from 'prop-types';
import { connect } from 'react-redux';

var count = 0;

//destructure the auth that we get from props
const renderPages = ({ auth, pages }) => {
  var pageCount = 0;
  var pageElements = [];
  console.log('in render pages: auth.paid: ' + auth.paid);
  if (auth.paid) pageCount = pages;
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

export default connect(mapStateToProps)(renderPages);
