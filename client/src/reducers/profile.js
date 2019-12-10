import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  CLEAR_PROFILE,
  UPDATE_PROFILE
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
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    default:
      return state;
  }
};

export default profileReducer;