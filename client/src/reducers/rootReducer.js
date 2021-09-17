import { combineReducers } from 'redux';
import userReducer from './userReducer';
import alertReducer from './alertReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
    userReducer,
    usersReducer,
    alertReducer,
});

export default rootReducer;