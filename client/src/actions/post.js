import axios from 'axios';
import {
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from './types';
import {setAlert} from './alert';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POST_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id: postId,
        likes: res.data
      }
    });
  } catch (error) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id: postId,
        likes: res.data
      }
    });
  } catch (error) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: postId
    });
    dispatch(setAlert('Post has been deleted'));
  } catch (error) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlert('Post created', 'success'));
  } catch (error) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert('Comment added', 'success'));
  } catch (error) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: commentId
    });
    dispatch(setAlert('Comment has been deleted'));
  } catch (error) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};
