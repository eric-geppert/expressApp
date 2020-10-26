import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  BUY_SUCCESS,
  BUY_FAIL,
  SET_PLAN,
} from './types';
import setAuthToken from '../utils/setAuthToken';

//----
export const setPlan = (workoutPlan, emailInput) => async (dispatch) => {
  console.log('in Auth calling disp');
  console.log('in Auth workoutPlan:', workoutPlan);

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // export const setPlan = (workoutPlan, emailInput) => async (dispatch) => {
    const body = JSON.stringify({
      email: emailInput,
      // email: this.props.auth.user.email,
      plan: workoutPlan,
    });
    await axios
      .put('api/auth/setCustomerPlan', body, config)
      .then((response) => {
        console.log('response', response);
        //todo: check if successful
      });
  } catch (err) {
    console.error('caught error');
    return err;
  }

  dispatch({
    type: SET_PLAN,
    payload: workoutPlan,
  });
};

export const canView = (emailInput) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email: emailInput });
    const can = await axios.post('api/auth/getAllCustomers', body, config);

    const customer1 = can.data.allCustomers.data[0];
    if (
      (can.data =
        !null &&
        customer1.delinquent === false &&
        customer1.subscriptions.total_count > 0)
    ) {
      console.log('yes you can view the full workout');

      dispatch({
        type: BUY_SUCCESS,
        payload: true,
      });
      return true; //need?
    }
    //and has subscription
    dispatch({
      type: BUY_FAIL,
    });
    return false;
  } catch (err) {
    return err;
  }
};

//todo: important: questions: why the heck can I not dispatch from here?
export const unsubscribeMe = (emailInput) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const config2 = {
      headers: {
        'Content-Type': 'text/plain',
      },
    };
    const body = JSON.stringify({ email: emailInput });
    const res = await axios.post('/api/auth/getAllCustomers', body, config);
    const body2 = res.data.allCustomers.data[0].subscriptions.data[0].id;
    const res2 = await axios.put('/api/auth/unsubscribe', body2, config2);

    if (res2) {
      dispatch(
        setAlert(
          'successfully unsubscribed, Profile page will reflect this next time you login',
          'success'
        )
      );
    }
  } catch (err) {
    dispatch(setAlert(err.msg, 'error'));
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    console.log('dispatching email: ' + email + ':from auth reducer');
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data, //user token
      // payload: email
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());

    const res2 = await axios.post('/api/auth/hasPaid', body, config);

    console.log('repsonse 2: ');
    console.log(res2);
    console.log('called /hasPaid res2.data: ' + res2.data);
    dispatch({
      type: BUY_SUCCESS,
      payload: res2.data,
    });
  } catch (err) {
    console.log('err', err);
    if (err.response != undefined) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

export const setPaidToTrue = () => async (dispatch) => {
  dispatch({
    type: BUY_SUCCESS,
    payload: true,
  });
};
