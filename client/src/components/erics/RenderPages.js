import React from 'react';
import { Page } from 'react-pdf';
// import propTypes from 'prop-types';
import { connect } from 'react-redux';

var count = 0;

//destructure the auth that we get from props
const renderPages = ({ auth, pages }) => {
  console.log('inside renderPages');
  count++;
  console.log('iteration: ', count);
  var pageCount = 0;
  console.log(
    'auth.isAutheenticated in PDF renderPage: ',
    auth.isAuthenticated
  );
  var pageElements = [];
  console.log('auth: ', auth.isAuthenticated);
  console.log('pages: ', pages);
  if (auth.isAuthenticated) {
    pageCount = pages;
    console.log('true: setting pageCount to: ', pageCount);
  } else {
    pageCount = 2;
    console.log('false: setting pageCount to: ', pageCount);
  }

  console.log('pages', pageCount);
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
