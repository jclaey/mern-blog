import { combineReducers } from 'redux';
import { postListReducer, postDetailsReducer, postCreateReducer, postCommentCreateReducer, postUpdateReducer } from './postReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer } from './userReducers';

export default combineReducers({
  postList: postListReducer,
  postDetails: postDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  postCreate: postCreateReducer,
  postCommentCreate: postCommentCreateReducer,
  postUpdate: postUpdateReducer
});