import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  BUY_SUCCESS,
  BUY_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  email: null,
  paid: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  console.log('payload in reducer: ' + payload);
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token); //question: just added why was it not there?
      console.log('payload.token' + payload.token);
      return {
        ...state,
        ...payload,
        // isAuthenticated: true,
        //^since our profiles aren't personalized we can do this to fix our lag issue
        //with paid
        // user: payload,
        auth: payload

        // token: payload.token
      };
    //adding above so can get email to adjust paid variable later
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    //todo: add email here as well
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case BUY_SUCCESS:
      return {
        ...state,
        paid: true //question: need to set paid inside of user to true?? how?
      };
    case BUY_FAIL:
      return {
        state
      };
    //todo: add error failures for this
    default:
      return state;
  }
}
