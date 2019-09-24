import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// payments
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './components/auth/CheckoutForm';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar /> */}
          {/*  */}
          <StripeProvider apiKey='pk_test_nq8dRX7XeBaTNauxj2CLOHLd00zAKf36m9'>
            <Elements>
              <CheckoutForm />
            </Elements>
          </StripeProvider>

          {/*  */}
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
    // todo: take out regular provider?
  );
};

export default App;
