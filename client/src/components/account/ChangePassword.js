import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setNewPassword } from '../../actions/userActions';
import { Link } from 'react-router-dom';

// Utils
import { validatePasswords } from '../../utils/validation';

const ChangePassword = ({ setNewPassword, user }) => {
  const [password, setPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);

  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);

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

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== repeatPassword) return;
    if (passwordError || repeatPasswordError) return;

    // SENDING FORM
    const formData = {
      password,
    };
    setNewPassword(formData);
  };

  if (!user.passwordReset) {
    return (
      <div>
        <h3> Change your password.</h3>
        <h4>{user.userData && user.userData.email}</h4>
        <form onSubmit={(event) => onSubmit(event)}>
          <Input
            error={passwordError ? true : false}
            placeholder="Enter new password"
            type="password"
            name="password"
            onChange={(event) => onChangePassword(event)}
          />
          <Input
            error={repeatPasswordError ? true : false}
            placeholder="Repeat new password"
            type="password"
            name="repeat-password"
            onChange={(event) => onChangeRepeatPassword(event)}
          />
          <Button>Submit</Button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <p>You have succesfully changed your password.</p>
        <p>
          Please <Link to="/login">Log in</Link>
        </p>
      </div>
    );
  }
};

ChangePassword.propTypes = {
  setNewPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewPassword: (formData) => {
      dispatch(setNewPassword(formData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
