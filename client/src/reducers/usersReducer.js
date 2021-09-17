import { USERS_LOADED,
    USERS_LOADING_FAIL
 } from "../actions/constants";

const initialState = {
    usersList: null
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case USERS_LOADED:
            return {
                ...state,
                usersList: action.payload
            }
        case USERS_LOADING_FAIL:
            return {
                usersList: null
            }
        default:
            return state;
    }
};

export default usersReducer;