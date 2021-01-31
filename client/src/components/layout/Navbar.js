import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/Calendar'>Calendar</Link>
      </li>
      <li>
        <Link to='/WOD'>WOD</Link>
      </li>
      <li>
        <Link to='/ContactUs'>ContactUs</Link>
      </li>
      <li>
        <Link to='/PersonalizedProgramming'>PersonalizedProgramming</Link>
      </li>
      <li>
        <Link to='/Movement'>Movement Library</Link>
      </li>
      <li>
        <Link to='/Testimonials'>Testimonials</Link>
      </li>
      <li>
        <Link to='/FindMyProgram'>FindMyProgram</Link>
      </li>
      {/*
      <li>
        <Link to='/posts'>Posts</Link>
      </li> */}
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/Calendar'>Calendar</Link>
      </li>
      <li>
        <Link to='/WOD'>WOD</Link>
      </li>
      <li>
        <Link to='/ContactUs'>Contact Us</Link>
      </li>
      <li>
        <Link to='/PersonalizedProgramming'>Personalized Programming</Link>
      </li>
      <li>
        <Link to='/Movement'>Movement Library</Link>
      </li>
      <li>
        <Link to='/Testimonials'>Testimonials</Link>
      </li>
      <li>
        <Link to='/FindMyProgram'>FindMyProgram</Link>
      </li>
      {/* above is added */}
      {/* <li>
        <Link to='/profiles'>Developers</Link>
      </li> */}
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          {/* <i className='fas fa-code' />  */}
          HomePage
          {/* //DevConnectorz */}
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
