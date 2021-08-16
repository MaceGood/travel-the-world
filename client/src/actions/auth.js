import * as api from "../api/index";
import * as actionTypes from "../constants/actionTypes";

export const login = (userData, history) => async (dispatch) => {
  try {
    const { data } = await api.login(userData);
    dispatch({ type: actionTypes.AUTH, data });
    history.push("/");
    sessionStorage.clear();
  } catch (error) {
    const err = JSON.stringify(error?.response?.data);
    sessionStorage.setItem("error", err);
    // const msg = JSON.parse(sessionStorage.getItem("error"));
    // alert(msg?.error);
  }
};

export const signup = (userData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(userData);
    dispatch({ type: actionTypes.AUTH, data });
    history.push("/");
    sessionStorage.clear();
  } catch (error) {
    const err = JSON.stringify(error?.response?.data);
    sessionStorage.setItem("error", err);
    // const msg = JSON.parse(sessionStorage.getItem("error"));
    // alert(msg?.error);
  }
};

export const reset = (email) => async (dispatch) => {
  try {
    const { data } = await api.reset(email);
    dispatch({ type: actionTypes.RESET, data });
  } catch (error) {
    const err = JSON.stringify(error?.response?.data);
    sessionStorage.setItem("error", err);
  }
};

export const changepw = (userId, token, pw) => async (dispatch) => {
  try {
    const { data } = await api.changepw(userId, token, pw);
    dispatch({ type: actionTypes.CHANGEPW, payload: data });
  } catch (error) {
    const err = JSON.stringify(error?.response?.data);
    sessionStorage.setItem("error", err);
  }
};
