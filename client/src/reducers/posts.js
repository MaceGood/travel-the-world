/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from "../constants/actionTypes";

export default function authReducer(
  state = { posts: [], loading: false },
  action
) {
  switch (action.type) {
    case actionTypes.GET_POSTS:
      return action.payload;
    case actionTypes.DELETE:
      return {
        ...state,
        posts: state.posts.filter(
          (postToDelete) => postToDelete.id !== action.payload.id
        ),
      };
    case actionTypes.CREATE_POST:
      return { ...state, posts: [state.posts, action.payload] };
    case actionTypes.UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    default:
      return state;
  }
}
