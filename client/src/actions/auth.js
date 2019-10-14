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
  BUY_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';

//----
export const canView = emailInput => async dispatch => {
  try {
    // console.log('email', email);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ email: emailInput });
    const can = await axios.post('api/auth/getAllCustomers', body, config);

    // let can = await fetch('api/auth/getAllCustomers', {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: email
    //   // body: auth.users.email
    // // }).then(can => can.json());
    console.log('can: ', can);
    console.log(
      'response can.data.allCustomers.data ',
      can.data.allCustomers.data
    );
    console.log(
      'response can.data.allCustomers.data[0].delinquent ',
      can.data.allCustomers.data[0].delinquent
    );
    console.log(
      'response can.data.allCustomers.data[0].subscriptions.total_count ',
      can.data.allCustomers.data[0].subscriptions.total_count
    );
    // console.log('response canView.data[0].del: ', can.data[0].deliquent);
    // // console.log('response canView.data[0]: ', can.data[0]);
    // console.log('response canView.data.data: ', can.data[0]);
    // console.log('response canView.data.data[0]: ', can.data.data[0]);

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
        payload: true
      });
      return true; //need?
    }
    //and has subscription
    dispatch({
      type: BUY_FAIL
    });
    return false;
  } catch (err) {
    return err;
  }
};

export const unsubscribeMe = emailInput => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const config2 = {
      headers: {
        'Content-Type': 'text/plain'
      }
    };
    const body = JSON.stringify({ email: emailInput });
    console.log('emailInput: ', body);
    const res = await axios.post('/api/auth/getAllCustomers', body, config);
    // console.log('res: ', res);
    // console.log('res.data: ', res.data);
    console.log(
      'res.data.allCustomers.data[0].subscriptions.data[0].id: ',
      res.data.allCustomers.data[0].subscriptions.data[0].id
    );
    const body2 = res.data.allCustomers.data[0].subscriptions.data[0].id;
    const res2 = await axios.put('/api/auth/unsubscribe', body2, config2);

    //dispatch success alert
    console.log('res2', res2);

    // console.log(
    //   'res.data[0].subscriptions.data[0].id',
    //   res.data[0].subscriptions.data[0].id
    // );

    // return res; //take out
  } catch (err) {
    return err;
  }
};

//----

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    console.log('dispatching email: ' + email + ':from auth reducer');
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data //user token
      // payload: email
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

    const res2 = await axios.post('/api/auth/hasPaid', body, config);

    console.log('repsonse 2: ');
    console.log(res2);
    console.log('called /hasPaid res2.data: ' + res2.data);
    dispatch({
      type: BUY_SUCCESS,
      payload: res2.data
    });
  } catch (err) {
    console.log('err', err);
    if (err.response != undefined) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// export const checkPaid = (email, password) => async dispatch => {
//   console.log('inside checkPaid in auth actions');
//   const config = {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };

//   const body = JSON.stringify({ email, password });

//   try {
//     const res = await axios.post('/api/auth/hasPaid', body, config);

//     dispatch({
//       type: BUY_SUCCESS
//       // payload: res.data
//     });

//     dispatch(loadUser());
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: BUY_FAIL
//     });
//   }
// };

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

export const setPaidToTrue = () => async dispatch => {
  dispatch({
    type: BUY_SUCCESS,
    payload: true
  });
};
