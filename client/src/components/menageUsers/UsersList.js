import React, { Fragment } from 'react';
import User from './User';

const UsersList = ({ users }) => {
  return (
    <Fragment>
      <h3>List of users</h3>
      <div className="ui relaxed divided list">
        {users &&
          users.map((user) => {
            return <User user={user} key={user.email}/>;
          })}
      </div>
    </Fragment>
  );
};

export default UsersList;
