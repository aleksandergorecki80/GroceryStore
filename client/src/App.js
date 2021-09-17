import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Confirmation from './components/auth/Confirmation';
import Confirm from './components/auth/Confirm';
import Login from './components/auth/Login';
import Dashboard from './components/account/Dashboard';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAutchToken from './utils/setAuthToken';
import { loadUser } from './actions/userActions';

if(localStorage.token){
  setAutchToken(localStorage.token);
}



const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/confirmation/:token" component={Confirmation} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/confirm" component={Confirm} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/account" component={Dashboard} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
