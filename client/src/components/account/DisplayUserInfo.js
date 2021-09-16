import React from 'react';
import PropTypes from 'prop-types';

const DisplayUserInfo = ({ user }) => {
  return (
    <div class="ui card">
      <div class="content">
        <div class="header">{ user.name }</div>
      </div>
      <div class="content">
          <div class="ui small feed">
          <div class="event">
            <div class="content">
              <div class="summary">
                <p>{ user.email }</p>
              </div>
            </div>
          </div>
          <div class="event">
            <div class="content">
              <div class="summary">
                <p>{ user.status }</p>
              </div>
            </div>
          </div>
          <div class="event">
            <div class="content">
              <div class="summary">
                <p>Registered: { user.date.substring(0,10) }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="extra content">
        <button class="ui button">Change password</button>
      </div>
    </div>
  );
};

DisplayUserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default DisplayUserInfo;
