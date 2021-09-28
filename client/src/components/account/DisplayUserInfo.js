import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DisplayUserInfo = ({ user }) => {
  return (
    <div className="ui card">
      <div className="content">
        <div className="header">You are logged in: { user.name }</div>
      </div>
      <div className="content">
          <div className="ui small feed">
          <div className="event">
            <div className="content">
              <div className="summary">
                <p>{ user.email }</p>
              </div>
            </div>
          </div>
          <div className="event">
            <div className="content">
              <div className="summary">
                <p>{ user.status }</p>
              </div>
            </div>
          </div>
          <div className="event">
            <div className="content">
              <div className="summary">
                <p>Registered: { user.date.substring(0,10) }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="extra content">
        <Link to="changepassword" className="ui primary basic button" >Change password</Link>
      </div>
    </div>
  );
};

DisplayUserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default DisplayUserInfo;
