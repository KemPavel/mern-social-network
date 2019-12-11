import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES_SUCCESS, GET_REPOS
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

const profileReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_PROFILE_SUCCESS:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default profileReducer;