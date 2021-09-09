import { REGISTER_FAIL,
         REGISTER_SUCCESS,
         CONFIRMATION_SUCCESS,
         CONFIRMATION_FAIL,    
         LOGIN_SUCCESS,
         LOGIN_FAIL
            } from '../actions/constants';

const initialState = {
    token: null,
    isAuthenticated: false,
    userData: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case REGISTER_SUCCESS:
        case CONFIRMATION_SUCCESS:
            return {
                ...state,
                userData: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true
            }
        case REGISTER_FAIL:
        case CONFIRMATION_FAIL:
        case LOGIN_FAIL:
            return {
                token: null,
                isAuthenticated: false,
                userData: null
            }
        default:
            return state;
    }
    
};

export default userReducer;