import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
// ----
import WOD from '../../tabs/WOD';
import ContactUs from '../../tabs/ContactUs';
import PersonalizedProgramming from '../../tabs/PersonalizedProgramming';
import Movement from '../../tabs/Movement';
import Testimonials from '../../tabs/Testimonials2';
//have Testimonials original which is the grid version, which is more
//"professional" way of doing it but it has to stretch the imgaes to take up the full container
//or I would have to just add padding/negative margins anyway
import RadioButtonParent from '../../components/erics/RadioButtonParent';
import CheckoutPage from '../../components/auth/CheckoutPage';
import MyCalendar from '../../tabs/Calendar';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        {/* new Routes */}
        <Route exact path='/WOD' component={WOD} />
        <Route exact path='/ContactUs' component={ContactUs} />
        <Route
          exact
          path='/PersonalizedProgramming'
          component={PersonalizedProgramming}
        />
        <Route exact path='/Movement' component={Movement} />
        <Route exact path='/Testimonials' component={Testimonials} />
        <Route exact path='/FindMyProgram' component={RadioButtonParent} />
        <Route exact path='/CheckoutPage' component={CheckoutPage} />
        <Route exact path='/Calendar' component={MyCalendar} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
