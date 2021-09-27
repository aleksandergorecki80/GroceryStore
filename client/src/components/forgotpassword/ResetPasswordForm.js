import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { confirmToken, setNewPassword } from '../../actions/userActions';
import { Link } from 'react-router-dom';

// Utils
import { validatePasswords } from '../../utils/validation';

const ResetPasswordForm = ({ confirmToken, setNewPassword, user }) => {

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

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

  useEffect(() => {
    const url = window.location.href;
    const worlds = url.split('/');
    const token = worlds[worlds.length - 1];
    confirmToken(token);
  }, [confirmToken]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== repeatPassword) return;
    if (passwordError || repeatPasswordError) return;

    // SENDING FORM
    const formData = {
        password
    }
    console.log(user.token)
    setNewPassword(formData, user.token);
  };

  if(!user.passwordReset){
    return (
        <div>
          <h2> New Password form</h2>
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
              <p>Please <Link to="/login">Log in</Link></p>
          </div>
      )
  }


};

ResetPasswordForm.propTypes = {
  confirmToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmToken: (token) => {
      dispatch(confirmToken(token));
    },
    setNewPassword: (formData, token) => {
        dispatch(setNewPassword(formData, token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
