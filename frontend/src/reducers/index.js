import { combineReducers } from 'redux';
import { postListReducer, postDetailsReducer } from './postReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer } from './userReducers';

export default combineReducers({
  postList: postListReducer,
  postDetails: postDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer
});