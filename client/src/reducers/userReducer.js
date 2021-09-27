import { REGISTER_FAIL,
         REGISTER_SUCCESS,
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
            } from '../actions/constants';

const initialState = {
    token: localStorage.getItem('token'),
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
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                userData: action.payload
            }
        case RESET_LINK_SENDING_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                resetLinkSent: true
            }
        case TOKEN_CONFIRMED:
            return {
                ...state,
                token: action.payload.token,
                userData: action.payload.userData
            }
        case NEW_PASSWORD_SET_SUCCESS:
            return {
                token: null,
                isAuthenticated: false,
                userData: null,
                passwordReset: true
            }
        case NEW_PASSWORD_SET_FAIL:
        case REGISTER_FAIL:
        case CONFIRMATION_FAIL:
        case LOGIN_FAIL:
        case USER_LOADING_FAIL:
        case TOKEN_CONFIRMEATION_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
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