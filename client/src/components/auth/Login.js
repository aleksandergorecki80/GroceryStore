import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react';
import { loginUser } from '../../actions/userActions';

const Login = ({ user, loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const regExPatterns = {
    //eslint-disable-next-line
    email: /^([a-z\d\.-]+)@([a-z\d\.-]+)\.([a-z]{2,8})(\.[a-z]{5,50})?$/,
    password: /^[\w@-]{8,20}$/i, // w - any character a-z, A-Z, 0-9, including the _
  };

  const validateEmail = (phrase) => {
    return regExPatterns.email.test(phrase);
  };

  const validatePasswords = (phrase) => {
    return regExPatterns.password.test(phrase);
  };

  const onChangeEmail = (event) => {
    validateEmail(event.target.value)
      ? setEmailError(false)
      : setEmailError(true);
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    validatePasswords(event.target.value)
      ? setPasswordError(false)
      : setPasswordError(true);
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
      event.preventDefault();
      const formData = {
          email,
          password
      }
      loginUser(formData);
  }

  return (
    <div>
      <form onSubmit={(event) => onSubmit(event)}>
        <Input
          error={emailError ? true : false}
          placeholder="Enter email"
          type="email"
          name="email"
          onChange={(event) => onChangeEmail(event)}
        ></Input>
        <Input
          error={passwordError ? true : false}
          placeholder="Enter password"
          type="password"
          name="password"
          onChange={(event) => onChangePassword(event)}
        ></Input>
        <Button
        >Log in</Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (formData) => {
      dispatch(loginUser(formData));
    }
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
