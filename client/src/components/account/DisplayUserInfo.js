import React from 'react';
import PropTypes from 'prop-types';

const DisplayUserInfo = ({ user }) => {
  return (
    <div className="ui card">
      <div className="content">
        <div className="header">{ user.name }</div>
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
        <button className="ui button">Change password</button>
      </div>
    </div>
  );
};

DisplayUserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default DisplayUserInfo;
