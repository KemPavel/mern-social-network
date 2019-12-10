import axios from 'axios';
import {setAlert} from './alert'
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CLEAR_PROFILE
} from "./types";

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data // user data
    })
  } catch(error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
};


export const registerUser = ({name, email, password}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({name, email, password});

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch(error) {
    const errors = error.response.data.errors;
    if (errors.length) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      })
    }
    dispatch({
      type: REGISTER_FAILURE
    })
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({email, password});

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch(error) {
    const errors = error.response.data.errors;
    if (errors.length) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      })
    }
    dispatch({
      type: LOGIN_FAILURE
    })
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE
  });
  dispatch({
    type: LOGOUT
  })
};
