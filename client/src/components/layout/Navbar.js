import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/userActions';

const Navbar = ({ user, logout }) => {
  const loggedLinks = (
   <div>
      <Link to="/account">My account</Link>
      <Link to="/" onClick={logout}>Logout</Link>
      <p>____________________________</p>
      <p></p>
    </div>
  );

  const notLoggedLinks = (
    <div>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <p>____________________________</p>
      <p></p>
    </div>
  );

  return (
    <div>
      {user.isAuthenticated && user.userData !== null
        ? loggedLinks
        : notLoggedLinks}
    </div>
  );
};

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
