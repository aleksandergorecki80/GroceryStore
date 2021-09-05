import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Confirm = ({ user, alert }) => {
    return (
        <div>
            <p>Welcome {user.userData.name}. Your account has been created for email: {user.userData.email}</p>
            <p>{alert[0]}</p>
        </div>
    );
};

Confirm.propTypes = {
    user: PropTypes.object.isRequired,
    alert: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        alert: state.alertReducer
    }
}

export default connect(mapStateToProps, null)(Confirm);