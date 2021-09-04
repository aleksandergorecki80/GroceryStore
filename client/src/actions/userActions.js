import axios from 'axios';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './constants';

import { setAlert } from './alertActions';

// REGISTER USER

const registerSuccess = (payload) => {
    return { type: REGISTER_SUCCESS, payload}
}

const registerFail = () => {
    return { type: REGISTER_FAIL };
}

export const registerUser = ({ name, email, password}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
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