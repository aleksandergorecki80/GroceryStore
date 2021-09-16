import { USERS_LOADED,
    USERS_LOADING_FAIL
 } from "../actions/constants";

const initialState = {
    users: null
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case USERS_LOADED:
            return {
                ...state,
                users: action.payload
            }
        case USERS_LOADING_FAIL:
            return {
                users: null
            }
        default:
            return state;
    }
};

export default usersReducer;