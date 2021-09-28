import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UsersList from './../menageUsers/UsersList';
import DisplayUserInfo from './DisplayUserInfo';
import { getUsers } from '../../actions/usersActions';


const Dashboard = ({ user, getUsers, users }) => {

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <div>
            { user.userData && <DisplayUserInfo user={user.userData} /> }
            { user.userData && user.userData.status === 'Admin' && <UsersList users={users}/>}
        </div>
    );
};

Dashboard.propTypes = { 
    user: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        users: state.usersReducer.usersList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => {
            dispatch(getUsers());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);