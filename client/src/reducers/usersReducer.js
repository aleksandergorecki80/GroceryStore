import { USERS_LOADED,
    USERS_LOADING_FAIL,
    USER_DELETED,
    USER_DELETING_FAILED,
    USER_BLOCKED_UNBLOCKED,
    USER_BLOCKING_UNBLOCKING_FAILED
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
        case USER_BLOCKED_UNBLOCKED:
            return {
                ...state,
                usersList: state.usersList.map((user) => {
                    return user._id === action.payload.user_id 
                        ? { ...user, isBlocked: !action.payload.isBlocked } 
                        : { ...user }
                    }
                )
            }
        case USER_DELETING_FAILED:
        case USER_BLOCKING_UNBLOCKING_FAILED:
        default:
            return state;
    }
};

export default usersReducer;