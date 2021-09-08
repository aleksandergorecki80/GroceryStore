import { REGISTER_FAIL,
         REGISTER_SUCCESS,
         CONFIRMATION_SUCCESS,
         CONFIRMATION_FAIL    
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
        case REGISTER_FAIL:
        case CONFIRMATION_FAIL:
            return {
                token: null,
                isAuthenticated: false
            }
        default:
            return state;
    }
    
};

export default userReducer;