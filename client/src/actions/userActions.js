import axios from 'axios';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CONFIRMATION_SUCCESS
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
            console.log(res, 'res');
            dispatch(registerSuccess(res.data.user));
            dispatch(setAlert(res.data.message))
            
        } catch (err) {
            dispatch(registerFail());
        }
    }
}

// CONFIRMATION
const confirmationSuccess = (token) =>{
    return { type: CONFIRMATION_SUCCESS, token}
}

export const confirmation = (token) => {
    const body = { token };
    return async (dispatch) => {
        try {
            console.log(body, 'body')
            const res = await axios.put('/api/users/confirmation', body, config);
        } catch (err) {
            console.log(err);
        }
    }
}