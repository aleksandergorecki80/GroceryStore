import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Confirmation from './components/auth/Confirmation';
import Confirm from './components/auth/Confirm';

// Redux
import { Provider } from 'react-redux';
import store from './store';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/confirmation/:token" component={Confirmation} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/confirm" component={Confirm} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
