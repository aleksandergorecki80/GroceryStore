import axios from "axios";
import setAutchToken from "../utils/setAuthToken";
import { USERS_LOADED, 
    USERS_LOADING_FAIL, 
    USER_DELETED, 
    USER_DELETING_FAILED,
    USER_BLOCKED_UNBLOCKED,
    USER_BLOCKING_UNBLOCKING_FAILED
    } from './constants';



// GET A USERS LIST
const usersLoaded = (payload) => {
    return { type: USERS_LOADED, payload }; 
}

const usersLoadingFail = () => {
    return { type: USERS_LOADING_FAIL }; 
}

export const getUsers = () => {
    if(localStorage.token){
        setAutchToken(localStorage.token);
    }
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/admin/users');
            dispatch(usersLoaded(res.data));
        } catch (err) {
            console.log(err);
            dispatch(usersLoadingFail());
        }
    }
}

// DELETE A USER
const userDeleted = (payload) => {
    return { type: USER_DELETED, payload }
};

const userDeletingFailed = () => {
    return { type: USER_DELETING_FAILED }
};

export const deleteUser = (user_id) => {
    if(localStorage.token){
        setAutchToken(localStorage.token);
    }
    return async (dispatch) => {
        try {
            await axios.delete(`/api/admin/users/${user_id}`);
            dispatch(userDeleted(user_id));
        } catch(err) {
            console.log(err);
            dispatch(userDeletingFailed());
        }
    }
}

// BLOCK A USER
const userBlocked = (payload) => {
    return { type: USER_BLOCKED_UNBLOCKED, payload };
}

const userBlockingFailed = () => {
    return { type: USER_BLOCKING_UNBLOCKING_FAILED };
}

export const blockUser = (payload) => {
    if(localStorage.token){
        setAutchToken(localStorage.token);
    }
    return async (dispatch) => {
        try {
            const result = await axios.put(`/api/admin/users/block/${payload.user_id}`);
            console.log(result)
            if(result.data.result.acknowledged === true){
                dispatch(userBlocked(payload));
            }
        } catch(err) {
            console.log(err);
            dispatch(userBlockingFailed());
        }
    }
}

