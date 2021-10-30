import * as actionTypes from "../constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
export default (
  state = { email: null, name: null, password: null, image: null },
  action
) => {
  switch (action.type) {
    case actionTypes.CHANGE_PASSWORD:
      return { ...state, password: [state.password, action.payload] };
    case actionTypes.CHANGE_EMAIL:
      return { ...state, email: [state.email, action.payload] };
    case actionTypes.CHANGE_NAME:
      return { ...state, name: [state.name, action.payload] };
    case actionTypes.CHANGE_IMAGE:
      return { ...state, image: [state.image, action.payload] };
    default:
      return state;
  }
};
