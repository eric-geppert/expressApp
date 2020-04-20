import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Calendar from './Calendar';
import { SET_PLAN } from './../actions/types';
// import { setPlan } from '../actions/auth';
class CalendarLandingPage extends Component {
  state = {
    plan: null,
  };
  /* 
1 check status see if ever picked a plan
2. a) if no: show 5 button options
    -when selected push choice to DB
    -then call Cal with that plan
2. b) if yes 
    -cal cal with that plan
--------
1. assume know and make component
*/
  async asyncHelper(workoutPlan) {
    console.log('workoutPlan in async landingpage: ', workoutPlan);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({
        email: this.props.auth.user.email,
        plan: workoutPlan,
      });
      const request = await axios
        .put('api/auth/setCustomerPlan', body, config)
        .then((response) => {
          console.log('response', response);
          //todo: check if successful
        });
    } catch (err) {
      console.error('caught error');
      return err;
    }
  }
  /**todo: could abstract this out elsewhere. to the backend? how would that work with redux if in the backend? */
  onSubmit(workoutPlan) {
    console.log('clicked');
    this.setState({ plan: workoutPlan });
    this.asyncHelper(workoutPlan);
    // dispatch({
    //   type: SET_PLAN,
    //   payload: workoutPlan,
    // });
  }

  componentWillMount() {
    if (this.props.auth.user != null) {
      if (this.props.auth.user.plan != null) {
        console.log('user not null setting it');
        this.setState({ plan: this.props.auth.user.plan });
      }
    } else {
      //call getplan from db
    }
  }

  render() {
    return (
      // code to get if have picked or not
      //   this.state.plan == null ? (
      this.props.auth.user != null ? (
        this.state.plan == null && this.props.auth.user.plan == null ? (
          <Fragment>
            <h1>
              The Calendar view will show all your workout's day by day. Chose a
              plan
            </h1>
            <div className='cal-landing-page-section'>
              {/* add in flexbox styling from recomendations page */}
              <button
                className='btn btn-primary'
                onClick={() => this.onSubmit('HIIT')}
              >
                Option 1
                {/* <p>Super cool description text here</p>
                <p>will definitely add some color here later</p> */}
              </button>
              <button> Option 2 </button>
              <button> Option 3 </button>
              <button> Option 4 </button>
              <button> Option 5 </button>
            </div>
          </Fragment>
        ) : (
          <Calendar plan={this.props.auth.user.plan} />
        )
      ) : (
        <p>user is null</p>
        // this.props.auth.user.plan == null? console.log("error, user is non null")
      )
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(CalendarLandingPage);
