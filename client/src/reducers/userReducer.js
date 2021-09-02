import { REGISTER_FAIL } from '../actions/constants';

const initialState = {
    token: null,
    isAuthenticated: false
};

const userReducer = (state = initialState, action) => {
    console.log('userReducer');
    

    switch (action.type){
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