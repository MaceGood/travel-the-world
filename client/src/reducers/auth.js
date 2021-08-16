import * as actionTypes from "../constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
export default (state = { user: null, link: null, pw: null }, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      localStorage.setItem("user", JSON.stringify({ ...action?.data }));
      return { ...state, user: action.data };
    case actionTypes.LOGOUT:
      localStorage.clear();
      return { ...state, user: null };
    case actionTypes.RESET:
      return { ...state, link: action.payload };
    case actionTypes.CHANGEPW:
      return { ...state, pw: [state.pw, action.payload] };
    default:
      return state;
  }
};
