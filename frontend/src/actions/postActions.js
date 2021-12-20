import axios from 'axios';

import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL
} from '../constants/postConstants';

export const listPosts = () => async dispatch => {
  try {
    dispatch({ type: POST_LIST_REQUEST });

    const { data } = await axios.get('/api/posts');

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
    });
  }
};

export const listPostDetails = id => async dispatch => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST }); 

    const { data } = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const createPost = (title, content, author) => async dispatch => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post('/api/posts/new', { title, content, author }, config);

    dispatch({ 
      type: POST_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};