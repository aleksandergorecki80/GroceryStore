import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import User from './User';

const UsersList = ({ users }) => {
  users && console.log(users.length);
  return (
    <Fragment>
      <h3>List of users</h3>
      <div className="ui relaxed divided list">
        {users &&
          users.map((user) => {
            return <User user={user} />;
          })}
      </div>
    </Fragment>
  );
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UsersList;
