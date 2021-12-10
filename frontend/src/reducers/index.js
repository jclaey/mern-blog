import { combineReducers } from 'redux';
import { postListReducer } from './postsReducer';

export default combineReducers({
  postList: postListReducer
});