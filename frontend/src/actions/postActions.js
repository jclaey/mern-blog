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
  POST_CREATE_FAIL,
  POST_CREATE_COMMENT_REQUEST,
  POST_CREATE_COMMENT_SUCCESS,
  POST_CREATE_COMMENT_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_COMMENT_REQUEST,
  POST_UPDATE_COMMENT_SUCCESS,
  POST_UPDATE_COMMENT_FAIL
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

export const createPost = (obj) => async dispatch => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });

    const formData = new FormData();

    for (let prop in obj) {
      formData.append(prop, obj[prop]);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const { data } = await axios.post('/api/posts/new', formData, config);

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

export const createComment = (id, body) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_CREATE_COMMENT_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.post(`/api/posts/${id}/comments`, { body }, config);

    dispatch({ type: POST_CREATE_COMMENT_SUCCESS });
  } catch (error) {
    dispatch({
      type: POST_CREATE_COMMENT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const updatePost = (id, post) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_UPDATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`/api/posts/${id}/edit`, post, config);

    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
    });
  }
};

export const updatePostComment = (id, commentId, body) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_UPDATE_COMMENT_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`/api/posts/${id}/comments/${commentId}/edit`, { body }, config);

    dispatch({ 
      type: POST_UPDATE_COMMENT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_COMMENT_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
    });
  }
};