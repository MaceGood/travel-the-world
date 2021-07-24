import * as actionTypes from "../constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
export default (state = { user: null }, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      localStorage.setItem("user", JSON.stringify({ ...action?.data }));
      return { ...state, user: action.data };
    case actionTypes.LOGOUT:
      localStorage.clear();
      return { ...state, user: null };
    default:
      return state;
  }
};
