import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirmation } from '../../actions/userActions';

const Confirmation = ({ confirmation }) => {
    const url = window.location.href;
    const worlds = url.split('/');
    const token = worlds[worlds.length-1];
    confirmation(token);

    return (
        <div>
            confirmation token : {token}
        </div>
    );
};


Confirmation.propTypes = {
    confirmation: PropTypes.func.isRequired,
}



const mapDispatchToProps = (dispatch) => {
    return {
        confirmation: (token) => {
            dispatch(confirmation(token));
        }
    }
}

export default connect(null, mapDispatchToProps)(Confirmation);