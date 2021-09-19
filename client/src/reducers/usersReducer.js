import { USERS_LOADED,
    USERS_LOADING_FAIL,
    USER_DELETED,
    USER_DELETING_FAILED
 } from "../actions/constants";

const initialState = {
    usersList: null,
    loading: true
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
        case USER_DELETED:
            return {
                ...state,
                usersList: state.usersList.filter((user) => {
                    return user._id !== action.payload
                })
            }
        case USER_DELETING_FAILED:
        default:
            return state;
    }
};

export default usersReducer;