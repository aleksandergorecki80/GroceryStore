import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ManageUsers from './ManageUsers';


const Dashboard = ({ user }) => {
    return (
        <div>
            Dashboard
            { user.userData && user.userData.status === 'Admin' && <ManageUsers />}
        </div>
    );
};

Dashboard.propTypes = { 
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
}

export default connect(mapStateToProps, null)(Dashboard);