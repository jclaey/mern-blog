import { combineReducers } from 'redux';
import { postListReducer, postDetailsReducer } from './postReducers';

export default combineReducers({
  postList: postListReducer,
  postDetails: postDetailsReducer
});