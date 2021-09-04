import { SET_ALERT } from "../actions/constants";

const initialState = [];

const alertReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ALERT:
            return [
                ...state,
                action.message
            ];
        default:
            return state;
    }
}

export default alertReducer;