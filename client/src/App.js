import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Confirmation from './components/auth/Confirmation';


const App = () => {
  return ( 
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/confirmation/:token" component={Confirmation} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Fragment>
    </Router> );
}
 
export default App;