import { combineReducers } from 'redux';
import { postListReducer, postDetailsReducer } from './postsReducer';

export default combineReducers({
  postList: postListReducer,
  postDetails: postDetailsReducer
});