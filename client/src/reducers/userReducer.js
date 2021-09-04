import { REGISTER_FAIL,
         REGISTER_SUCCESS,    
            } from '../actions/constants';

const initialState = {
    token: null,
    isAuthenticated: false,
    userData: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case REGISTER_SUCCESS:
            return {
                ...state,
                userData: action.payload
            }
        case REGISTER_FAIL:
            return {
                token: null,
                isAuthenticated: false
            }
        default:
            return state;
    }
    
};

export default userReducer;