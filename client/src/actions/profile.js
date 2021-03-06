import axios from 'axios';
import {setAlert} from './alert';
import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILES_SUCCESS,
  GET_REPOS,
  GET_REPOS_FAILURE
} from './types';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data
    });
  } catch(error) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch({type: CLEAR_PROFILE});

  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES_SUCCESS,
      payload: res.data
    });
  } catch(error) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data
    });
  } catch(error) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

export const getGithubRepos = (userName) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${userName}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch(error) {
    dispatch({
      type: GET_REPOS_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

// Create of Update profile
export const createProfile = (formData, history, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));
    if(!edit) {
      history.push('/dashboard');
    }
  } catch(error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      })
    }
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

// Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Experience added', 'success'));
    history.push('/dashboard');
  } catch(error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      })
    }
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

// Add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Education added', 'success'));
    history.push('/dashboard');

  } catch(error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      })
    }
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Experience removed'));
  } catch(error) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Education removed'));
  } catch(error) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: {msg: error.response.statusText, status: error.response.status}
    });
  }
};

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if(window.confirm('Are you sure? This can NOT be undone!')) {

    try {
      await axios.delete(`/api/profile`);
      dispatch({type: CLEAR_PROFILE});
      dispatch({type: DELETE_ACCOUNT});
      dispatch(setAlert('Your Account has been permanently deleted'));
    } catch(error) {
      dispatch({
        type: GET_PROFILE_FAILURE,
        payload: {msg: error.response.statusText, status: error.response.status}
      });
    }
  }
};
