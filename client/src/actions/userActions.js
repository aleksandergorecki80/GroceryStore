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
    LOGOUT,
    RESET_LINK_SENDING_SUCCESS,
    TOKEN_CONFIRMED,
    TOKEN_CONFIRMEATION_FAIL,
    NEW_PASSWORD_SET_SUCCESS,
    NEW_PASSWORD_SET_FAIL
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
            console.log(err)
            // dispatch(setAlert(err.data.message));
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
    const body = JSON.stringify(formData);
    return async (dispatch) => {
        try {
            const res = await axios.post('/api/auth', body, config);
            console.log(res)
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

//  ===     RESET PASSWORD   == //
//  REQUEST LINK 
const resetLinkSuccess = (payload) => {
    return { type: RESET_LINK_SENDING_SUCCESS, payload }
}

export const reqestResetLink = (formData) => {
    const body = JSON.stringify(formData);
    return async (dispatch) => {
        try {
            const res = await axios.post('/api/resetpassword', body, config);
            console.log(res)
            dispatch(resetLinkSuccess(res.data.user));
            dispatch(setAlert(res.data.message));
        } catch (err) {
            console.log(err);
        }
    }
}

// CONFIRM TOKEN

const tokenConfirmed = (payload) => {
    return { type: TOKEN_CONFIRMED, payload };
}

const tokenConfirmationFailed = () => {
    return { type: TOKEN_CONFIRMEATION_FAIL };
}

export const confirmToken = (token) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/resetpassword/${token}`);
            dispatch(tokenConfirmed({userData: res.data.user, token }));
        } catch (err) {
            console.log(err);
            dispatch(tokenConfirmationFailed())
        }
    }
}

// SET NEW PASSWORD
const newPasswordSetSuccess = () => {
    return { type: NEW_PASSWORD_SET_SUCCESS }
}

const newPasswordSetFail = () => {
    return { type: NEW_PASSWORD_SET_FAIL }
}

export const setNewPassword = (formData, token) => {
    token && setAutchToken(token);
    const body = JSON.stringify(formData);
    return async (dispatch) => {
        try {
            const res = await axios.put('/api/resetpassword/set', body, config);
            console.log(res)
            if(res.data.result.modifiedCount === 0 ) return
            dispatch(newPasswordSetSuccess())
        } catch (err) {
            console.log(err);
            dispatch(newPasswordSetFail());
        }
    }

}