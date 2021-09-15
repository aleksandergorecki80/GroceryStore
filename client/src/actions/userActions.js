import axios from 'axios';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CONFIRMATION_SUCCESS,
    CONFIRMATION_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    USER_LOADING_FAIL,
    LOGOUT
} from './constants';

import { setAlert } from './alertActions';

import setAutchToken from '../utils/setAuthToken';


// JSON Headers
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}


// REGISTER USER
const registerSuccess = (payload) => {
    return { type: REGISTER_SUCCESS, payload}
}

const registerFail = () => {
    return { type: REGISTER_FAIL };
}

export const registerUser = ({ name, email, password}) => {
    const body = JSON.stringify({ name, email, password });

    return async (dispatch) => {
        try {
            const res = await axios.post('/api/users', body, config);
            dispatch(registerSuccess(res.data.user));
            dispatch(setAlert(res.data.message));
            
        } catch (err) {
            dispatch(registerFail());
        }
    }
}

// CONFIRMATION
const confirmationSuccess = (payload) =>{
    return { type: CONFIRMATION_SUCCESS, payload };
}

const confirmationFail = () => {
    return { type: CONFIRMATION_FAIL };
}

export const confirmation = (token) => {
    const body = { token };
    return async (dispatch) => {
        try {
            const res = await axios.put('/api/users/confirmation', body, config);
            dispatch(confirmationSuccess(res.data.user));
            dispatch(setAlert(res.data.message));
        } catch (err) {
            console.log(err.message);
            confirmationFail();
            dispatch(setAlert('Confirmation failed'));
        }
    }
}


// LOG IN USER
const loginSuccess = (payload) => {
    return { type: LOGIN_SUCCESS, payload };
};

const loginFail = () => {
    return { type: LOGIN_FAIL };
};

export const loginUser = (formData) => {
    const body = JSON.stringify(formData)
    return async (dispatch) => {
        try {
            const res = await axios.post('/api/auth', body, config);
            dispatch(loginSuccess(res.data));
            dispatch(loadUser());
        } catch (err) {
            dispatch(loginFail());
            console.log(err.message);
        }

    }
};

// LOAD USER USING JWT

const userLoaded = (payload) => {
    return { type: USER_LOADED, payload };
}

const userLoadingFail = () => {
    return { type: USER_LOADING_FAIL } ;
}

export const loadUser = () => {
    if(localStorage.token){
        setAutchToken(localStorage.token);
    }
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/auth');
            dispatch(userLoaded(res.data))
        } catch (err) {
            console.log(err);
            dispatch(userLoadingFail());
        }
    }
}

// LOGOUT USER
export const logout = () => {
    return { type: LOGOUT };
}