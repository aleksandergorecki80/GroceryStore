import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { reqestResetLink } from '../../actions/userActions';
import { Redirect } from 'react-router';
// Utils
import { validateEmail } from '../../utils/validation';
import { connect } from 'react-redux';

const ForgotPassword = ( { reqestResetLink, user } ) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const onChangeEmail = (event) => {
    validateEmail(event.target.value)
      ? setEmailError(false)
      : setEmailError(true);
    setEmail(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email,
    };
    reqestResetLink(formData);
  };

  if (user.resetLinkSent) {
    return <Redirect to="/confirm" />;
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={(event) => onSubmit(event)}>
        <Input
          label="Enter email"
          placeholder="Enter email"
          type="email"
          name="email"
          error={emailError ? true : false}
          onChange={(event) => onChangeEmail(event)}
        />
        <Button>Submit</Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
    return {
        reqestResetLink: (formData) => {
            dispatch(reqestResetLink(formData));
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
}

ForgotPassword.propTypes = {
    reqestResetLink: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
