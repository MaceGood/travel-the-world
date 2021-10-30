import * as api from "../api/index";
import * as actionTypes from "../constants/actionTypes";

export const changeEmail = (id, email) => async (dispatch) => {
  try {
    const { data } = await api.changeEmail(id, email);
    dispatch({ type: actionTypes.CHANGE_EMAIL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const changeName = (id, name) => async (dispatch) => {
  try {
    const { data } = await api.changeName(id, name);
    dispatch({ type: actionTypes.CHANGE_NAME, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = (id, password) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(id, password);
    dispatch({ type: actionTypes.CHANGE_PASSWORD, payload: data });
  } catch (error) {
    const err = JSON.stringify(error?.response?.data);
    sessionStorage.setItem("error", err);
  }
};

export const changeImage = (id, email) => async (dispatch) => {
  try {
    const { data } = await api.changeImage(id, email);
    dispatch({ type: actionTypes.CHANGE_IMAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
