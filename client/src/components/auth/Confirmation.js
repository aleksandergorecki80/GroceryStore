import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirmation } from '../../actions/userActions';
import { Link } from 'react-router-dom';

const Confirmation = ({ confirmation, alerts, user }) => {

    useEffect(() => {
        const url = window.location.href;
        const worlds = url.split('/');
        const token = worlds[worlds.length-1];
        confirmation(token);
    }, [confirmation]);

    return (
        <div>
            <p>{alerts[0]}</p>
            <Link to='/login'>Please log in</Link>
        </div>
    );
};


Confirmation.propTypes = {
    confirmation: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
    return {
        alerts: state.alertReducer,
        user: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        confirmation: (token) => {
            dispatch(confirmation(token));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);