import { combineReducers } from 'redux';
import authReducer from './authReducer';
import taskReducer from './taskReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  users: userReducer,
});
