import axios from 'axios';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CONFIRMATION_SUCCESS,
    CONFIRMATION_FAIL

} from './constants';

import { setAlert } from './alertActions';

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
            console.log(res)
            dispatch(confirmationSuccess(res.data.user));
            dispatch(setAlert(res.data.message));
        } catch (err) {
            console.log(err.message);
            confirmationFail();
            dispatch(setAlert('Confirmation failed'));
        }
    }
}