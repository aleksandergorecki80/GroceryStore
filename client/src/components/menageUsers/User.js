import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user: { name, email } }) => {
  return (
    <div className="item">
      <div className="right floated content">
        <div className="ui button">Edit</div>
      </div>
      <div className="content">
        {name}: {email}
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
