import {
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

const postReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_POST_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts]
      };
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: payload
      };
    case GET_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case UPDATE_LIKES:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) => (post._id === payload.id) ? {...post, likes: payload.likes} : {...post})
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload)
      };
    case ADD_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: payload
        }
      };
    case DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.filter((comment) => comment._id !== payload)
        }
      };
    default:
      return state;
  }
};

export default postReducer;