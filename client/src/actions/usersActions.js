import axios from "axios";
import setAutchToken from "../utils/setAuthToken";
import { USERS_LOADED, USERS_LOADING_FAIL } from './constants';

const usersLoaded = (payload) => {
    return { type: USERS_LOADED, payload }; 
}

const usersLoadingFail = (payload) => {
    return { type: USERS_LOADING_FAIL, payload }; 
}

export const getUsers = () => {
    if(localStorage.token){
        setAutchToken(localStorage.token);
    }
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/users');
            dispatch(usersLoaded(res.data));
        } catch (err) {
            console.log(err);
            dispatch(usersLoadingFail());
        }
    }
}