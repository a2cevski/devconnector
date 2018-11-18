import { GET_POST, POST_LOADING, GET_POSTS, ADD_POST } from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        post: [action.payload, ...state.posts],
        loading: true
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POST:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_POSTS:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
