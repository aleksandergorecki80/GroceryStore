import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/userActions';
import { Input, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Utils
import {
  validateEmail,
  validatePasswords,
  validateName,
} from '../../utils/validation';

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);

  const [errorsMessages, setErrorsMessages] = useState([]);


  if (props.user.userData) {
    return <Redirect to="/confirm" />;
  }

  const onChangeName = (event) => {
    validateName(event.target.value) ? setNameError(false) : setNameError(true);
    setName(event.target.value);
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

  const onChangeRepeatPassword = (event) => {
    validatePasswords(event.target.value)
      ? setRepeatPasswordError(false)
      : setRepeatPasswordError(true);
    setRepeatPassword(event.target.value);
  };

  const addError = (error) => {
    setErrorsMessages([...errorsMessages, error]);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (password !== repeatPassword) {
     return addError('Passwords does not mach');
    }

    if (!name || !email || !password || !repeatPassword) {
      return addError('Please fill in the form');
    }

    if (nameError || emailError || passwordError || repeatPasswordError){
      return addError('Please fill in the form');
    };



 

    // if (nameError || emailError || passwordError || repeatPasswordError) return;

    // SENDING FORM

    const formData = {
      name,
      email,
      password,
    };
    props.registerUser(formData);
  };
  const uniq = [...new Set(errorsMessages)];

  return (
    <div>
      <form onSubmit={(event) => onSubmit(event)}>
        <Input
          error={nameError ? true : false}
          placeholder="Enter Name"
          type="text"
          name="name"
          onChange={(event) => onChangeName(event)}
        ></Input>
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
        <Input
          error={repeatPasswordError ? true : false}
          placeholder="Repeat password"
          type="password"
          name="repeatPassword"
          onChange={(event) => onChangeRepeatPassword(event)}
        ></Input>
        <Button type="submit" basic color="green">
          Submit
        </Button>
      </form>
      <div>
        {errorsMessages &&
          uniq.map((element, key) => {
            return <p key={key}>{element}</p>;
          })}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (formData) => {
      dispatch(registerUser(formData));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
