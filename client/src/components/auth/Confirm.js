import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

const Confirm = ({ user, alert }) => {
    if(user.userData){
        return (
            <div>
                <p>Welcome {user.userData.name}. Your email adress: {user.userData.email}</p>
                <p>{alert[0]}</p>
            </div>
        );
    } else {
        return <Redirect to="/" />
    }
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