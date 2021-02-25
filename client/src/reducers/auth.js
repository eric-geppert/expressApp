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
  BUY_FAIL,
  SET_PLAN,
  SET_DAYS,
  SET_SELECTED_WORKOUT,
  UPDATE_WEIGHTTRACKER_ARRAY,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  email: null,
  paid: null,
  // plan: null, put inside of user object
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  // console.log('payload in reducer: ' + payload);
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token); //question: just added why was it not there?
      return {
        ...state,
        ...payload,
        // isAuthenticated: true,
        //^since our profiles aren't personalized we can do this to fix our lag issue
        //with paid
        // user: payload,
        auth: payload,

        // token: payload.token
      };
    //adding above so can get email to adjust paid variable later
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    //todo: add email here as well
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        paid: false,
      };
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case BUY_SUCCESS:
      return {
        ...state,
        paid: payload, //question: need to set paid inside of user to true?? how?
      };
    case BUY_FAIL:
      return {
        ...state,
        paid: false,
      };
    //todo: add error failures for this
    case SET_PLAN:
      return {
        ...state,
        user: {
          ...state.user,
          plan: payload,
        },
        // plan: payload,
      };
    //todo need to update days to an array?
    case SET_DAYS:
      return {
        ...state,
        user: {
          ...state.user,
          days: payload,
        },
      };
    case SET_SELECTED_WORKOUT:
      return {
        ...state,
        user: {
          ...state.user,
          selectedCalendarWorkout: payload,
        },
      };
    case UPDATE_WEIGHTTRACKER_ARRAY:
      /**only want to add an item to weightTracker array so: keep
       * state of user object, keep state of current array, add new object to array */
      return {
        ...state,
        user: {
          ...state.user,
          weightTracker: [...state.user.weightTracker, payload],
        },
      };
    default:
      return state;
  }
}
