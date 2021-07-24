import * as api from "../api/index";
import * as actionTypes from "../constants/actionTypes";

export const createPost = (post, history) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: actionTypes.CREATE_POST, payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    dispatch({ type: actionTypes.GET_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (postToDelete) => async (dispatch) => {
  try {
    await api.deletePost(postToDelete);
    dispatch({ type: actionTypes.DELETE, payload: postToDelete });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: actionTypes.UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
